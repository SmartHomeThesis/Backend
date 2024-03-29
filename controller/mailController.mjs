import nodemailer from 'nodemailer'



const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "hanh.huynhth34224002@hcmut.edu.vn",
        pass: "zhbxwwjbfedtprws"
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
            from: "hanh.huynhth34224002@hcmut.edu.vn",
            to: email,
            subject: 'Invitation To My House',
            text: `You will use this otp to register new account: ${otp}`,
            html: `<h3> You will use this otp to register new account: ${otp} </h3>`
        })
    }
}

export default mailController


