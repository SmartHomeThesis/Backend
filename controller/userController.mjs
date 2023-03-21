import bcrypt from 'bcrypt'
import db from '../model/index.mjs'
import generateOTP from '../util/generateOTP.mjs'
import mailController from './mailController.mjs'


const Otp = db.otp
const User = db.user
const Permission = db.permission


const userController = {
    getAllPermissions: async (req, res) => {
        try {
            const permissions = await Permission.findAll()
            if (!permissions) return res.status(404).json({ msg: 'Not found permission' })

            res.json({
                status: 200,
                msg: 'SUCCESS',
                data: permissions
            })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },

    getPermissionById: async (req, res) => {
        try {
            const permission = await Permission.findByPk(req.params.id)
            if (!permission) return res.status(404).json({ msg: 'Not found permission' })

            res.json({
                status: 200,
                msg: 'SUCCESS',
                data: permission
            })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },


    createPermission: async (req, res) => {
        try {
            const _permission = await Permission.create({
                permission: req.body.permission
            })

            res.json({
                status: 200,
                msg: 'SUCCESS',
                data: _permission
            })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll()
            if (!users) return res.status(404).json({ msg: 'Not found user' })

            res.json({
                status: 200,
                msg: 'SUCCESS',
                data: users
            })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },

    createPermission: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.user_id)
            const permission = await Permission.findByPk(req.params.permission_id)
            const user_permission = user.addPermission(permission)

            res.json({
                status: 200,
                msg: 'SUCCESS',
                data: user_permission
            })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },

    inviteNewMember: async (req, res) => {
        try {
            const user = await User.findOne({ where: { email: req.body.email } })
            if (user) return res.status(409).json({ msg: 'User is existed' })

            const OTP = generateOTP(6)
            const salt = await bcrypt.genSalt(10)
            const _OTP = await bcrypt.hash(OTP, salt)

            await Otp.create({ email: req.body.email, otp: _OTP })

            mailController.sendInvitation(req.body.email, OTP)

            res.json({ msg: 'Send invitation email successfully' })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }
}

export default userController