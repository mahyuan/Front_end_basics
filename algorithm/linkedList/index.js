// 数组转链表
function arrayToList(arr) {
  if(!arr.length) {
    return null
  }

  var head = { val: arr[0], next: null}
  var prev = head
  var curr = null
  for(let i = 0; i < arr.length; i++) {
    cure = { val: arr[i], next: null }
    prev.next = curr
    prev = curr
  }
  return head
}

// 链表转数组
function singleListToArray(head) {
  const arr = []
  let p = head
  while (p && p.next) {
    let val = p.val
    arr.push(val)
    p = p.next
  }
  return arr
}

const a = { value: 'a'}
const b = { value: 'b'}
const c = { value: 'c'}
const d = { value: 'd'}
a.next = b
b.next = c
c.next = d

let list = arrayToList([1,2,3,4,5])
console.log(list)
// 遍历
let p = a
while(p) {
  console.log(p.value)
  p = p.next
}

// 插入
const e = { value: 'e'}
c.next = e
e.next = d

// 删除
c.next = d

debugger
