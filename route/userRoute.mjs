import express from 'express'
import userController from '../controller/userController.mjs'
import { verifyTokenAndHost } from '../middleware/tokenVerify.mjs'

const route = express.Router()

route.get('/', verifyTokenAndHost, userController.getAllUsers)
route.post('/members', verifyTokenAndHost, userController.inviteNewMember)

route.post('/:id/permissions', userController.getPermissionOfMemberById)
route.post('/:user_id/permissions', userController.addPermissionForMember)


export default route