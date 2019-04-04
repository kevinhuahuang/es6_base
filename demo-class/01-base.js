class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  toString () {
    return `( ${this.x}, ${this.y} )`
  }

  toValue () {
    return this.x + this.y
  }
}
let point = new Point(1, 2)
console.log('toString: ' + point.toString()) // "(1,2)"
console.log('toValue: ' + point.toValue()) // 3
console.log(point.hasOwnProperty('x')) // true
console.log(point.hasOwnProperty('y')) // true
console.log(point.hasOwnProperty('toString')) // false
console.log(point.__proto__.hasOwnProperty('toString')) // true

console.log('-------------------class表达式----------------------------------------')
const MyClass = class Me { // 这个类的名字MyClass而不是Me,Me只在Class的内部代码可用，这代当前类；
  getClassName () {
    return Me.name
  }
}
let inst = new MyClass()
console.log(inst.getClassName()) // "Me"
// console.log(Me.name) //ReferenceError :Me is not defined

console.log('-------------------采用Class表达式，可以写出立即执行Class----------------------------------------')
let person = new class {
  constructor (name) {
    this.name = name
  }

  sayName () {
    console.log(this.name)
  }
}('张三')

person.sayName() // 张三
