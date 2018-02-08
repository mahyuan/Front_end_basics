
/** 
 * Set 中所有元素都是唯一的
 */

function f1(arr) {
	let s = new Set(arr)
	return [...s]
}
f1([1,1,2,3,4,5,5,6]) //[1,2,3,4,5,6]

/**
 * 移除数组 arr 中的所有值与 item 相等的元素。不要直接修改数组 arr，结果返回新的数组
 */
/*
function removeItem(arr, item) {
	return arr.filter(cur => cur !== item)
}

removeItem([1,2,2,3,3,4,5,3], 3) // [1,2,2,4,5]
*/

function removeItem(arr, item) {
	let arr1 = []
	for(var i=0;i<arr.length;i++) {
		if(arr[i] !== item) {
			arr1.push(arr[i])
		}
	}
	return arr1
}

console.log(removeItem([1,2,2,3,3,4,5,3], 3))




