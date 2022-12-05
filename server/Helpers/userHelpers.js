const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config({path:'./var/.env'})


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.OTP_MAIL, // generated ethereal user
        pass: process.env.OTP_PASSWORD, // generated ethereal password
    },
});
module.exports = {

    OTPgenerator: () => {
        const otpLength = 4
        let otp = ""
        for (let i = 0; i < otpLength; i++) {
            otp += Math.floor(Math.random() * 9)
        }
        return otp
    },
    sentOTPverificationmail: (email, otp) => {
        try {
            const mailOptions = {
                form: 'socialmedia@gmail.com',
                to: email,
                subject: "verify your email",
                html: `<p>Enter <b> ${otp}  </b> in the app to verify your email address</p>`
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("errr");
                    console.log(error);
                } else {
                    console.log("Verification otp mail sent");
                    console.log(info.response);
                    res.json({
                        status: "pending",
                        message: "Verification otp mail sent",
                        mail: email,

                    })
                }
            });
        } catch (error) {
            res.json({
                status: "Failed",
                message: error.message,
            })
        }
    },
    Posts: (Data) => {
        console.log("data", Data);
        const { description, postImage } = Data
        console.log(description, postImage);

    }
}