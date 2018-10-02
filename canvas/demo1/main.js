let canvas = document.getElementById("canvas");
let context = canvas.getContext('2d');

context.font = "38px Arial";
context.fillStyle = "cornflowerblue";
context.strokeStyle = "blue";
context.fillText('Hello', canvas.width/2 - 150, canvas.height/2 + 15);
context.strokeText('hello canvas', canvas.width/2 - 150, canvas.height/2 + 15);

// debugger;
// let ctx = JSON.stringify(context);
let ctx = String(context);

console.log(context instanceof Object );

console.log('canvas', canvas);
console.log('context', context);
console.log('ctx', ctx);


