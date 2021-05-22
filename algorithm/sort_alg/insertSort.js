const  { initArr, swap }  = require('./utils')

// 10万(10E4)倒叙数组时间-5.6s
function insertSort(arr) {
    let len = arr.length
    let temp, j
    for(let i = 1; i < len; i++) {
        temp = arr[i]
        j = i
        while(j > 0 && arr[j - 1] > temp) {
            arr[j] = arr[j-1]
            j--
        }
        arr[j] = temp
    }
}



// let count = 20
let count = 10E4
console.time('initArr')
let arr = initArr(count)
console.timeEnd('initArr')

console.time('b')
insertSort(arr)
console.timeEnd('b')

// console.log(arr.toString())
