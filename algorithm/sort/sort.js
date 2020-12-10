let createArr = require('./createArr.js')
let count = 100000000
/**
 * 冒泡排序 BubbleSort
 * 冒泡排序的算法思想如下（升序排序）：
 * 1.比较相邻的元素。如果第一个比第二个大，就交换它们两个；
 * 2.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样最终最大数被交换到最后的位置
 * 3.除了最后一个元素以外，针对所有的元素重复以上的步骤
 * 4.重复步骤1~3，直到排序完成
 *
 * 算法复杂度：
 * 最好最坏时间复杂度都是： n2
 *
 * 特点： 与插入排序需要相同的运行时间，但是交互次数确有差异，插入排序在最好 情况下只n次交换
 */
// var arr = [22,32,11,22,43,90,53,43,23,54,19]
// var arr = []


console.time('createArr')
let arr = createArr(count)
// console.log(arr, 'arr')
// console.log(arr.length, 'arr.length')
console.timeEnd('createArr')
// console.log(Math.max(...arr), 'max')

function bubbleSort(data) {

	var temp = 0
	for (var i = data.length ; i > 0; i--) {
		for (var j = 0; j < i - 1; j++) {
			if(data[j] > data[j+1]) {
				temp = data[j]
				data[j] = data[j+1]
				data[j+1] = temp
			}
		}
	}
	return data
}
console.time('bubbleSort')
bubbleSort(arr)
// console.log(bubbleSort(arr), 'bubbleSort')
console.timeEnd('bubbleSort')

/**
 * 选择排序（SelctionSort）
 * 选择排序是一种比较简单直观的排序算法。它的算法思想是，从数组的开头开始遍历，将第一个元素和其他元素分别进行比较，记录最小的元素，等循环结束之后，
 * 将最小的元素放到数组的第一个位置上，然后从数组的第二个位置开始继续执行上述步骤。当进行到数组倒数第二个位置的时候，所有的数据就完成了排序。
 * 选择排序同样会用到嵌套循环，外循环从数组第一个位置移到倒数第二个位置；内循环从第二个位置移动到数组最后一个位置，查找比当前外循环所指向的元素还要小的元素，
 * 每次内循环结束后，都会将最小的值放到合适的位置上。
 *
 * 算法复杂度：
 * 最好最坏： n2
 * 交换操作介于： 0和 n-1次之间
 * 特点：
 * 交换次数比冒泡排序少， 由于交换所需cpu时间比比较所需时间多，n较小是，选择排序比冒泡排序快
 * 原地操作几乎是选择排序唯一的优点，当空间复杂度 要求较高时，可以考虑 选择排序
 */

function selctionSort(data) {
	for (var i = 0; i < data.length; i++) {
		var temp = 0,
			index = i;
		for (var j = i + 1; j < data.length; j++) {
			if (data[index] > data[j]) {
				index = j
			}
		}
		temp = data[i]
		data[i] = data[index]
		data[index] = temp
	}

	return data
}
arr = createArr(count)
console.time('selctionSort')
selctionSort(arr)
// console.log(selctionSort(arr), 'selctionSort')
console.timeEnd('selctionSort')
/**
 * 插入排序（insertionSort）
 * 插入排序有点类似人类按字母顺序对数据进行排序，就如同你打扑克牌一样，将摸来的扑克按大小放到合适的位置一样。它的原理就是通过嵌套循环，外循环将数组元素挨个移动，
 * 而内循环则对外循环中选中的元素及它后面的元素进行比较；如果外循环中选中的元素比内循环中选中的元素小，那么数组元素会向右移动，为内循环中的这个元素腾出位置。
 * 实现步骤如下：
 * 1.从第一个元素开始，该元素默认已经被排序
 * 2.取出下一个元素，在已经排序的元素序列中从后向前扫描
 * 3.如果该元素（已排序）大于新元素，将该元素移到下一位置
 * 4.重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
 * 5.将新元素插入到该位置
 * 6.重复步骤2~5，直到排序完成
 *
 * 算法复杂度:
 * 平均时间复杂度: n2
 * 最坏时间复杂度： n2， 最坏的情况， 数据降序排列， n2次
 * 最优时间复杂度： n 最好的情况，数据已经升序排列了， 需要进行n-1次
 * 空间复杂度：总共O(n)，需要辅助空间O(1)
 *
 * 特点：插入排序不适合数据量比较大的应用，数据量小于1000或者元素大致上按照顺序排列的情况下可以使用
 */
function insertionSort(data) {
	for (var i = 0; i < data.length; i++) {
		var key = data[i]
		var j = i - 1
		while(j >= 0 && data[j] > key) {
			data[j+1] = data[j]
			j--
		}
		data[j+1] = key
	}
	return data
}
arr = createArr(count)
console.time('insertionSort')
insertionSort(arr)
// console.log(insertionSort(arr), 'insertionSort')
console.timeEnd('insertionSort')

/**
 * 希尔排序（Shell Sort）
 * 我们首先要学习的就是希尔排序，又称缩小增量排序，这个算法是在插入排序的基础上做了很大的改善，与插入排序不同的是，它首先会比较位置较远的元素，而非相邻的元素。
 * 这种方案可以使离正确位置很远的元素能够快速回到合适的位置，当算法进行遍历时，所有元素的间距会不断的减小，直到数据的末尾，此时比较的就是相邻元素了。
 * 该方法的基本思想是：先将整个待排元素序列分割成若干个子序列（由相隔某个“增量”的元素组成的）分别进行直接插入排序，然后依次缩减增量再进行排序，
 * 待整个序列中的元素基本有序（增量足够小）时，再对全体元素进行一次直接插入排序。因为直接插入排序在元素基本有序的情况下（接近最好情况），效率是很高的，
 * 因此希尔排序在时间效率上有较大提高。
 */

function shallSort(array) {
	var increment = array.length;
	var i
	var temp; //暂存
	do {
		//设置增量
		increment = Math.floor(increment / 3) + 1;
		for (i = increment ; i < array.length; i++) {
			if ( array[i] < array[i - increment]) {
				temp = array[i];
				for (var j = i - increment; j >= 0 && temp < array[j]; j -= increment) {
					array[j + increment] = array[j];
				}
				array[j + increment] = temp;
			}
		}
	}
	while (increment > 1)

	return array;
}
arr = createArr(count)
console.time('shallSort')
shallSort(arr)
// console.log(shallSort(arr), 'shallSort')
console.timeEnd('shallSort')

/**
 * 归并排序（Merge Sort）
 * 将两个的有序数列合并成一个有序数列，我们称之为"归并"，归并排序的思想就是将一系列排序好的子序列合并成一个大的完整有序的序列。
 * 实现步骤如下：
 * 1.把长度为n的输入序列分成两个长度为n/2的子序列；
 * 2.对这两个子序列分别采用归并排序；
 * 3.将两个排序好的子序列合并成一个最终的排序序列
 *
 */
function mergeSort ( array ) {
	var len = array.length;
	if( len < 2 ){
		return array;
	}
	var middle = Math.floor(len / 2),
		left = array.slice(0, middle),
		right = array.slice(middle);
	return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
	var result = [];
	while (left.length && right.length) {
		if (left[0] <= right[0]) {
			result.push(left.shift());
		} else {
			result.push(right.shift());
		}
	}
	while (left.length)
		result.push(left.shift());
	while (right.length)
		result.push(right.shift());
	return result;
}
arr = createArr(count)
console.time('mergeSort')
mergeSort(arr)
// console.log(mergeSort(arr), 'mergeSort')
console.timeEnd('mergeSort')


/**
 * 快速排序（Quicksort）
 * 快速排序是处理大数据最快的排序算法之一，它也是一种分而治之的算法，通过递归方式将数据依次分解为包含较小元素和较大元素的不同子序列，会不断重复这个步骤，
 * 直到所有的序列全部为有序的，最后将这些子序列一次拼接起来，就可得到排序好的数据。
 * 该算法首先要从数列中选出一个元素作为基数（pivot）。接着所有的数据都将围绕这个基数进行，将小于改基数的元素放在它的左边，大于或等于它的数全部放在它的右边，
 * 对左右两个小数列重复上述步骤，直至各区间只有1个数。
 */
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
arr = createArr(count)
console.time('quickSort')
quickSort(arr)
// console.log(quickSort(arr), 'quickSort')
console.timeEnd('quickSort')

module.exports = {
	bubbleSort,
	selctionSort,
	insertionSort,
	shallSort,
	mergeSort,
	quickSort
}
// console.log(module)
