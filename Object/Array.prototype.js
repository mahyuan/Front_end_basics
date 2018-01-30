/**
 * 数组实例
 * 所有数组实例都会从Array.prototype 继承属性和方法。
 * 修改Array 的原型会影响到所有的数组实例
 */
// prototy 属性
Array.prototype.constructor === Array // true

Array.prototype.length
/**
 * length 属性的值是一个0 到2^32 -1的整数
 * 可以设置length属性来截断或拓展任何数组
 */

// 方法
// 修改器方法
// 下面的这些方法会改变调用它们的对象自身的值：

Array.prototype.copyWithin()
Array.prototype.fill()

Array.prototype.pop()
Array.prototype.push() 

Array.prototype.reverse() // 颠倒数组元素的排列顺序

Array.prototype.shift() // 删除第一个元素
Array.prototype.unshift() // 传多个参数时， 在数组开头添加多个原色，并返回数组的新长度

Array.prototype.sort()  // 默认排序顺序是根据字符串Unicode码点, 可以传个参数，回调函数

Array.prototype.splice()



// 访问方法
// 下面的这些方法绝对不会改变调用它们的对象的值，只会返回一个新的数组或者返回一个其它的期望值。
Array.prototype.concat()
Array.prototype.includes()
Array.prototype.join()
Array.prototype.slice()
Array.prototype.toString()
Array.prototype.toLocaleString()
Array.prototype.indexOf()
Array.prototype.lastIndexOf()

// 迭代方法
/**
 * 在下面的众多遍历方法中，有很多方法都需要指定一个回调函数作为参数。
 * 在每一个数组元素都分别执行完回调函数之前，数组的length属性会被缓存在某个地方，
 * 所以，如果你在回调函数中为当前数组添加了新的元素，那么那些新添加的元素是不会被遍历到的。
 * 此外，如果在回调函数中对当前数组进行了其它修改，比如改变某个元素的值或者删掉某个元素，那么随后的遍历操作可能会受到未预期的影响。
 * 总之，不要尝试在遍历过程中对原数组进行任何修改，虽然规范对这样的操作进行了详细的定义，但为了可读性和可维护性，请不要这样做。
 */


Array.prototype.forEach()
// 为数组中的每个元素执行一次回调函数。
Array.prototype.entries() 
// 返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对。
Array.prototype.every()
// 如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。
Array.prototype.some()
// 如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。
Array.prototype.filter()
// 将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。
Array.prototype.find() 
// 找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。
Array.prototype.findIndex() 
// 找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 -1。
Array.prototype.keys() 
// 返回一个数组迭代器对象，该迭代器会包含所有数组元素的键。
Array.prototype.map()
// 返回一个由回调函数的返回值组成的新数组。
Array.prototype.reduce()
// 从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。
Array.prototype.reduceRight()
// 从右到左为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。
Array.prototype.values() 
// 返回一个数组迭代器对象，该迭代器会包含所有数组元素的值。
Array.prototype[@@iterator]() 
//和上面的 values() 方法是同一个函数。















