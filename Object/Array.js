/**
 * Array prototy and function
 * 
 */
var arr = ['1', '2', '3','4'];
var first = arr[0]
var last = arr[arr.length -1]

//遍历
arr.forEach(function(item, index, array){
  //console.log(item,index)
})

//push  pop   数组末尾添加、删除元素
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
//console.log(students, removedItems2) // [ 'l', 'h', 'w', 'xm', 'xh', 'xx' ] [ 'j' ]



/**
 * slice()
 * 截取数组元素， 返回新数组
 * 两个参数， 第一个参数为开始的索引， 第二个为结束的索引
 * 如果不传参数， 则截取第一个元素到最后一个元素， 即复制整个数组
 */

var arr = [1,2,3,4,45,5,66]
var a1 = arr.slice()
//console.log(arr, a1)


/**
 *  Array.from( arrayLike, mapfn, thisArg ) 从一个伪数组或可迭代的对象中创建一个新的数组实例
 *  后两个参数可选
 *  第一个参数： 类数组对象或可迭代对象
 *  第二个参数： 回调函数，如果设定了该参数，新数组中的每个元素会执行该回调函数
 *  第三个参数： 执行回调函数时的this 对象
 *  返回值： 一个新的数组实例 
 *  如果设定了后两个参数， 则相当于： Array.from(obj).map(mapFn, thisArg)
 */

/**
 * 在 ES2015 中， Class 语法允许我们为内置类型（比如 Array）和自定义类新建子类（比如叫 SubArray）。
 * 这些子类也会继承父类的静态方法，比如 SubArray.from()，调用该方法后会返回子类 SubArray 的一个实例，而不是 Array 的实例。
 *
 */
// Array from String
let arr_string = Array.from('mynameismhy')
// console.log(arr_string)

// Array from a Set
let s = new Set(['mhy', 'window'])
let s1 = Array.from(s)
// console.log(s, s1)  //Set {'mhy', 'window'}  ['mhy' 'window']


// Array from Map

let m = new Map([[1,2], [2,4],[4,8]])
let m1 = Array.from(m)

// console.log(m, m1) // Map { 1 => 2, 2 => 4, 4 => 8 } [ [ 1, 2 ], [ 2, 4 ], [ 4, 8 ] ]

// Array form Array-like object(arguments)
function f_arg() {
  return Array.from(arguments)
}
f_arg(1,2,3,4)

// Using arraw functions and Array.from
Array.from([1,2,3], x => x + x)
// [2,4,6]
Array.from({length: 5}, (v,i) => i)
// [0, 1, 2, 3, 4]

// 数组合并去重

function combine() {
  let arr = [].concat.apply([], arguments)
  return Array.from(new Set(arr))
}
var m_c = [1,2,2], n = [2,3,3]
// console.log(combine(m_c,n))   // [1, 2, 3]




/**
 * Array.isArray(obj) 用于确定传递的值是否是一个 Array。
 * 参数： obj
 * 返回值： 如果对象是Array, 返回true， 否则返回false
 */
// 下面的函数调用都返回 true
Array.isArray([])
Array.isArray([1])
Array.isArray(new Array())
Array.isArray(Array.prototype)

// 下面的函数调用都返回 false
Array.isArray()
Array.isArray({})
Array.isArray(null)
Array.isArray(undefined)
//...

/**
 * instanceif & isArray
 *  当检测Array实例时, Array.isArray 优于 instanceof,因为Array.isArray能检测iframes
 *
 */
/*
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr);  // true
// Considered harmful, because doesn't work though iframes
arr instanceof Array; // false
*/


/**
 * 根据一组参数来创建新的数组实例，支持任意的参数数量和类型。
 * Arrat.of() 和 Array 构造函数之间的区别在于处理整数参数：
 * Array.of(7) 创建一个具有单个元素7的数组，二 Array(7) 创建一个包含7个undefined元素的数组。
 *
 */
let arr_of1 = Array.of(7) // [7]
let arr_of2 = Array.of(1, 2, 3, 4) // [1,2,3]

let _arr1 = Array(7) // [,,,,,,]
let _arr2 = Array(1,2,3,4) // [1.2.3] 
let obj = {arr_of1, arr_of2, _arr1,_arr2}
// console.table(obj)







