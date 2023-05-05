import express from 'express'
import authRoute from './authRoute.mjs'
import userRoute from './userRoute.mjs'
import permissionRoute from './permissionRoute.mjs'
import deviceRoute from './deviceRoute.mjs'
import utilRoute from './utilRoute.mjs'


const route = express.Router()

route.use('/auth', authRoute)
route.use('/users', userRoute)
route.use('/permissions', permissionRoute)
route.use('/devices', deviceRoute)
route.use('/utils', utilRoute)

export default route