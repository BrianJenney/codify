var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var firebase = require('Firebase');


// Initialize Firebase
var config = {
apiKey: "AIzaSyCgcDx3o3v_xk7hIHlScBR2FJE5mW0a3Cs",
authDomain: "codify-afedf.firebaseapp.com",
databaseURL: "https://codify-afedf.firebaseio.com",
storageBucket: "codify-afedf.appspot.com",
};
firebase.initializeApp(config);

var rootRef = firebase.database().ref();

//get student values from firebase
rootRef.on('value',function(snapshot){
    snapshot.forEach(function(childSnapshot){
        var child = childSnapshot.val();
        for(var x in child){
            var student = child[x];

            //format date correctly
            student.date = new Date( student.date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") );

            //get current date
            var q = new Date();
            var m = q.getMonth();
            var d = q.getDate();
            var y = q.getFullYear();

            var curDate = new Date(y,m,d);

            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

            //get difference of days to determine which week they
            //should be on
            var diffDays = Math.round(Math.abs((curDate.getTime() - student.date.getTime())/(oneDay)));

            //access object property dynamically to get current week;
            var curWeek = "week" + (diffDays % 7).toString();

            var thisWeek = student[curWeek];

            if(typeof thisWeek !== 'undefined'){
                console.log(student.email)
            }


        }
    })
})


//twilio account stuff
var accountSid = 'AC7ba88a6599ee96042b778acc047436fd'; 
var authToken = 'ecfd835d7a3e90d66a0cec19adb971ad'; 


app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 3000);


//web service to send text
app.get('/sendtext', function(req, res){
    var client = require('twilio')(accountSid, authToken); 
     console.log(req.query.to)
     console.log(req.query.message)
    client.messages.create({ 
        to: "'" + req.query.to + "'", 
        from: "6504667925", 
        body: req.query.message,   
    }, function(err, message) { 
        console.log(err); 
    });
})

//web service to send email to students on sign up
app.get('/sendmail', function(req, res){
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
        subject: 'Message from Codify', // Subject line
        text: '', // plaintext body
        html: "<p>" + req.query.message + "</p>"// html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log('Error:' + error);
        }
        console.log('Message sent: ' + info.response);
    });
})
