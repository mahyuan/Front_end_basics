const s = new Set()
const s1 = new Set()
s1.add('s1');
[1, 2, 3, 4, 5].forEach(ele => {
  s.add(ele)
})
s.add(s1)
console.log(s, s.size)

const set = new Set([1, 2, 3, 4, 4]);
[...set] // [1,2,3,4]

// 数组去重
let arr = [1, 1, 3, 3, 's', 'd']

let arr1 = [...new Set(arr)]
console.log(arr1)

const s2 = new Set(arr)
set.add()

let sets = new Set(['red', 'green', 'blue'])

for (let item of sets.keys()) {
  console.log(item)
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item)
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item)
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

const arrr = ['s', 's', 2, 3, 3]
const set12 = new Set(arrr) // Set {'s', 2, 3}
set12.has('s') // true
set12.delete('s') // true
set12.has('s') // false

Set.prototype[Symbol.iterator] === Set.prototype.values
// true

let set231 = new Set(['red', 'green', 'blue'])

//
for (let x of set231) {
  console.log(x)
}
// red
// green
// blue

let set1221 = new Set([1, 2, 3, 4, 5, 5, 6, 6])
set1221.forEach(item => item * 2)
console.log(set)

