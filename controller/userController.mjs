import bcrypt from 'bcrypt'
import schedule from 'node-schedule'
import db from '../model/index.mjs'
import adafruitService from '../service/adafruitService.mjs'
import generateOTP from '../util/generateOTP.mjs'
import mailController from './mailController.mjs'


const Otp = db.otps
const User = db.users
const Permission = db.permissions


const userController = {

    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({ include: Permission })
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

    addPermissionForMember: async (req, res) => {
        try {

            const user = await User.findByPk(req.params.user_id)
            const listOfPermission = req.body.permission

            for (let index = 0; index < listOfPermission.length; index++) {
                let permission = await Permission.findByPk(listOfPermission[index])
                console.log(permission)
                await user.addPermission(permission, { through: { selfGranted: false } })
            }

            res.json({
                status: 200,
                msg: 'SUCCESS',
                data: user
            })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },

    getPermissionOfMemberById: async (req, res) => {
        try {
            const user = await User.findOne({ where: { id: req.params.id }, include: Permission })

            res.json({
                status: 200,
                msg: 'SUCCESS',
                data: user
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
    },

    sheduleDevice: async (req, res) => {
        try {
            const feed = req.body.feed
            const value = req.body.value

            const Time = new Date(req.body.time)
            const schedule_device = schedule.scheduleJob(Time, async () => {
                await adafruitService.sendData(feed, value)
                event.emit('Job Done')
            })

            event.on('Job Done', () => {
                schedule_device.cancel()
            })

            res.json({
                status: 200,
                msg: 'Schedule successfully'
            })
        } catch (error) {
            res.json({ msg: error.message })
        }
    }
}

export default userController