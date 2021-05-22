// 快速排序, 这种方法比较耗内存，性能不佳，
let createArr = require('./createArr.js')

let arr = createArr(10000)

// 10E4倒叙数组时间23ms
function quickSort(array) {
  function quick(arr, left, right) {
      let index;
      if(arr.length > 1) {
          index = partition(arr, left, right)
          if(left < index - 1) {
              quick(arr, left, index - 1)
          }
          if(index < right) {
              quick(arr, index, right)
          }
      }
  }
  function partition (arr, left, right) {
      // 取数组中间值作为主元是最优解
      let pivot = arr[Math.floor((right + left) / 2)]
      let i = left
      let j = right

      while(i <= j) {
          while(arr[i] < pivot) {
              i++
          }
          while(arr[j] > pivot) {
              j--
          }

          if(i <= j) {
              swap(i, j, arr)
              i++
              j--
          }
      }
      return i
  }

 quick(array, 0, array.length)
}

// 容易内容溢出
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
