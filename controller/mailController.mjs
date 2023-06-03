import nodemailer from 'nodemailer'

console.log(process.env.MAIL_USERNAME, process.env.MAIL_PASSWORD)

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
})

const mailController = {
    sendResetPassword: async (email, otp) => {
        await transport.sendMail({
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: 'Reset Your Password',
            text: `Below is the otp to reset password: ${otp}`,
            html: `<h3> Below is the otp to reset password: ${otp} </h3>`
        })
    },

    sendInvitation: async (email, otp) => {
        await transport.sendMail({
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: 'Invitation To My House',
            text: `You will use this otp to register new account: ${otp}`,
            html: `<h3> You will use this otp to register new account: ${otp} </h3>`
        })
    }
}

export default mailController


