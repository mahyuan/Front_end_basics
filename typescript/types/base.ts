let firstName: string = 'Bob'
let age: number = 25
let isMale: boolean = false

let citys: string[] = ['beijing', 'shanghai', 'xi an', 'tian jin']

let doings: Array<string> = ['eat breatfirst', 'running', 'sleeping']

// 元组 Tuple
let others:[string, string, number, boolean] = ['hello', 'world', 2020, true]

let other1 = others[0].substring(1)
console.log(other1)

// 枚举 enum
enum Color {Red = 1, Green, Blue}
let color:Color = Color.Blue
console.log('Color.blue', color)

let colorName: string = Color[2]

// any
let notSure: any = 4
notSure.ifItExists()
notSure.toFixed()

// void
function fn1(): void {
  console.log('volid')
}

// null 和 undefined
let u: undefined = undefined
let n: null = null

// never
// never表示的是那些根本不存在的值的类型，例如，never类型是那些总是会抛出异常或根本Juin不会有返回值的函数表达式或箭头函数表达式的返回值类型；变量也可能是never类型，当它们被永不为真的类型保护所约束时
// never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}

// Object
declare function create(o: object | null): void;
create({prop: 0}) // ok
create(null) // ok

// 类型断言
// 断言有两种语法： 1 尖括号；2 as
let someValue1: any = ''
let strLength1: number = (<string>someValue1).length

let someValue2: any = ''
let strLength2: number = (someValue2 as string).length

// 接口
interface SquareConfig {
  color?: string,
  width?: number
}
function createSquire(config: SquareConfig): {color: string, area: number} {
  let newSquare = {color: 'red', area: 100}
  if(config.color) {
    newSquare.color = config.color
  }
  if(config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}
let SquireItem = createSquire({color: 'green', width: 12})
// 接口只读属性
interface Point {
  readonly x: number
}

