import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hanh.huynhth34224002@hcmut.edu.vn',
        pass: '34224002'
    }
})

const mailController = {
    sendResetEmail: async (email, otp) => {
        await transport.sendMail({
            from: "hanh.huynhth34224002@hcmut.edu.vn",
            to: email,
            subject: "RESET YOUR PASSWORD",
            text: `Below is the otp to reset password: ${otp}`,
            html: `<h3> Below is the otp to reset password: ${otp} </h3>`,
        })
    },

    sendVerifyEmail: async (email, token) => {
        var url = "http://localhost:8000/api/user/verify-email?token=" + token;

        await transport.sendMail({
            from: "hanh.huynhth34224002@hcmut.edu.vn",
            to: email,
            subject: "VERIFY YOUR EMAIL",
            text: `Click on this link to verify ${url}`,
            html: `<h3> Click on this link to verify your email : ${url} </h3>`,
        })
    }
}

export default mailController


