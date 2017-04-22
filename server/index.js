var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cfenv = require('cfenv');

var app = express();

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.listen(appEnv.port, appEnv.bind, function() {
    console.log("server starting on " + appEnv.url);
})

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ROUTES //
// ------------------------------------------------------------------------- //

app.get('/alerts', function(req, res){
  request({ url: 'https://community-alert-nr.mybluemix.net/alerts', json: true }, function(error, response, body) {
    console.log('error:', error);
    console.log('status code:', response.statusCode);
    res.send({payload: body});
  })
});

app.get('/alert', function(req, res){
  request({ url: 'https://community-alert-nr.mybluemix.net/alert?id=' + req.query.id, json: true }, function(error, response, body) {
    console.log('error:', error);
    console.log('status code:', response.statusCode);
    res.send({payload: body});
  })
});
