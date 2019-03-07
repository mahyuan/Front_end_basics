let isShow: boolean = false;

let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;


let firstName: string = "bill";
let fullName: string = `Li chengzhen`;
let age: number = 23;
let sentence: string = `hello, my friend${fullName}`;

// 定义数数组
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [4, 5, 6];

// 元祖 tuple
// 允许定义一个已知元素数量和类型的数组， 各个元素的类型不必相同
let tuple1: [string, number];
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

enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
let colorName: string = Color[2];
console.log('c', c);
console.log('colorName', colorName);


/**
 * Any
 * 不希望进行变量的类型检查，直接通过编译
 */
let anyType: any;
anyType = 2;
console.log(anyType);
anyType = 'hello';
console.log(anyType);









