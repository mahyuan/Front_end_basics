var isShow = false;
var decLiteral = 6;
var hexLiteral = 0xf00d;
var binaryLiteral = 10;
var octalLiteral = 484;
var firstName = "bill";
var fullName = "Li chengzhen";
var age = 23;
var sentence = "hello, my friend" + fullName;
// 定义数数组
var list1 = [1, 2, 3];
var list2 = [4, 5, 6];
// 元祖 tuple
// 允许定义一个已知元素数量和类型的数组， 各个元素的类型不必相同
var tuple1;
tuple1 = ['hello', 23];
console.log(tuple1);
// tuple1 = ['hello', 'world'];
// console.log(tuple1);
console.log(tuple1[0].substr(1));
console.log(tuple1[1].toFixed(3));
// 当访问一个越界的元素，会使用联合类型替代：
tuple1[2] = 'world'; // 'world' 的类型属于 [string, number];
tuple1[3] = true; // true 的类型不属于 [string, number];
console.log(tuple1);
// 枚举 enum
// enum Color { Red, Green, Nlue }
// let c: Color = Color.Green;
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
var colorName = Color[2];
console.log('c', c);
console.log('colorName', colorName);
/**
 * Any
 * 不希望进行变量的类型检查，直接通过编译
 */
var anyType;
anyType = 2;
console.log(anyType);
anyType = 'hello';
console.log(anyType);
