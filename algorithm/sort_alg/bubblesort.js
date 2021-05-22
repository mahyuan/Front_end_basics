
const  { initArr, swap }  = require('./utils')

// 10万倒叙数组时间7s
function bubbleSort(arr) {
    // 获取数组长度，以确定循环次数。
    let len = arr.length
    for (let i = 0; i < len; i++) {
        // 遍历数组的前len-i项，忽略后面的i项（已排序部分）。
        for (let j = 0; j < len - 1 - i; j++) {
            // 将每一项与后一项进行对比，不符合要求的就换位。
            if (arr[j] > arr[j + 1]) {
                swap(j, j + 1, arr)
                // [arr[j], arr[j + 1]] = [arr[j+1], arr[j]]
            }
        }
    }
}

// let count = 20
let count = 10E4
// let count = 100000

console.time('initArr')
let arr = initArr(count)
console.timeEnd('initArr')


console.time('b')
bubbleSort(arr)

// arr.toString()
console.timeEnd('b')
