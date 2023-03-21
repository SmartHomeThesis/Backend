import express from 'express'
import authController from '../controller/authController.mjs'
import { verifyOtp } from '../middleware/otpVerify.mjs'
import { verifyToken } from '../middleware/tokenVerify.mjs'

const route = express.Router()

route.post('/register', verifyOtp, authController.register)
route.post('/login', authController.login)
route.post('/logout', verifyToken, authController.logout)
route.post('/refresh-token', authController.refreshToken)
route.post('/forgot-password', authController.forgotPassword)

export default route