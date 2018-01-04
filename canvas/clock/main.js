var ele = document.getElementById('canvas');
var width = ele.width = 300;
var height = ele.height = 300;
var ctx = ele.getContext('2d');

ctx.lineWidth = 3;
ctx.strokeStyle = "#333";
ctx.fillStyle = "#ccc";
ctx.benginPath();
ctx.arc(150, 150, 100, 0, 2*Math.PI, false)
ctx.fillRect(0,0,100,100)
ctx.stroke()
// function drawCircle(x, y, r) {

// }
// drawCircle(150, 150, 100)
// ctx