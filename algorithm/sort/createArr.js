
// function createArr(len) {
// 	let i = 0, arr = [], item=0

// 	while(len>=0 && i<len) {
// 		item = Math.floor( Math.random() * len)

// 		if ( arr.indexOf(item) == -1) {
// 			arr.push(item)
// 			i++
// 		}
// 	}
// 	// let a = new Set(arr)
// 	// return [...a]
// 	return arr
// }

let count = 1000000

// console.time('createarr')
// createArr(count)
// console.timeEnd('createarr')


/**
 * 构造不重复随机数组
 * @param range [start, end] start: 开始数 end: 结束数
 * @param count 取多少个
 */
function spliceRam(range, count) {
  const ramArr = [];
  const result = [];

  for (let i = range[0]; i <= range[1]; i++) {
      ramArr.push(i);
  }

  for (let i = 0; i < count; i++) {
      const ram = Math.floor(Math.random() * (ramArr.length - 1));

      result.push(ramArr[ram]);

      ramArr.splice(ram, 1);
  }

  return result;
};

console.time('spliceRam')
spliceRam(count * 100, count)
console.timeEnd('spliceRam')


function rangeRam(range, count) {
  const ramArr = [];
  const result = [];

  for (let i = range[0]; i <= range[1]; i++) {
      ramArr.push(i);
  }

  for (; count > 0; count--) {
      const ram = Math.floor(Math.random() * (ramArr.length - 1));

      result.push(ramArr[ram]);

      ramArr[ram] = ramArr[ramArr.length - 1];
      ramArr.pop();
  }

  return result;
};
console.time('rangeRam')
rangeRam(count * 100, count)
console.timeEnd('rangeRam')

/**
 * 洗牌算法
 * 洗牌算法第二种方式要比第一种使用sort快好多
 */
function shuffleSlow(arr = []) {
  return arr.sort(() => {
    return Boolean(Math.random() - 0.5)
  })
}
function shuffleQuick(arr) {
  let len = arr.length
  var newArr = []
  while(len) {
    var i = Math.floor(Math.random() * len--)
    let item = arr.splice(i, 1)[0]
    newArr.push(item)

  }
  return newArr
}

function newRangeArr(range) {
  let  ramArr = []
  for (let i = 0; i <= range; i++) {
    ramArr.push(i);
  }
  return ramArr
}


console.time('newRangeArr')
let arr = newRangeArr(count)
console.timeEnd('newRangeArr')

console.time('shuffle2')
shuffleQuick(arr)
console.timeEnd('shuffle2')


function createArr(count) {
  let  ramArr = []
  for (let i = 0; i <= count; i++) {
    ramArr.push(i);
  }
  return shuffleQuick(ramArr)
}


console.time('createarr')
createArr(count)
console.timeEnd('createarr')

module.exports = createArr
