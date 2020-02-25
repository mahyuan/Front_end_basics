var firstName = 'Bob';
var age = 25;
var isMale = false;
var citys = ['beijing', 'shanghai', 'xi an', 'tian jin'];
var doings = ['eat breatfirst', 'running', 'sleeping'];
// 元组 Tuple
var others = ['hello', 'world', 2020, true];
var other1 = others[0].substring(1);
console.log(other1);
// 枚举 enum
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var color = Color.Blue;
console.log('Color.blue', color);
var colorName = Color[2];
// any
var notSure = 4;
notSure.ifItExists();
notSure.toFixed();
// void
function fn1() {
    console.log('volid');
}
// null 和 undefined
var u = undefined;
var n = null;
// never
// never表示的是那些根本不存在的值的类型，例如，never类型是那些总是会抛出异常或根本Juin不会有返回值的函数表达式或箭头函数表达式的返回值类型；变量也可能是never类型，当它们被永不为真的类型保护所约束时
// never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
// 返回never的函数必须存在无法达到的终点
function error(message) {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop() {
    while (true) {
    }
}
create({ prop: 0 }); // ok
create(null); // ok
// 类型断言
// 断言有两种语法： 1 尖括号；2 as
var someValue1 = '';
var strLength1 = someValue1.length;
var someValue2 = '';
var strLength2 = someValue2.length;
function createSquire(config) {
    var newSquare = { color: 'red', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var SquireItem = createSquire({ color: 'green', width: 12 });
