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
    return arr
}
module.exports = {
    initArr,
    swap
}
