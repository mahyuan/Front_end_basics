/**
 * forEach()
 * 对每个元素执行一次提供的函数
 * callback有三个参数：
 */
let arr = ['a', 'b', 'c']
arr.forEach(function(item, index, arr){
  console.log(item,index, arr)
}, arr) 
/*
//语法
array.forEach(callback(currentValue, index, array){
    //do something
}, this)

array.forEach(callback[, thisArg])

*/

/**
 * map() 
 * 创建一个新数组，其结果是该数组的每个元素都调用回调函数返回的结果
 * 参数和forEach一样，回调函数有三个参数，map()方法的第二个参数指定callback执行时的this值
 */
// ES6
//let numbers = [1, 5, 10, 15];
// let doubles = numbers.map( x => x ** 2);

// doubles is now [1, 25, 100, 225]
// numbers is still [1, 5, 10, 15]


// const numbers = [2, 4, 8, 10];
// let halves = numbers.map(x => x / 2);

let numbers = [1, 4, 9];
let roots = numbers.map(Math.sqrt);
// roots is now [1, 2, 3]
// numbers is still [1, 4, 9]


var elems = document.querySelectorAll('select option:checked');
var values = Array.prototype.map.call(elems, function(obj) {
  return obj.value;
});


/**
 * filter() 方法创建一个新数组，其包含通过回调函数测试的所有元素
 * 语法： var new_array = arr.filter(callback[, thisArg])
 */


/**
 * reduce() 方法对累加器和数组中的每个元素应用一个函数，将其减少为单个值
 *
 *
 */

var total = [0, 1, 2, 3].reduce(function(sum, value){
  return sum + value;
}, 0);
// 6

var flat = [[0,1], [2,3], [4,5]].reduce(function(a,b){
  return a.concat(b)
})
// [0,1,2,3,4,5,6]


let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
let result = arr.sort().reduce((init, current)=>{
    if(init.length===0 || init[init.length-1]!==current){
        init.push(current);
    }
    return init;
}, []);
console.log(result); //[1,2,3,4,5]















