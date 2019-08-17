/**
 * Proxy 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）
 * 语法： let p = new Proxy(target, handler);
 * target:用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
 * handler: 一个对象，其属性是当执行一个操作时定义代理的行为的函数。
 * Proxy.revocable(): 创建一个可以撤销的对象
 */

const validator = {
  get: function(target, prop) {
    return prop in target ? target[prop] : '没有该属性啊'
  },
  set: function(target, prop, value) {
    if (prop === 'age') {
      if(!Number.isInteger(value)) {
        throw new TypeError('age 不是一个integer啊！')
      }
      if (value < 0 ) {
        throw new Error('age不可以为负数啊！')
      }

    }
    target[prop] = value
  }
}


let student = new Proxy({}, validator)

student.age = 111
console.log(student.age)

student.age = '123'
console.log(student.age)

student.age = -111
console.log(student.age)
