const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        // xoauth2: xoauth2.createXOAuth2Generator({
        //     user: 'gaalvesreis@gmail.com',
        //     clientId: '502154794085-46aqj1r138db5rjfrb78c3k74286b2c0.apps.googleusercontent.com',
        //     clientSecret: 'sm7djjhP-hwYS5yndp3kxeta',
        //     refreshToken: '1/QO4hVn2IvPgSSgKxZ7MlXWHFqJe_GLOT2YwKoJ42lDU'
        // })

        user: 'gaalvesreis@gmail.com',
        pass: 'alves290892reis'
     
    }
})

var mailOptions = {
    from: 'My Name <gaalvesreis@gmail.com>',
    to: 'julienecaroline79@gmail.com',
    subject: 'Nodemailer test',
    text: 'Hello World!!'
}

transporter.sendMail(mailOptions, function (err, res) {
    if(err){
        console.log('Error' + err);
    } else {
        console.log('Email Sent');
    }
})
