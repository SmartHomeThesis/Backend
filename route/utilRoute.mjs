import express from 'express'
import utilController from '../controller/utilController.mjs'


const route = express.Router()

route.get('/user-permission/:name', utilController.getPermissionOfMemberByName)


export default route