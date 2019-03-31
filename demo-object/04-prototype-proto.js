/*
* 一张图理解prototype、proto和constructor的三角关系
* https://www.cnblogs.com/xiaohuochai/p/5721552.html
* */


// 构造函数有一个prototype属性，指向实例对象的原型对象。
// 实例对象有一个__proto__属性，指向实例对象的原型对象。
// 修改原型对象，所实例对应值也被修改
// 经常使用原型对象来实现继承
// 原型对象及prototype
function Person () {
  Person.prototype.insideFunction = 'inside'
}
let kevin = new Person()
let vivian = new Person()
console.log(kevin.insideFunction)
console.log(kevin.insideFunction)
console.log('修改构造函数的prototype(原型对象)属性值，所实例对应值也被修改')
Person.prototype.kind = 'human'
console.log(Person.prototype.kind)// 1
console.log(kevin.kind)
console.log(vivian.kind)
console.log('修改某个实例对象的__proto__(原型对象)的属性值，所实例对应值也被修改')
kevin.__proto__.nationality = 'china'
console.log(Person.prototype.nationality)// 1
console.log(kevin.nationality)
console.log(vivian.nationality)
console.log('构造函数的prototype属性(原型对象) === 实例对象的__proto__(原型对象)')
console.log(Person.prototype === kevin.__proto__)
console.log('同一个构造函数实例化的对象具有相同的原型对象')
console.log(kevin.__proto__ === vivian.__proto__)
console.log('原型对象的constructor属性指向该原型对象的构造函数')
console.log(Person.prototype.constructor === Person)

// 访问实例对象的原型对象，不建议这样实例对象.__proto__, 建议这样 实例对象.getOwnProperty()
// getPrototypeOf() 调用的是Object.prototype.__proto__
console.log('访问实例对象的原型对象，不建议: kevin.__proto__, 建议: Object.getPrototypeOf(kevin)')
console.log(kevin.__proto__ === Object.getPrototypeOf(vivian))

// 实例对象本身没有constructor属性，它继承原型对象的constructor
console.log('实例的constructor指向构造函数')
console.log(kevin.constructor === Person)
console.log('实例的constructor继承原型对象的constructor')
console.log(kevin.hasOwnProperty('constructor'))

// 原型对象也是实例对象，实际上，任何对象都可以看做是通过Object构造函数的new操作实例化的对象
// 于是，Person.prototype作为实例对象，它的构造函数是Object(), 原型对象是Object.prototype。
// 相应的，构造函数Object()的prototype属性指向原型对象Object.prototype,
// 实例对象Person.prototype的proto属性同样的指向原型对象Object.prototype
console.log('构造函数的原型对象的原型对象指向Object的原型对象')
console.log(Person.prototype.__proto__ === Object.prototype)
// Person.prototype本身具有constructor属性，所以它会覆盖继承自原型对象Object.prototype的constructor属性
console.log('构造函数的constructor与Object的constructor')
console.log(Person.prototype.constructor === Person) // true
console.log(Object.prototype.constructor === Object) // true
console.log(Person.prototype.hasOwnProperty('constructor'))// true
console.log(Person.prototype.constructor === Object.prototype.constructor) // false

// 如果Object.prototype作为实例对象的话，其原型对象是null。这可能是typeof null的结果是'object'的原因之一吧
console.log('Object.prototype的原型对象是null')
console.log(Object.prototype.__proto__ === null)

// 函数也是对象，不过是具有秀殊功能的对象，任何函数都可以看做是通过Function()的构造函数new实例化的结果
// 把函数Person当成实例对象，其构造函数是Function(), 原型对象是Function.prototype
// 相似的，函数Object的构造函数也是Function(), 其原型对象是Function.prototype
console.log('Function.prototype === Person.__proto__ === Ojbect.__proto__')
console.log(Person.__proto__ === Function.prototype) // true
console.log(Object.__proto__ === Function.prototype) // true

// 原型对象Function.prototype的constructor属性指向构造函数Function()；
// 实例对象Object和Foo本身没有constructor属性，需要继承原型对象Function.prototype的constructor属性
console.log('Object和Foo的constructor属性继承自继承原型对象Function.prototype的constructor')
console.log(Function.prototype.constructor === Function) // true
console.log(Person.constructor === Function) // true
console.log(Person.hasOwnProperty('constructor')) // false
console.log(Object.constructor === Function) // true
console.log(Object.hasOwnProperty('constructor')) // false

// 所有的函数都可以看成是构造函数Function()的new操作的实例化对象。那么，Function可以看成是调用其自身的new操作的实例化的结果
// 所以，如果Function作为实例对象，其构造函数是Function，其原型对象是Function.prototype
console.log('Function.__proto__ === Function.prototype')
console.log(Function.__proto__ === Function.prototype) // true
console.log(Function.prototype.constructor === Function) // true
console.log(Function.prototype === Function.prototype) // true

// 如果Function.prototype作为实例对象的话，其原型对象是什么呢？
// 和前面一样，所有的对象都可以看成是Object()构造函数的new操作的实例化结果。
// 所以，Function.prototype的原型对象是Object.prototype，其原型函数是Object()
console.log('Function.prototype的原型对象是Object.prototype')
console.log(Function.prototype.__proto__ === Object.prototype) // true

/*
 总结
* 【1】函数(Function也是函数)是new Function的结果，所以函数可以作为实例对象，其构造函数是Function()，原型对象是Function.prototype

　【2】对象(函数也是对象)是new Object的结果，所以对象可以作为实例对象，其构造函数是Object()，原型对象是Object.prototype

　【3】Object.prototype的原型对象是null

Function的__proto__指向其构造函数Function的prototype；

Object作为一个构造函数(是一个函数对象!!函数对象!!),所以他的__proto__指向Function.prototype；

Function.prototype的__proto__指向其构造函数Object的prototype；

Object.prototype的__prototype__指向null（尽头）；
*/
