var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var thePort = process.env.PORT || 8000;
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json()); // for parsing application/json

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'BEEP, BEEP... etc'});
});

app.get('/test', function (req, res) {
  res.render('test', { title: 'TEST', message: 'THIS IS CRAP'});
});

app.post('/ah', function(request, response){
    console.log(request.body.user.name);
    console.log(request.body.user.email);

});
var server = app.listen(thePort, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});