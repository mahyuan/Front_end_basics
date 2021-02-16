// 手写instancOf 方法, 并判断A的原型链上是否有B的原型对象

const instanceOf = (A, B) => {
  let p = A
  while (p) {
    if(p === B.prototype) {
      return true
    }
    p = p.__proto__
  }
  return false
}
let obj = {}
let i1 = instanceOf(obj, Object)
let i2 = instanceOf(1, Number)
let i3 = instanceOf([], Array)
let i4 = instanceOf([], Object)
let i5 = instanceOf({}, Array)
