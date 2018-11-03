let creatArr = require('./createArr.js');

let arr = creatArr(100);
// console.log('arr', JSON.stringify(arr));

function select(data) {
	for(let i=0; i<data.length; i++) {
		let t = 0;
		let min = data[i];
		index = i;
		for(let j = i + 1; j< data.length ; j++) {
			if(min > data[j] ) {
				index = j;
				min = data[j];
			}
		}

		t = data[i];
		data[i] = min;
		data[index] = t;
	}
	return data;

}
let a1 = select(creatArr(100));


function blur(data) {
	let tem = 0;
	for(let i = data.length; i > 0; i--) {
		let index = i
		for(let j = 0; j < i - 1; j++) {
			if(data[i] < data[j]) {
				tem = data[i];
				data[i] = data[j];
				data[j] = tem;
			}
		}
	}
	return data;
}


let a2 = blur(creatArr(100));

function quicksort(data) {
	if(data.length === 0) {
		return [];
	}
	let left = [];
	let right = [];
	let middle = data[0];
	for( let i = 1; i < data.length; i++ ) {
		if(data[i] < middle ) {
			left.push ( data[i] )
		} else {
			right.push( data[i] )
		}
	}
	return quicksort( left ).concat( middle, quicksort( right ));
}

// let a3 = quicksort(creatArr(44));

function quickSort( arr ){
	if ( arr.length == 0) {
		return [];
	}
	var left = [];
	var right = [];
	var pivot = arr[0];
	for (var i = 1; i < arr.length; i++) {
		if (arr[i] < pivot) {
			left.push( arr[i] );
		} else {
			right.push( arr[i] );
		}
	}
	return quickSort( left ).concat( pivot, quickSort( right ));
}
let a4 = quicksort(arr)

console.log(JSON.stringify(a4));


