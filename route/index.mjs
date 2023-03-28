import express from 'express'
import authRoute from './authRoute.mjs'
import userRoute from './userRoute.mjs'
import permissionRoute from './permissionRoute.mjs'
import adafruitRoute from './adafruitRoute.mjs'


const route = express.Router()

route.use('/auth', authRoute)
route.use('/users', userRoute)
route.use('/permissions', permissionRoute)
route.use('/adafruit', adafruitRoute)

export default route