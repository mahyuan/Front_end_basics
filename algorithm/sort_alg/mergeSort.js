const  { initArr }  = require('./utils')



// 10E4倒叙数组时间 28ms
function mergeSort(arr) {
    function merge(left, right) {
        let result = [], il = 0, ir = 0
        while (il < left.length && ir < right.length) {
            if(left[il] < right[ir]) {
                result.push(left[il++])
            } else {
                result.push(right[ir++])
            }
        }

        while(il < left.length) {
            result.push(left[il++])
        }
        while(ir < right.length) {
            result.push(right[ir++])
        }

        return result
    }

    let len = arr.length
    if(len === 1) {
        return arr
    }

    let mid = Math.floor(len / 2)
    let left = arr.slice(0, mid)
    let right = arr.slice(mid, len)
    return merge(mergeSort(left), mergeSort(right))
}


// let count = 20
let count = 10E4
// let count = 100000 // 10E4

console.time('initArr')
let arr = initArr(count)
console.timeEnd('initArr')

console.time('b')
let newArr = mergeSort(arr)
console.timeEnd('b')

// console.log(newArr.toString())
