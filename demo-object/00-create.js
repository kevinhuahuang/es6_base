/*
* 语法：Object.create(proto, [propertiesObject])
* proto 新创建对象的原型对象。
* propertiesObject 可选。如果没有指定为 undefined，
* 则是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。
* 这些属性对应Object.defineProperties()的第二个参数。
* 返回值:一个新对象，带着指定的原型对象和属性。
* 如果propertiesObject参数不是 null 或一个对象，则抛出一个 TypeError 异常。
*
* Object.create(null) 创建的对象是一个空对象，在该对象上没有继承 Object.prototype 原型链上的属性或者方法,
* 例如：toString(), hasOwnProperty()等方法
* 使用Object.create()是将对象继承到__proto__属性上
* Object.create =  function (o) {
*   var F = function () {};
*   F.prototype = o;
*   return new F();
*};
* 原型关系链为newObj.__proto__== F.prototype == o
* 相当于实现了原型继承方式（注意不是原型链继承）,本质上来说是对一个对象进行了浅拷贝
*/
// --------------------------------------------------------------
function Vehicle () {
  this.isMove = 'movable'
}
Vehicle.prototype = {
  engine: 'oil'
}

let vehicle = new Vehicle()

let car = Object.create(Vehicle.prototype, { wheels: { // 设置参数值对应的是一个对象 wheels: 4这是错误的
  configurable: false,
  writable: true,
  value: 4 } })
console.log(vehicle.isMove) // moveable
console.log(car.isMove) // undefined
console.log(vehicle.engine) // oil
console.log(car.engine) // oil
console.log(vehicle.wheels) // undefined
console.log(car.wheels) // 4
// --------------------------------------------------------------
// 实现类式继承
// Shape - 父类(superclass)
console.log('-------------实例类式继承------------')
function Shape () {
  this.x = 0
  this.y = 0
}

// 父类的方法
Shape.prototype.move = function (x, y) {
  this.x += x
  this.y += y
  console.info('Shape moved.')
}

// Rectangle - 子类(subclass)
function Rectangle () {
  Shape.call(this) // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype) // 设置原型链
console.log(Rectangle.prototype.constructor) // Function: shape
Rectangle.prototype.constructor = Rectangle // 重新指定构造函数
console.log(Rectangle.prototype.constructor) // Function: Rectangle

var rect = new Rectangle()

console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle) // true
console.log('Is rect an instance of Shape?', rect instanceof Shape) // true
rect.move(1, 1) // Outputs, 'Shape moved.'

// 使用混入的方式继承多个对象
function SuperClass () {
}

function OtherSuperClass () {
}

function MyClass () {
  SuperClass.call(this)
  OtherSuperClass.call(this)
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype)
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype)
// 重新指定constructor
MyClass.prototype.constructor = MyClass

MyClass.prototype.myMethod = function () {
  // do a thing
}

// --------------------------------------------------------------
//
