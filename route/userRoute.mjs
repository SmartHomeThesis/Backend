import express from 'express'
import userController from '../controller/userController.mjs'
import { verifyTokenAndHost } from '../middleware/tokenVerify.mjs'

const route = express.Router()

route.get('/', verifyTokenAndHost, userController.getAllUsers)
route.post('/members', verifyTokenAndHost, userController.inviteNewMember)

// Permission service
route.get('/permissions', userController.getAllPermissions)
route.get('/permissions/:id', userController.getPermissionById)
route.post('/permissions', userController.createPermission)
route.post('/:user_id/permissions/:permission_id', userController.createPermission)


export default route