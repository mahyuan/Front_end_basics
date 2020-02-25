/**
 *  类
 */
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName
  }
  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m!`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distance: number = 5) {
    console.log('Slithering...')
    super.move(distance)
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distance: number = 45) {
    console.log('Galloping...')
    super.move(distance)
  }
}

let sam = new Snake('Sammy the python')
let tom: Animal = new Horse('Tommy the Palomino')

sam.move()
tom.move(100)

/* typescript 默认所有成员都是public的，可以不写public关键词
使用了private的成员，只能在类的内部使用，在派生类中不能访问
protected修饰符与private的行为很类似，但有一点不同，protected成员在派生类中任然可以访问 */
class Person {
  protected name: string
  constructor(name: string) {
    this.name = name
  }
}

class Empolyee extends Person {
  private department: string
  constructor(name: string, department: string) {
    super(name)
    this.department = department
  }

  public getElevatorPitch() {
    return `name is ${this.name} and work in ${this.department}`
  }
}

let howard = new Empolyee('Howard', 'Sales')
console.log(howard.getElevatorPitch())
// console.log(howard.name) //Property 'name' is protected and only accessible within class 'Person' and its subclasses

/**
 * readonly修饰符 设置属性为只读，只读属性必须在声明时或者构造函数里被初始化
 */
class Octops {
  readonly name: string
  readonly numberOfLegs: number = 8
  constructor(theName: string) {
    this.name = theName
  }
}

/**
 *  参数属性，参数属性可以定义并初始化一个成员
 */
class Octops1 {
  readonly numberOfLegs: number = 4
  constructor(readonly name: string) {

  }
}

/**
 * 存取器 getters/setters 截取对对象成员的访问
 */
let passcode = 'secret   passcode'
class Empolyee2 {
  private _fullName: string

  get fullName(): string {
    return this._fullName
  }

  set fullName(newName: string) {
    if(passcode && passcode === 'secret passcode') {
      this._fullName =  newName
    } else {
      console.log('Error: Unauthorized update of employee!')
    }
  }
}

let employee2 = new Empolyee2()
employee2.fullName = "Bob Smith"
if (employee2.fullName) {
  console.log(employee2.fullName)
}

/**
 * 静态属性 使用 static 定义静态属性
 */
// 类的静态成员存在于类本身而不是类的实例上，每个实例要访问时，使用 类名. 来访问静态属性
class Grid {
  static origin = {x: 0, y: 0};
  calculateDistanceFromOrigin(point: {x: number; y: number;}) {
      let xDist = (point.x - Grid.origin.x);
      let yDist = (point.y - Grid.origin.y);
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));


/**
 * 抽象类
 * abstract class
 * 抽象类作为其他 派生类的基类使用，它们一般不会直接实例化。不同于接口，抽象类可以包含成员的实现细节
 * abstract 关键词是用于定义抽象类和抽象类内部定义抽象方法
 * 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现 ，抽象方法的语法和接口方法相似，两者都是定义方法签名单不包含方法体。
 * 抽象方法必须包含 abstract 关键词并且包含访问修饰符
 */
abstract class Bird {
  abstract makeSound(): void
  fly(): void {
    console.log('bird fly...')
  }
}

abstract class Club{
  constructor(public name: string) {

  }
  printName(): void {
    console.log('Club name :', this.name)
  }

  abstract printMetting(): void // 必须在派生类中实现
}

class AccountingClub extends Club {
  constructor() {
    super('Accounting and auditing') // 派生类的构造函数中必须调用 super
  }
  printMetting(): void {
    console.log('1')
  }
  generateReports(): void {
    console.log('Generating accounting reports...');
  }
}

let club: Club
// club = new Club() // 不能创建抽象类的实例
club = new AccountingClub()
club.printName()
club.printMetting()
// club.generateReports() // 方法在声明的抽象类中不存在
