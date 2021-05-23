/**
 * 搜索算法
 * 1. 顺序搜索-即普通的顺序遍历，将数组中的每一项都和要搜索的值进行比对，是最低效的一种搜索算法
 * 2. 二分查找法，这个算法要求被搜索的数据结构已排序
 * 1）选择数组的中间值
 * 2）如果中间值是待搜索项，那么算法执行完毕了（找到了）
 * 3）如果待搜索值比选中值要小，则返回步骤1并在选中值左边的子数组中寻找
 * 4）如果待搜索值比选中值大，则返回步骤1并在选中值右边的子数组中寻找
 *
 * 如果待搜索的数组没有排序，可以进行排序
 */


function swap(i, j, arr) {
  let len = arr.length
  if (i < len && j < len) {
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
  }
}

/**
* @param {int} len
* @return {array} [9,8,7,6,5,4,3,2,1]
*/
function initArr(len) {
  let arr = []
  let i = len
  while (i > 0) {
      arr.push(i)
      i--
  }
  return arr
}
/**
 * 快速排序
 */
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

const binarySearch = function(arr, item) {
  // console.log(arr.toString())
  let low = 0,
      high = arr.length,
      mid, element

  while(low <= high) {
    mid = Math.floor((low + high) / 2)
    element = arr[mid]
    if(element > item) {
      high = mid - 1
    } else if(element < item) {
      low = mid + 1
    } else {
      console.log('res:', element);
      console.log(`res: i:${mid}, value: ${element}`)
      return mid
    }
  }
  console.log('res:', element);
  return -1
}


// const arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
const arr = initArr(10E4)

console.time('quickSort')
quickSort(arr)
console.timeEnd('quickSort')

console.time('binarySearch')
let resultIndex = binarySearch(arr, 10E4 - 5)
console.timeEnd('binarySearch')
console.log('--result Index--', resultIndex)
// console.log()


function search(arr, item) {
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === item) {
      console.log(`res: i:${i}, value: ${arr[i]}`)
      return i
    }
  }
  return -1
}

console.log('-----------');

const arr2 = initArr(10E4)
console.time('search')
let index = search(arr, 10E4 - 5)
console.timeEnd('search')
console.log('--result Index--', index)
// console.log()
