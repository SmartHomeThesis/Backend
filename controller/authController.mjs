import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../model/index.mjs'
import generateOTP from '../util/generateOTP.mjs'
import mailController from './mailController.mjs'

const User = db.user
const Otp = db.otp

const authController = {
    generateAccessToken: (user) => {
        return jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: '15m' }
        )
    },

    generateRefreshToken: (user) => {
        return jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: '30d' }
        )
    },

    register: async (req, res) => {
        try {
            const existedUser = await User.findOne({ where: { email: req.body.email } })
            if (existedUser)
                return res.status(409).json('Account is existed')

            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)

            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: hashed
            })

            res.status(200).json({
                status: '200',
                message: 'SUCCESS',
                data: newUser
            })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({ where: { email: req.body.email } })
            if (!user)
                return res.status(404).json('Email is not valid')

            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (!validPassword)
                return res.status(404).json('Password is not correct')

            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user)
                const refreshToken = authController.generateRefreshToken(user)

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    sameSite: 'strict'
                })

                res.status(200).json({
                    status: '200',
                    message: 'SUCCESS',
                    data: { user, accessToken }
                })
            }
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    requestToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken)
            return res.status(401).json({ message: 'You are not authenticated' })

        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err)
                return res.status(403).json({ message: 'Refresh token is invalid' + err.message })

            const accessToken = authController.generateAccessToken(user)
            const refreshToken = authController.generateRefreshToken(user)

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'strict'
            })

            res.status(200).json({
                status: '200',
                message: 'SUCCESS',
                accessToken: accessToken
            })
        })
    },

    logout: async (req, res) => {
        res.clearCookie('refreshToken')
        req.logout()
        res.status(200).json({ message: 'Logout successfully' })
    },

    resetPassword: async (req, res) => {
        try {
            const existedEmail = User.findOne({ where: { email: req.body.email } })
            if (!existedEmail) return res.status(404).json('Email is not valid')

            const OTP = generateOTP(6)
            mailController.sendResetEmail(req.body.email, OTP)

            const otp = await Otp.build({ email: req.body.email, otp: OTP })
            const salt = await bcrypt.genSalt(10)
            otp.otp = await bcrypt.hash(otp.otp, salt)

            await otp.save()

            res.status(200).json({
                status: '200',
                message: 'SUCCESS',
                OTP: otp
            })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    verifyOtp: async (req, res) => {
        try {
            const existedOtp = await Otp.findAll({ where: { email: req.body.email } })
            if (existedOtp.length === 0) return res.status(400).json('You use an expired OTP')

            const otpCheck = existedOtp[existedOtp.length - 1]
            const validUser = await bcrypt.compare(req.body.otp, otpCheck.otp)

            if (otpCheck.expires.getTime() < Date.now()) return res.status(400).json('You use an expired OTP')
            if (!validUser) return res.status(400).json('OTP is invalid')

            if (otpCheck.email === req.body.email && validUser) {
                await Otp.destroy({ where: { email: req.body.email }, force: true })
            }
            res.status(200).json({
                status: '200',
                message: 'SUCCESS'
            })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
}

export default authController