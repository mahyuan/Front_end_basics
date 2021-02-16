// 如果在A对象上没有找到X属性，那么会沿着原型链找X属性

var foo = {
  a: 'aaa'
}
var F = function() {}

Object.prototype.a = 'value a'
Object.prototype.aa = 'value aa'
Object.prototype.b = 'obj b'
Function.prototype.b = 'value b'

var v1 = foo.a
var v2 = F.a
var v3 = F.b
