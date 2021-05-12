// 数组去重

var arr = [1, 1, 2, 2, 3]
var arr2 = [2, 3, 4]
const noRepeatArr = Array.from(new Set(arr)) // [...new Set(arr)]
console.log(noRepeatArr)

// 判断元素是否在集合中
const set = new Set(arr)
const has = set.has(3)

// 求交集
const set2 = new Set(arr2)
const set3 = new Set([...set].filter(item => set2.has(item)))

// set 对象常用操作
let myset = new Set()
myset.add(1)
myset.add(2)
myset.add(3)
myset.add('232')
myset.add({a: 'a'})

myset.has(3)
myset.delete(3)
myset.has(3)

var size = myset.size

// myset.clear()

// 多种迭代方法
for(let i of myset) {
  console.log(i)
}
for(let j of myset.keys) {
  console.log(j)
}
for(let k of myset.values()) {
  console.log(k)
}

size = myset.size

// set和array互相转换
const myarr = [...myset]
const myarr1 = Array.from(myset)

const myset2 = new Set([1, 2, 3, 4, 4])

// 交集
const intersection = new Set([...myset].filter(x => myset2.has(x)))

// 差集
const diff = new Set([...myset].filter(y => !myset2.has(x)))

