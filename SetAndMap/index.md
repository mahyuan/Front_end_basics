# Set 和 Map 数据结构
Set和Map是ES6新增的数据结构。
Set类似于数组，Map类似于对象。
## Set
Set的元素可以是任何类型的数据，但是都是唯一的，没有重复的值。
Set本身是一个构造函数，用来生成Set实例。
生成Set实例用new操作符。
## 生成Set实例
```js
const arr = [1,2,3,3, [1,2,3], {name:'li',age:22}];
let set = new Set(arr)
```

```js
const set = new Set();
[1,2,2,3,4,5,5].forEach(e => set.add(e));
console.log(set); //Set { 1, 2, 3, 4, 5
console.log(set.size); // 5
```
```js
let obj = {};
const set = new Set(obj); //Set {{}}
set.add(obj); // Set {{}}
set.add(obj); // Set {{}}
set.add({}); // Set {{}, {}}
set.add({}); // Set {{}, {}}
```
## Set的属性和方法
### size属性
返回Set实例的元素数量
```js
const arr = ['s','s', 2,3,3];
const set = new Set(arr); // Set {'s', 2, 3}
set.size; // 3
```

### add(value)

add() 方法用于向Set的末尾添加元素，可以添加任何类型的数据(包括Set类型)。如果set中有该元素，则不添加；
添加某个值，返回 Set 结构本身。
例子见上面。
### delete(value)
delete方法用于删除Set实例中的元素，删除的元素为传入的参数。
返回值为布尔值， 如果实例中有该参数值，删除并返回true，否则返回false.
```js
const arr = ['s','s', 2,3,3];
const set = new Set(arr); // Set {'s', 2, 3}
set.delete('s'); // true
set.delete('s'); // false
```
### has(value)
has方法用来检查set实例中是否包含某个值， 如果有则返回true, 否则返回false。
```js
const arr = ['s','s', 2,3,3];
const set = new Set(arr); // Set {'s', 2, 3}
set.has('s'); //true
set.delete('s'); // true
set.has('s'); //false
```
### clear() 
clear方法用于清空Set。没有返回值。
```js
const set = new Set([1,2,3,4,5]);
set.clear();
console.log(set); // Set {}
```
## Set 的遍历方法
Set有四个遍历方法。

### keys()、values()和 enttries()

keys方法、values方法、entries方法返回的都是遍历器对象。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
```js
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```
Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
这意味着，可以省略values方法，直接用for...of循环遍历 Set。
```js
Set.prototype[Symbol.iterator] === Set.prototype.values
// true

let set = new Set(['red', 'green', 'blue']);

//
for (let x of set) {
  console.log(x);
}
// red
// green
// blue
```
### forEach()

Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，**没有返回值**。
forEach方法的参数就是一个处理函数。该函数的参数与数组的forEach一致，依次为键值、键名、集合本身（上例省略了该参数）。这里需要注意，Set 结构的键名就是键值（两者是同一个值），因此第一个参数与第二个参数的值永远都是一样的。

另外，forEach方法还可以有第二个参数，表示绑定处理函数内部的this对象。
```js
let set = new Set([1,2,3,4,5,5,6,6]);
set.forEach(item => console.log(item) )
console.log(set)
```
### 遍历器的应用
#### 数组去重
数组去重的方法：
```js
let arr = [1,2,2,'2','s','s'];
console.log([...new Set(arr)]);
// or
Array.from(new Set(arr));
```
#### 数组的map和filter方法也可以间接用于 Set
```js
//数组的map()
let set = new Set([1,2,3,4,5,5,6,6,7]);
set = new Set([...set].map(item => `${item}<---->${item * 2}`))

//数组的filter
let set = new Set([1, 2, {name: 'li', age: 22}, {name: 'wang', age: 22}, {name: 'li', age: 24}]);
let s = new Set([...set].filter(item =>  item instanceof Object && item.age == 22 ))
```
#### 实现并集（Union）、交集（Intersect）和差集（Difference)
```js
let a = new Set([1,2,3,4]);
let b = new Set([1,3,5,7]);

// 并集 union
let nuion = new Set([...a, ...b]);

// 交集
let intersect = new Set([...a].filter(item => b.has(item)));

// 差集
let difference = new Set([...a].filter(item => !b.has(item)));
```

#### 直接在遍历操作中改变原来的 Set 结构
```js
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6
```

