import express from 'express'
import userController from '../controller/userController.mjs'
import { verifyTokenAndHost } from '../middleware/tokenVerify.mjs'

const route = express.Router()

route.get('/', verifyTokenAndHost, userController.getAllUsers)
route.post('/send-invitation', verifyTokenAndHost, userController.inviteNewMember)

route.get('/:username/permissions/AI', userController.getPermissionOfMemberByUsername)
route.get('/:id/permissions', userController.getPermissionOfMemberById)
route.post('/:user_id/permissions', userController.addPermissionForMember)

route.post('/devices', userController.sheduleDevice)


export default route