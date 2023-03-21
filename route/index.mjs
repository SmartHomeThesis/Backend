import express from 'express'
import authRoute from './authRoute.mjs'
import userRoute from './userRoute.mjs'


const route = express.Router()

route.get('/', (req, res) => res.json('Hello To Our Project'))

route.use('/auth', authRoute)
route.use('/users', userRoute)

export default route