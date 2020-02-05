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

let notSure : any = 4

