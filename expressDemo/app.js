const express = require('express')
const axios = require('axios')
const app = express()
app.get('/', (req, res) => res.send('hello'))
app.get('/api/students', (req, res) => {
	let students = [
		{
			id: 1,
			name: 'john',
			classRoomId: 1
		},
		{
			id: 2,
			name: 'bob',
			classRoomId: 1
		},
		{
			id: 3,
			name: 'lee',
			classRoomId: 1
		},
		{
			id: 4,
			name: 'jack',
			classRoomId: 1
		},
	]
	res.send(students)
})

app.get('/api/courses', async function(req, res) {
	let { studentID } = req.query
	let students = await axios.get('/api/students')
	console.log('students', students);
	res.send(students)
})

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
