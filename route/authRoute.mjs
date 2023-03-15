import express from 'express'
import authController from '../controller/authController.mjs'
import { verifyToken } from '../middleware/tokenValidation.mjs'

const route = express.Router()

route.post('/register', authController.register)
route.post('/login', authController.login)
route.post('/logout', verifyToken, authController.logout)
route.post('/refresh-token', authController.requestToken)
route.post('/forgot-password', authController.resetPassword)
route.post('/verify-otp', authController.verifyOtp)

export default route