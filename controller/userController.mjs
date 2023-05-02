import bcrypt from 'bcrypt'
import EventEmitter from 'events'
import schedule from 'node-schedule'
import db from '../model/index.mjs'
import adafruitService from '../service/adafruitService.mjs'
import generateOTP from '../util/generateOTP.mjs'
import mailController from './mailController.mjs'


const Otp = db.otps
const User = db.users
const Permission = db.permissions

const event = new EventEmitter();

const userController = {

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

    addPermissionForMember: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.user_id)
            const listOfPermission = req.body.permission

            for (let index = 0; index < listOfPermission.length; index++) {
                let permission = await Permission.findByPk(listOfPermission[index])
                await user.addPermission(permission)
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

    getPermissionOfMemberByUsername: async (req, res) => {
        try {
            const user = await User.findOne({ where: { username: req.params.username }, include: Permission })
            console.log(user.permissions.length)
            const user_response = {
                name: user.username,
                permission: 'Kitchen'
            }

            if (user.permissions.length == 3)
                user_response.permission = 'All'
            res.json(user_response)
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