/**
 * @param {int} i
 * @param {int} j
 * @param {array} arr
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
    return shuffle(arr)
}

/**
 * 洗牌算法
 */
function shuffleQuick(arr) {
  let len = arr.length
  let temp
  for(let i = len - 1; i >= 0; i--) {
    var index = Math.floor(Math.random() * (i + 1))
    temp = arr[i]
    arr[i] = arr[index]
    arr[index] = temp
  }
  return arr
}

function shuffle(array) {
  let i = array.length
  let temp, index
  while(i > 0) {
    index = Math.floor(Math.random() * i--)
    temp = array[i]
    array[i] = array[index]
    array[index] = temp
  }
  return array
}

module.exports = {
    initArr,
    swap
}
