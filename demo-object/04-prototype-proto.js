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


// 构造函数有一个prototype属性，指向实例对象的原型对象。通过同一个构造函数实例化的多个对象具有相同的原型对象。
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
console.log(Person.prototype.constructor === Person);//true


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