function Person () {
  Person.prototype.functionInside = 'inside' // 在function内部定义 构造函数的prototype属性
}
Person.prototype.functionOutside = 'outside' // 在function外部定义 构造函数的prototype属性

console.log('实例对象通过构造函数的new操作创建的')
let kevin = new Person()
let People = Person // People是指向Person的指针，作用同Person
let vivian = new People()
console.log(kevin.functionInside)
console.log(kevin.functionInside)
console.log(vivian.functionOutside)
console.log(vivian.functionOutside)
