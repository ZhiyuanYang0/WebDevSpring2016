var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(bodyParser.json());// for parsing application/json
app.use(session({ secret: "temporary string" }));//private key to identify the person
app.use(cookieParser());

app.use(express.static(__dirname+'/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);

app.get('/hello',function(req,res){
    res.send('hello world');
});

//require("./public/assignment/server/app.js")(app);
