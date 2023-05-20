import express from 'express'
import utilController from '../controller/utilController.mjs'


const route = express.Router()

route.get('/user/:name', utilController.getUserByName)
route.get('/user-permission/:name', utilController.getPermissionOfMemberByName)
route.post('/login', utilController.login)


export default route