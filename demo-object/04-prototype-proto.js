/*
* 一张图理解prototype、proto和constructor的三角关系
* https://www.cnblogs.com/xiaohuochai/p/5721552.html
* */

/*
* 概念
* 实例对象
* 原型对象
* 原型
* 原型链
* */

// 通过构造函数的new操作创建的对象是实例对象。可以用一个构造函数，构造多个实例对象

function Foo(){};
var f1 = new Foo;
var f2 = new Foo;
console.log(f1 === f2);//false


// 构造函数有一个prototype属性，指向实例对象的原型对象。通过同一个构造函数实例化的多个对象具有相同的原型对象。
// 经常使用原型对象来实现继承
// 原型对象及prototype
function Foo () {};
Foo.prototype.a = 1
var f1 = new Foo()
var f2 = new Foo()

console.log(Foo.prototype.a)// 1
console.log(f1.a)// 1
console.log(f2.a)// 1

console.log(Foo.prototype.constructor === Foo);//true

// constructor
// 原型对象有一个constructor属性，指向该原型对象对应的构造函数
var f1 = new Foo;
console.log(f1.constructor === Foo);//true

// 由于实例对象可以继承原型对象的属性，所以实例对象也拥有constructor属性，同样指向原型对象对应的构造函数

function Foo(){};
var f1 = new Foo;
console.log(f1.constructor === Foo);//true


// proto 实例对象有一个proto属性，指向该实例对象对应的原型对象

function Foo(){};
var f1 = new Foo;
console.log(f1.__proto__ === Foo.prototype);//true