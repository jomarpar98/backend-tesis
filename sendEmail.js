import nodemailer from "nodemailer"

const sendEmail = (sendTo, subject, text) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user:"noreplyusability@gmail.com",
            pass:"grvoczzmmzlnpxpa",
        },
        tls: {
            rejectUnauthorized: false,
        }
    })

    let mailOptions = {
        from: "noreplyusability@gmail.com",
        to: sendTo,
        subject: subject,
        text: text
    }

    transporter.sendMail(mailOptions, function(err,success){
        if(err) {
            console.log(err)
        } else {
            console.log("email is send!")
        }
    })
}

export default sendEmail