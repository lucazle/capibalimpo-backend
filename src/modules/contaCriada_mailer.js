nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "capibalimpo@gmail.com",
        pass: "zhwamuvdlxzpwlll"
    },
    secure: true
});

function sendMail(transporter) {

    const mailData = {
        from: "capibalimpo@gmail.com",
        to: req.body.email,
        subject: "",
        text: "",
        html: ""
    };

    transporter.sendMail(mailData)
}

module.exports = sendMail