// lib/math.js
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141593;


// app.js
import * as math from "lib/math";
console.log("2π = " + math.sum(math.pi, math.pi));


// otherApp.js
import {sum, pi} from "lib/math";
console.log("2π = " + sum(pi, pi));

/**
 * 还有的功能包括：export default and export *;
 */

// lib/mathplusplus.js
export * from "lib/math";
export var e = 2.71828182846;
export default function(x) {
    return Math.exp(x);
}


// app.js
import exp, {pi, e} from "lib/mathplusplus";
console.log("e^π = " + exp(pi));


// 计算角度
function cal(R, num, ang) {
	let arr = []
	let A, item;
	for(let i = 0; i<num;i++) {
		A = i != 0 ? ( i*Math.PI/3 + ang) : 0
		item = [ R * Math.cos(A).toFixed(2), R * Math.sin(A).toFixed(2)]
		arr.push(item)
	}
	return arr
	console.log(arr)
}
cal(70,6,0)