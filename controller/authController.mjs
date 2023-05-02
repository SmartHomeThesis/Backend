import bcrypt from 'bcrypt'
import db from '../model/index.mjs'
import generateOTP from '../util/generateOTP.mjs'
import { generateAccessToken } from '../util/generateToken.mjs'
import mailController from './mailController.mjs'

const User = db.users
const Otp = db.otps

const authController = {
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)

            const _user = await User.create({
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: hashed,
                role: 'Member'
            })

            res.json({
                status: '200',
                message: 'SUCCESS',
                data: _user
            })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({ where: { email: req.body.email } })
            if (!user)
                return res.status(404).json({ msg: 'Email is not correct' })

            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (!validPassword)
                return res.status(404).json({ msg: 'Password is not correct' })

            if (user && validPassword) {
                const accessToken = await generateAccessToken(user)


                res.json({
                    status: '200',
                    message: 'SUCCESS',
                    data: { user, accessToken }
                })
            }
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },

    logout: async (req, res) => {
        res.clearCookie('refreshToken')
        res.json({ msg: 'Logout successfully' })
    },

    forgotPassword: async (req, res) => {
        try {
            const user = User.findOne({ where: { email: req.body.email } })
            if (!user) return res.status(404).json('Email is not valid')

            const OTP = generateOTP(6)
            const salt = await bcrypt.genSalt(10)
            const _OTP = await bcrypt.hash(OTP, salt)

            mailController.sendResetPassword(req.body.email, OTP)

            await Otp.create({ email: req.body.email, otp: _OTP })

            res.json({
                status: '200',
                msg: 'SUCCESS'
            })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }
}

export default authController