const s = new Set();
const s1 = new Set();
s1.add('s1');
[1,2,3,4,5].forEach(ele => {
    s.add(ele)
});
s.add(s1);
console.log(s, s.size);


const set = new Set([1, 2, 3, 4, 4]);
[...set]; // [1,2,3,4]

// 数组去重
let arr=[1,1,3,3,'s','d'];

let arr1 = [...new Set(arr)]
console.log(arr1)


const s2 = new Set(arr);
set.add()

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

const arr = ['s','s', 2,3,3];
const set = new Set(arr); // Set {'s', 2, 3}
set.has('s'); //true
set.delete('s'); // true
set.has('s'); //false

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

let set = new Set([1,2,3,4,5,5,6,6]);
set.forEach(item => item *2 )
console.log(set)

