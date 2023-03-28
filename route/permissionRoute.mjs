import express from 'express'
import permissionController from '../controller/permissionController.mjs'


const route = express.Router()

route.get('/permissions', permissionController.getAllPermissions)
route.get('/permissions/:id', permissionController.getPermissionById)
route.post('/permissions', permissionController.createPermission)


export default route