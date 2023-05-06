import express from 'express'
import authRoute from './authRoute.mjs'
import userRoute from './userRoute.mjs'
import permissionRoute from './permissionRoute.mjs'
import deviceRoute from './deviceRoute.mjs'
import utilRoute from './utilRoute.mjs'


const route = express.Router()

route.get('/', (req, res) => { res.send("WELCOME TO OUR SYSTEM") })
route.use('/api/auth', authRoute)
route.use('/api/users', userRoute)
route.use('/api/permissions', permissionRoute)
route.use('/api/devices', deviceRoute)
route.use('/api/utils', utilRoute)

export default route