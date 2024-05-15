const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

exports.sendEmail = async ( emailTo, subject = '', text = '', html) => {
    return new Promise(async (resolve, reject) => {
        await transporter.sendMail({
            from: 'simak@smkpunegerijabar.sch.id',
            to: emailTo,
            subject,
            text,
            html
        }).then((response) => {
            console.log(response)
            resolve({
                success: true,
                message: response,
                email: { emailTo, subject, text, html
                }
            })
        }).catch(error => {
            console.log(error)
            reject({
                success: false,
                message: error,
                email: { emailTo, subject, text, html
                }
            })
        })
    })
}