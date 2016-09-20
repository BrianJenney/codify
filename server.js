var express = require('express');
var app = express();
var nodemailer = require('nodemailer');


var accountSid = 'AC7ba88a6599ee96042b778acc047436fd'; 
var authToken = 'ecfd835d7a3e90d66a0cec19adb971ad'; 


app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 3000);

//web service to send email to students on sign up
app.get('/sendmail', function(req, res){

var client = require('twilio')(accountSid, authToken); 
 
client.messages.create({ 
	to: "5102068990", 
	from: "+16504667925", 
	body: "Hey new student",   
}, function(err, message) { 
	console.log(err); 
}); 

	var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: 'brianjenney83@gmail.com',
        pass: 'freestyl1'
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Codify" <brianjenney83@gmail.com>', // sender address
    to: '<'+req.query.to+'>', // list of receivers
    subject: 'Welcome to Codify', // Subject line
    text: 'Follow this link...', // plaintext body
    html: "<p>Hey new student, follow this <a href='https://www.codify.com'>link</a></p>"// html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log('Error:' + error);
    }
    console.log('Message sent: ' + info.response);
});




})
