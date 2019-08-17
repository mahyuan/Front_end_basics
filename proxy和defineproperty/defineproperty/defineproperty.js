/**
 * Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
 * Object.defineProperty(obj, prop, descriptor)
 * obj: 要在其上定义属性的对象。
 * prop: 要定义或修改的属性的名称。
 * descriptor: 将被定义或修改的属性描述符。 (configurable, enumerable, value, get, set, 其中get和set是可选值，默认为undefied)
 *
 * 获取该定义属性： Object.getOwnPropertyDescriptor(obj, prop)
 * 如果一个描述符不具有value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常。
 * 即：（ value 或 writable） 与 （get 或 set ）不能同时出现
 */

const obj ={}
Object.defineProperty(obj, 'age', {
  configurable: true,
  enumerable: true,
  // value: '12',
  // writable: true,
  get: function(obj, prop) {
    return prop in obj ? ob[prop] :'sdsd'
  },
  set: function(obj, prop, value) {
    obj[prop] = value
  }
})



// 数据描述符和存取描述符不能混合使用
Object.defineProperty(o, "conflict", {
  value: 0x9f91102,
  get: function() {
    return 0xdeadbeef;
  }
});


/**
 * 如果属性已经存在，Object.defineProperty()将尝试根据描述符中的值以及对象当前的配置来修改这个属性。
 * 如果旧描述符将其configurable 属性设置为false，则该属性被认为是“不可配置的”，并且没有属性可以被改变
 * 除了单向改变 writable 为 false）。当属性不可配置时，不能在数据和访问器属性类型之间切换。
 */
