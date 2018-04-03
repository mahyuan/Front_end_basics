// 快速排序
let createArr = require('./createArr.js')

let arr = createArr(10000)

function quickSort(arr) {
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
// quickSort(arr)
// console.time('quickSort')
// console.timeEnd('quickSort')


function quick_sort(arr) {
	if(!arr.length) return [];

	let left = [],
		right = [],
		middle = arr[0];

	for(let it =1; it<arr.length; it++) {
		if(arr[it] < middle){
			left.push(arr[it])
		}else{
			right.push(arr[it])
		}
	}
	return quick_sort(left.concat(middle, quick_sort(right)))
}

// quick_sort(arr)
// console.time('quick_sort')
// console.timeEnd('quick_sort')

let state = true 
setInterval(() => {
	if(state){
		console.time('quickSort')
		console.timeEnd('quickSort')
	}else{
		console.time('quick_sort')
		console.timeEnd('quick_sort')
	}

	console.log('===end====', arr[50])
	// console.log(arr)
	state = !state
}, 2000);
