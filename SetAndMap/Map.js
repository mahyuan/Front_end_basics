// set 可以采用链式写法
let map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

let m = new Map([
    ['name', 'lili'],
    ['age', 22],
    ['sex', 'male']
]);
let sk = new Set();
let sv = new Set();
/* for(let k of m.keys()) {
    sk.add(k);
}
for(let v of m.values()) {
    sv.add(v);
}
 */
for(let [k, v] of m.entries()) {
    sk.add(k);
    sv.add(v);
}
console.log('m', m);
console.log('sk', sk);
console.log('sv', sv);


// 获取Map的key 和 values时存储为Set结构最后不好拼接，转化为数组便于组合。
// 可以直接存为数组， 或者在这里使用数组的展开符[...arr]把Set转化为数组

let a = [], b = [];
for(let [key, val] of m.entries()) {
    a.push(key);
    b.push(val);
}
console.log(a);
console.log(b);
// 组合, 遍历数组
let ma = new Map();
for(let i=0; i<a.length; i++) {
    ma.set(a[i], b[i])
}
console.log('ma', ma);
console.log(ma==m); // false

// Array -> Map
let map = new Map([
    ['name', 'li'],
    ['age', 23]
])

// Map -> Array
let arr1 = [...map];
let arr2 = [...map.keys()];
let arr3 = [...map.values()];

function getMapKey(map) {
    let arr = [];
    for(let key of map.keys()) {
        arr1.push(key);
    }
    return arr;
}

function getMapValue(map) {
    let arr = [];
    for(let value of map.values()) {
        arr.push(value);
    }
    return arr;
}

function getMap(map) {
    let arr = [];
    for(let [k, v] of map.entries()) {
        arr.push([k, v])
    }
    return arr;
}

// Object -> Map
// 键名为字符串的对象
function strObjToMap(obj) {
    let map = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return map;
}
// Map -> Object
function strMapToObj(map) {
    let obj = Object.create(null);
    // 该方法创建的对象没有原型， 参数为null
    for(let [k,v] of map.entries()) {
        obj[k] = v;
    }
}

// JSON -> Map
function jsonToMap(str) {
    return strObjToMap(JSON.parse(str));
}

// Map -> JSON
//键名为字符串
function strMapToJSON(strMap) {
    return JSON.stringify(strMapToObj(strMap))
}
// 键名为非字符串
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}
