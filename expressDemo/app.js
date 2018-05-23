const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('hello'))

app.listen(2000, () => console.log('Listen port 2000'))











/*
var express = require('express');
var http = require('http');

var app = express();

//var routes  = require('./routes')(app);

app.get('/', function(req, res) {
  res.send('444');
});

app.listen(3001);
*/