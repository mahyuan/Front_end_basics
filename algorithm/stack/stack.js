/**
 * 栈
 */
class Stack {
  consctructor() {
    this.dataStore = [];
    this.add = add;
    this.remove = remove;
    this.clear = clear;
    this.isEmpty = isEmpty;
    this.size = this.dataStore.length;
  }
  add(item) {
    return this.dataStore.unshift(item);
  }
  remvoe() {
    return this.dataStore.shift();
  }
  clear() {
    this.dataStore.length = [];
  }
  isEmpty() {
    return this.dataStore.length === 0;
  }
}

function Stack2() {
  this.list = []
  this.add = function(it) {
    return this.list.push(it)
  }
  this.remove = function() {
    return this.list.pop()
  }
  this.clear = function() {
    this.list = []
  }
  this.size = function() {
    return this.list.length
  }
  this.isEmpty = function() {
    return this.list.length === 0
  }
  this.toString = function() {
    // console.log('====tpstring call');
    console.log(this.list.toString())
  }
}

// 十进制数转二进制
function numberToString(num, base) {
  return parseInt(num).toString(base).toUpperCase()
}

function divideBy2(decNumber) {
  var stack = new Stack2()
  var rem
  var str = ''
  while (decNumber > 0) {
    rem = Math.floor(decNumber % 2)
    stack.add(rem)
    decNumber = Math.floor(decNumber / 2)
  }
  while (!stack.isEmpty()) {
    str += stack.remove()
  }
  return str
}
var n1 = 10221
console.log('divideBy2 n1', numberToString(n1, 2), divideBy2(n1))


// 转换为任意进制数据
function baseConverter(decNumber, base) {
  var stack = new Stack2()
  var rem
  var baseString = ''
  var digits = "0123456789ABCDEF" // 将十进制转成16进制时，余数是0到8之间的数字加上A、B、C、 D、E和F(对应10、11、12、13、14和15)
  while (decNumber > 0) {
    rem = Math.floor(decNumber % base)
    stack.add(rem)
    decNumber = Math.floor(decNumber / base)
  }
  while (!stack.isEmpty()) {
    baseString += digits[stack.remove()]
  }
  return baseString
}


var n2 = 121323
console.log('baseConverter n2', numberToString(n2, 16), baseConverter(n2, 16)) // 1D9EB 1D9EB
console.log('baseConverter n2', numberToString(n2, 2), baseConverter(n2, 2)) // 11101100111101011 11101100111101011
