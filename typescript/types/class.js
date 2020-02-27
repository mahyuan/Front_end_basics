var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *  类
 */
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (distance) {
        if (distance === void 0) { distance = 0; }
        console.log(this.name + " moved " + distance + "m!");
    };
    return Animal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distance) {
        if (distance === void 0) { distance = 5; }
        console.log('Slithering...');
        _super.prototype.move.call(this, distance);
    };
    return Snake;
}(Animal));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distance) {
        if (distance === void 0) { distance = 45; }
        console.log('Galloping...');
        _super.prototype.move.call(this, distance);
    };
    return Horse;
}(Animal));
var sam = new Snake('Sammy the python');
var tom = new Horse('Tommy the Palomino');
sam.move();
tom.move(100);
/* typescript 默认所有成员都是public的，可以不写public关键词
使用了private的成员，只能在类的内部使用，在派生类中不能访问
protected修饰符与private的行为很类似，但有一点不同，protected成员在派生类中任然可以访问 */
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var Empolyee = /** @class */ (function (_super) {
    __extends(Empolyee, _super);
    function Empolyee(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    Empolyee.prototype.getElevatorPitch = function () {
        return "name is " + this.name + " and work in " + this.department;
    };
    return Empolyee;
}(Person));
var howard = new Empolyee('Howard', 'Sales');
console.log(howard.getElevatorPitch());
// console.log(howard.name) //Property 'name' is protected and only accessible within class 'Person' and its subclasses
/**
 * readonly修饰符 设置属性为只读，只读属性必须在声明时或者构造函数里被初始化
 */
var Octops = /** @class */ (function () {
    function Octops(theName) {
        this.numberOfLegs = 8;
        this.name = theName;
    }
    return Octops;
}());
/**
 *  参数属性，参数属性可以定义并初始化一个成员
 */
var Octops1 = /** @class */ (function () {
    function Octops1(name) {
        this.name = name;
        this.numberOfLegs = 4;
    }
    return Octops1;
}());
/**
 * 存取器 getters/setters 截取对对象成员的访问
 */
var passcode = 'secret   passcode';
var Empolyee2 = /** @class */ (function () {
    function Empolyee2() {
    }
    Object.defineProperty(Empolyee2.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (passcode && passcode === 'secret passcode') {
                this._fullName = newName;
            }
            else {
                console.log('Error: Unauthorized update of employee!');
            }
        },
        enumerable: true,
        configurable: true
    });
    return Empolyee2;
}());
var employee2 = new Empolyee2();
employee2.fullName = "Bob Smith";
if (employee2.fullName) {
    console.log(employee2.fullName);
}
/**
 * 静态属性 使用 static 定义静态属性
 */
// 类的静态成员存在于类本身而不是类的实例上，每个实例要访问时，使用 类名. 来访问静态属性
var Grid = /** @class */ (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.calculateDistanceFromOrigin = function (point) {
        var xDist = (point.x - Grid.origin.x);
        var yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    };
    Grid.origin = { x: 0, y: 0 };
    return Grid;
}());
var grid1 = new Grid(1.0); // 1x scale
var grid2 = new Grid(5.0); // 5x scale
console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
/**
 * 抽象类
 * abstract class
 * 抽象类作为其他 派生类的基类使用，它们一般不会直接实例化。不同于接口，抽象类可以包含成员的实现细节
 * abstract 关键词是用于定义抽象类和抽象类内部定义抽象方法
 * 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现 ，抽象方法的语法和接口方法相似，两者都是定义方法签名单不包含方法体。
 * 抽象方法必须包含 abstract 关键词并且包含访问修饰符
 */
var Bird = /** @class */ (function () {
    function Bird() {
    }
    Bird.prototype.fly = function () {
        console.log('bird fly...');
    };
    return Bird;
}());
var Club = /** @class */ (function () {
    function Club(name) {
        this.name = name;
    }
    Club.prototype.printName = function () {
        console.log('Club name :', this.name);
    };
    return Club;
}());
var AccountingClub = /** @class */ (function (_super) {
    __extends(AccountingClub, _super);
    function AccountingClub() {
        return _super.call(this, 'Accounting and auditing') || this; // 派生类的构造函数中必须调用 super
    }
    AccountingClub.prototype.printMetting = function () {
        console.log('1');
    };
    AccountingClub.prototype.generateReports = function () {
        console.log('Generating accounting reports...');
    };
    return AccountingClub;
}(Club));
var club;
// club = new Club() // 不能创建抽象类的实例
club = new AccountingClub();
club.printName();
club.printMetting();
// club.generateReports() // 方法在声明的抽象类中不存在
