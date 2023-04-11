import express from 'express'
import permissionController from '../controller/permissionController.mjs'


const route = express.Router()

route.get('/', permissionController.getAllPermissions)
route.get('/:id', permissionController.getPermissionById)
route.post('/', permissionController.createPermission)


export default route