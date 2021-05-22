const  { initArr, swap }  = require('./utils')



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


// let count = 20
let count = 10E4

console.time('initArr')
let arr = initArr(count)
console.timeEnd('initArr')
// console.log(arr.toString())

console.time('b')
quickSort(arr)
console.timeEnd('b')

// console.log(arr.toString())
