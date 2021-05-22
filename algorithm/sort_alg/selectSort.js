const  { initArr, swap }  = require('./utils')

// 10万倒叙数组时间4s
function selectSort(arr) {
    let min = 0
    let len = arr.length
    for( let i = 0; i < len - 1; i++) {
        min = i
        for(let j = i; j < len; j++) {
            if(arr[j] < arr[min]) {
                min = j
            }
        }
        if(min !== i) {
            swap(min, i, arr)
        }
    }
}



// let count = 20
let count = 10E4
// let count = 100000 // 10E4

console.time('initArr')
let arr = initArr(count)
console.timeEnd('initArr')

console.time('b')
selectSort(arr)
console.timeEnd('b')

// console.log(arr.toString())
