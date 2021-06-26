const  { initArr, swap }  = require('./utils')



// 10E4倒叙数组时间23ms
// 10E5倒叙数组时间70ms
// 空间复杂度O(logn) 没有内存问题
// 最佳实现
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
// 10E5倒叙数组时间? 内存溢出，哈哈，空间复杂度O(n^2)
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



/**
 * 下面是菜鸟教程上的快速排序实现
 * https://www.runoob.com/w3cnote/quick-sort-2.html
 */
// 10E5倒叙数组时间70ms
function quickSort1(arr, left, right) {
  var len = arr.length,
      partitionIndex,
      left = typeof left != 'number' ? 0 : left,
      right = typeof right != 'number' ? len - 1 : right;

  if (left < right) {
      partitionIndex = partition(arr, left, right);
      quickSort1(arr, left, partitionIndex-1);
      quickSort1(arr, partitionIndex+1, right);
  }
  return arr;
}

function partition(arr, left ,right) {     // 分区操作
  var pivot = left,                      // 设定基准值（pivot）
      index = pivot + 1;
  for (var i = index; i <= right; i++) {
      if (arr[i] < arr[pivot]) {
          swap(arr, i, index);
          index++;
      }
  }
  swap(arr, pivot, index - 1);
  return index-1;
}

// function swap(arr, i, j) {
//   var temp = arr[i];
//   arr[i] = arr[j];
//   arr[j] = temp;
// }

// 10E4 Maximum call stack size exceede
function partition2(arr, low, high) {
  let pivot = arr[low];
  while (low < high) {
    while (low < high && arr[high] > pivot) {
      --high;
    }
    arr[low] = arr[high];
    while (low < high && arr[low] <= pivot) {
      ++low;
    }
    arr[high] = arr[low];
  }
  arr[low] = pivot;
  return low;
}

function quickSort2(arr, low, high) {
  low = typeof low != 'number' ? 0 : low,
  high = typeof high != 'number' ? arr.length - 1 : high;

  if (low < high) {
    let pivot = partition2(arr, low, high);
    quickSort2(arr, low, pivot - 1);
    quickSort2(arr, pivot + 1, high);
  }
  return arr;
}


// console.time('quickSort1')
// quickSort1(arr)
// console.timeEnd('quickSort1')


// console.time('quickSort2')
// let arr2 = quickSort2(arr)
// console.timeEnd('quickSort2')
// console.log(arr2.toString())
