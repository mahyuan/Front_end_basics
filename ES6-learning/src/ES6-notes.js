
let name = 'mhy', 
	age = 12,
	sex = 'man';

let [ name,age, sex] = ['zhansna', 22, 'mmm']

// let {name, age, sex} = {name: "zhangs", age: 33, sex:'man'}

let {name, age, frends} = {name: "zhangs", age: 33, frends: ['dd',age:2]}


// 集合
// 自动去重
let set = new Set()
set.size

set.add(1)
set.add('ddd')
set.delate(1)
set.forEach()


const map = new Map([
	['name',  'mhy'],
	['age',  22],
	['sex', 'male']
])

// 方法
map.set('frends', ['dmhy','222']);
map.get('frends');
map.delate('name');
map.has('name');
map.clear();

map.keys();
map.values();
map.entries();


//遍历
map.forEach(function(valuem, index){
	console.log(value)
	console.log(index)
})

//注意事项
map.set({}, 'dsags');
map.set({}, 'dsgsgsg');


// 定义
let str1 = Symbol();
let str2 = Symbol();
console.log(typeof str1)


//描述
let str3 = Symbol('name');
let str4 = Symbol('name');

//对象的属性名
const obj = {};
obj.name = 'mhy';
console.log(obj);


const obj = {};
obj[Symbol('name')]= 'dd';
obj[Symbol('name')]= 'aaaa';

// Class  
class Person {
	constructor(name, age){
		this.name = name;
		this.age = age;
	}

	sayname (){
		console.log(this.name)
	}
}


//数组拓展
let nodeList = document.querySelectorAll('li');
console.log(Array.isArray(Array.from(nodeList))) // true
console.log(Array.isArray(nodeList)) //false

Array.of(1,2,3,4,'dsg') // [1,2,3,4,'dsg'],  转为数组

//对象的拓展
let obj = {
	name: 'mhy',
	age:33
}

// 如果 key 和 value 一样，写一个就可以了
let name = 'dss';
let age = 22;
let obj1 = {
	name,
	age
}

// Object.assign()
// 对象合并

let obj1 = {name: 'ds'}
let obj2 = {age: 12}
let obj3 = {city: 'beijing'}
let obj = Object.assign({}, obj1, obj2, obj3)
console.log(obj) // {name:'ds', age:12, city: 'beijing'}


// 延展操作符 {...obj}  转为数组
let str = '好天气就该写代码';
let strArr = [...str]
// ["好","天","气","就","该","写","代","码"]

let student = {
	name: 'mhy',
	age: 22,
	city: 'beijing'
}
<Person {...student}/>
//传数据很方便


// 形参设置默认值
//ES5 做法
function sum(num1, num2){
	num1 = num1 || 10;
	num2 = num2 || 20;
	console.log(num1 + num2 )
}
sum() //30 , 不设置默认值为NaN

//ES6 语法
function sum2(num1 = 10, num2 = 30){
	console.log(num1 + num2)
}
sum() // 40
sum(20,200) //220

//参数形式,延展操作符
//es5
function sum3(){
	let result = 0;
	for(let value of arguments){
		result += value
	}
	return result;
}

//es6语法，可以传不同类型的参数，而arguments有限制
function sum4(...nums){
	let result = 0;
	for(let value of nums){
		result += value
	}
	return result;
}

// 箭头函数, this不用 bind, apply, call 来绑定, 内部自动绑定this
//() => {}
let sum = (num1, num2) => {
	return num1 + num2;
}

let nameArr = ['mhy', 'mmm','dsdg','zll'];
nameArr.forEach((value, index) => {
	console.log(index + ':' + value)
})

function demo(){
	setTimeout(function(){
		console.log('ES5:'+ this)
	},1000)
}
let obj1 = {};
demo.call(obj1) // ES5: window  


function demo(){
	setTimeout(() => {
		console.log('ES6:' + this)
	}, 1000)
}
let obj2 = {};
obj2.demo()
//ES6: obj2