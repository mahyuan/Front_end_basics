/**
 * Array prototy and function
 * 
 */
var arr = ['1', '2', '3','4'];
var first = arr[0]
var last = arr[arr.length -1]

//遍历
arr.forEach(function(item, index, array){
  console.log(item,index)
})

push  pop   数组末尾添加、删除元素
var newLength = arr.push('4') // 返回新的length
var last = arr.pop()  //返回最后一个元素，即删除的元素， 无参数


//unshift  shift  数组头部添加删除元素

var newLenth = arr.unshift('0')
var first = arr.shift()

// findIndex  indexOf
/**
 * indexOf(): 参数为数组的某个元素；
 * findIndex(): 参数可以为方法， 返回符合条件的元素的索引, 如果有多个，仅返回第一个符合条件的元素的索引，可否通过回调函数控制返回所有？
 *
 */

var index = arr.indexOf('3') 

let fn = function(ele) {
  return ele >=4
}
var index1 = arr.findIndex(fn)



/**
 * splice()
 *  会改变原数组
 *  第一个参数为开始删除的索引，第二个参数为删除的元素个数，后面的参数为要添加的元素
 *
 */

var students = ['l', 'h', 'w', 'j']
var newSt = ['xm', 'xh', 'xx'] 

var removedItems = students.splice(1,2, 'cai', 'wu')
var removedItems2 = students.splice(3,2, ...newSt)
console.log(students, removedItems2) // [ 'l', 'h', 'w', 'xm', 'xh', 'xx' ] [ 'j' ]



/**
 * slice()
 * 截取数组元素， 返回新数组
 * 两个参数， 第一个参数为开始的索引， 第二个为结束的索引
 * 如果不传参数， 则截取第一个元素到最后一个元素， 即复制整个数组
 */

var arr = [1,2,3,4,45,5,66]
var a1 = arr.slice()
console.log(arr, a1)















