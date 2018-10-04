var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'gaalvesreis@gmail.com',
		pass: 'alves290892reis'
	}
});

const mailOptions = {
	from: 'gaalvesreis@gmail.com',
	to: 'gaalvesreis@gmail.com',
	subject: 'Teste',
	html: 'Oi'
};

transporter.sendMail(mailOptions, function(err, info){
	if(err)
		console.log(err);
	else
		console.log(info);
});