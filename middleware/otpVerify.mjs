import bcrypt from 'bcrypt'
import db from "../model/index.mjs"


const Otp = db.otp

const verifyOtp = async (req, res, next) => {
    const otp = await Otp.findAll({ where: { email: req.body.email } })
    if (otp.length === 0)
        return res.status(400).json('You use an expired OTP')

    const otpCheck = otp[otp.length - 1]
    if (otpCheck.expires < Date.now())
        return res.status(400).json('You use an expired OTP')

    const validUser = await bcrypt.compare(req.body.otp, otpCheck.otp)
    if (!validUser)
        return res.status(400).json('OTP is invalid')

    if (otpCheck.email === req.body.email && validUser) {
        await Otp.destroy({ where: { email: req.body.email }, force: true })
        next()
    }
}

export { verifyOtp }