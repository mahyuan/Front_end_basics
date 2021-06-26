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


// 10E4倒叙数组时间47ms
function quick_sort(array) {
  if(array.length <= 1) {
      return array
  }

  let leftArr = []
  let rightArr = []

  let pivot = array.pop()
  let centerArr = [pivot]

  while(array.length > 0) {
      let current = array.pop()
      if(current === pivot) {
          centerArr.push(current)
      } else if(current < pivot) {
          leftArr.push(current)
      } else {
          rightArr.push(current)
      }
  }

  let leftSorted = quick_sort(leftArr)
  let rightSorted = quick_sort(rightArr)

  return leftSorted.concat(centerArr, rightSorted)
}


// let count = 20
let count = 10E4

console.time('initArr')
let arr = initArr(count)
console.timeEnd('initArr')
// console.log('arr before sorted:', arr.toString())

console.time('quickSort')
quickSort(arr)
console.timeEnd('quickSort')


// console.time('quick_sort')
// let arrSorted = quick_sort(arr)
// console.timeEnd('quick_sort')
// console.log('arr after sorted:', arrSorted.toString())

