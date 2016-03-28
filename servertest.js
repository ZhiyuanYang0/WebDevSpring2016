var express = require('express');
var app = express();

app.use(express.static(__dirname+'/public'));


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);

app.get('/api/hello', sayHello);

function sayHello(req, res) {
    console.log('Say Hello');
    res.send('<h1>Hello</h1>');
}

app.get('/api/json', function (req, res) {
    var course = {
        title: 'Java 101',
        seats: 23
    }
    res.json(course);
})
