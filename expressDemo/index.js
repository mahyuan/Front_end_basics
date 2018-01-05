var express = require('express');
var http = require('http');

var app = express();

//var routes  = require('./routes')(app);

app.get('/', function(req, res) {
  res.send('444');
});

app.listen(3001);
