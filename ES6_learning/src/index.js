/*let s = Symbol();
let a = typeof s;
console.log(a)*/

// const http = require('http')
// console.log(http)
// http.
	// createServer()

const { PI } = Math;

exports.area = (r) => PI * r ** 2;
console.log(exports.area(2))
exports.circumference = (r) => 2 * PI * r;

