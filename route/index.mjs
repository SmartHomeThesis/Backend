import express from 'express'
import authRoute from './authRoute.mjs'


const route = express.Router()

route.use('/auth', authRoute)

export default route