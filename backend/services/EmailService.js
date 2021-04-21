const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport')

class EmailService {
    static async sendEmail(){
        const transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'marketbuzzhelp@gmail.com',
                pass: 'Passwordbuzz'
            }
        }));

        const maillist = [
            'coolrishabhrawat@gmail.com',
            'mukulkumarjha16@gmail.com',
        ];

        maillist.toString();

        const mailOptions = {
            from: 'marketbuzzhelp@gmail.com',
            to: maillist,
            subject: 'Welcome to market buzz',
            text: 'Enjoy 7 day free subscription.'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = EmailService;
