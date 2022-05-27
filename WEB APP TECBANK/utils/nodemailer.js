const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'adrivargas48@estudiantec.cr',
        pass: 'Colopolo123.' 
    }
});

function sendEmail(to, subject, text){
    const options = {
        from: 'adrivargas48@estudiantec.cr',
        to: to,
        subject: subject,
        text: text
    }

    transporter.sendMail(options, function(err, info){
        if(err){
            console.log(err);
        } 
    });
}

module.exports = sendEmail;