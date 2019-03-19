'use strict'
/**********************************************************************************************************************
 * Reflect不是构造函数， 要使用的时候直接通过Reflect.method()调用， Reflect有的方法和Proxy差不多，
 * 而且多数Reflect方法原生的Object已经重新实现了。
 */
/**********************************************************************************************************************
 * 为什么要使用Reflect
 * 1.更加有用的返回值
 * 2.函数操作
 * 3.更加可靠的函数式执行方式
 * 4.可变参数形式的构造函数
 * 5.控制访问器或者读取器的this
 * 6.避免直接访问 __proto__
 * Reflect对象一共有13个静态方法。
 Reflect.apply(target,thisArg,args)
 Reflect.construct(target,args)
 Reflect.get(target,name,receiver)
 Reflect.set(target,name,value,receiver)
 Reflect.defineProperty(target,name,desc)
 Reflect.deleteProperty(target,name)
 Reflect.has(target,name)
 Reflect.ownKeys(target)
 Reflect.isExtensible(target)
 Reflect.preventExtensions(target)
 Reflect.getOwnPropertyDescriptor(target, name)
 Reflect.getPrototypeOf(target)
 Reflect.setPrototypeOf(target, prototype)
 */
/**********************************************************************************************************************
 *  Reflect.apply(target, thisArg, args)  替代ES5中的Function.prototype.apply()
 *  target: 要执行的函数
 *  thisArg: 执行函数的上下文this
 *  args: 是一个数组或者伪数组,会作为执行的参数
 **********************************************************************************************************************/
// let fn = function () {
//   this.attr = [0, 1, 2, 3]
// }
// let obj = {}
// Reflect.apply(fn, obj, []) // fn函数中的this将指向 obj
// console.log(obj) // { attr: [ 0, 1, 2, 3 ] }
//
// let result = Reflect.apply(Math.floor, undefined, [1.75]) // 输出：1;
// console.log(result)
// result = Reflect.apply(String.fromCharCode, undefined, [104, 101, 108, 108, 111]) // 输出："hello"
// console.log(result)
// result = Reflect.apply(RegExp.prototype.exec, /ab/, ['confabulation']).index // 输出： 4
// console.log(result)
// result = Reflect.apply(''.charAt, 'ponies', [3]) // 输出："i"
// console.log(result)
// =====================================================================================================================
// Reflect与Proxy联合使用
// {
//   let Fn = function () {
//   }
//
//   Fn.prototype.run = function () {
//     console.log('runs out')
//   }
//
//   let ProxyFn = new Proxy(Fn, {
//     construct (target, argument) {
//       console.log('proxy constructor')
//       let obj = new target(...argument)
//       // Reflect.apply的使用方法
//       Reflect.apply(target.prototype.run, obj, argument)
//       return obj
//     }
//   })
//   console.log(new ProxyFn()) // Fn {}
// }
// =====================================================================================================================
/**********************************************************************************************************************
 *  Reflect.construct(target, args)
 **********************************************************************************************************************/
// =====================================================================================================================
// //Reflect.construct其实就实例化构造函数，通过传参形式的实现，执行的方式不同，效果其实一样。
// //construct的第一个参数为构造函数，第二个参数由参数组成的数组或者伪数据
// let Fn = function (arg) {
//   this.args = [arg]
// }
//
// console.log(new Fn(1))
// console.log(Reflect.construct(Fn, [1])) // 与上面输出是一样的
//
// let d = Reflect.construct(Date, [1776, 6, 4])
// console.log(d instanceof Date)
// console.log(d.getFullYear())

// 所以Reflect.construct和new构造函数是一样的
// 我们可以给Reflect.construct传第三个参数 ， 第三个参数为一个超类， 新元素会继承这个超类；
// function someConstructor () {
//   let result = Reflect.construct(Array, [], someConstructor)
//   Reflect.getPrototypeOf(result) // someConstructor.prototype
//   Array.isArray(result) // true
//
//   let Fn = function () {
//     this.attr = [1]
//   }
//   let Person = function () { // 注意与 Function Person () {} 的区别
//     this.name = 'kevin'
//     let age = 12
//     Person.prototype.height = 175
//   }
//   Person.prototype.run = function () {
//     return 'running'
//   }
//   Person.prototype.weight = 140
//   let newPerson = Reflect.construct(Fn, [], Person)
//   console.log(newPerson.run) // [Function]
//   console.log(newPerson.run()) // running
//   console.log(newPerson.name) // undefined
//   console.log(newPerson.age) // undefined
//   console.log(newPerson.height) // undefined
//   console.log(newPerson.weight) // 140
// }
// someConstructor()
// =====================================================================================================================
// let person = function () {} 与  function person () {} 的区别: 无区别
// function someConstructor () {
//   let result = Reflect.construct(Array, [], someConstructor)
//   Reflect.getPrototypeOf(result) // someConstructor.prototype
//   Array.isArray(result) // true
//
//   let Fn = function () {
//     this.attr = [1]
//   }
//   function Person () { // 注意与 Function Person () {} 的区别
//     this.name = 'kevin'
//     let ages = 34
//     Person.prototype.height = 175
//     Person.prototype.returnHeight = function () { // 为什么要function内部定义的prototype不被继承
//       return '175'
//     }
//   }
//   Person.prototype.run = function () {
//     return 'running'
//   }
//   Person.prototype.weight = 140
//   let newPerson = Reflect.construct(Fn, [], Person)
//   console.log(newPerson.run) // [Function]
//   console.log(newPerson.run()) // running
//   console.log(newPerson.name) // undefined
//   console.log(newPerson.age) // undefined
//   console.log(newPerson.height) // undefined
//   console.log(newPerson.returnHeight) // undefined
//   console.log(newPerson.weight) // 140
// }
// someConstructor()

// =====================================================================================================================
// function Person () { // 注意与 Function Person () {} 的区别
//   this.name = 'kevin'
//   let ages = 34
//   Person.prototype.height = 175
//   Person.prototype.returnHeight = function () { // 为什么要function内部定义的prototype不被继承
//     return '175'
//   }
// }
// Person.prototype.run = function () {
//   return 'running'
// }
// Person.prototype.weight = 140
//
// let kevin = new Person()
// console.log(Person.run + ' __ ' + kevin.run) // undefined ___ [Function]
// // console.log(Person.run() + ' __ ' + kevin.run()) // TypeError: Person.run is not a function ___ running
// console.log(Person.name + ' __ ' + kevin.name) // Person ___ kevin
// console.log(Person.age + ' __ ' + kevin.age) // undefined ___ undefined
// console.log(Person.height + ' __ ' + kevin.height) // undefined ___ 175
// console.log(Person.returnHeight + ' __ ' + kevin.returnHeight) //undefined ___ [Function]
// console.log(Person.weight + ' __ ' + kevin.weight) // undefined ___ 140
/**********************************************************************************************************************
 *   Reflect.defineProperty(target,name,desc)
 *   返回的是一个布尔值， 通过直接赋值的方式把属性和属性值添加给对象返回的是一整个对象， 如果添加失败会抛错；
 **********************************************************************************************************************/
// // let obj = {}
// // obj.x = 10
// // console.log(obj.x)
// // 使用Reflect.defineProperty的方式添加值
// let obj = {}
// if (Reflect.defineProperty(obj, 'x', { value: 7 })) {
//   console.log('添加成功')
// } else {
//   console.log('添加失败')
// }
// =====================================================================================================================
// 如果我们执行preventExtensions， 通过Object.defindProperty定义新属性报错了，
// 但是通过Reflect.defineProperty没有报错， 返回了一个false的值：
// let obj = {}
// Object.preventExtensions(obj)
// Object.defineProperty(obj, 'x', {
//   value: 101,
//   writable: false,
//   enumerable: false,
//   configurable: false
// })// 直接抛错了;
// console.log(Reflect.defineProperty(obj, 'x', { value: 101 })) // 返回false：
// =====================================================================================================================

/**********************************************************************************************************************
 *   Reflect.deleteProperty(target,name)
 *   Reflect.deleteProperty和Reflect.defineProperty的使用方法差不多，
 *   Reflect.deleteProperty和 delete obj.xx的操作结果是一样，
 *   区别是使用形式不同：一个是操作符，一个是函数调用
 **********************************************************************************************************************/
// Reflect.deleteProperty(Object.freeze({ foo: 1 }), 'foo') // false Cannot delete property 'foo' of #<Object>
// delete Object.freeze({ foo: 1 }).foo // 输出：false； Cannot delete property 'foo' of #<Object>
// =====================================================================================================================

// =====================================================================================================================

// =====================================================================================================================
/**********************************************************************************************************************
 *  Reflect.get(target,name,receiver)
 *  这个方法的有两个必须的参数： 第一个为obj目标对象， 第二个为属性名对象， 第三个是可选的，是作为读取器的上下文(this);
 **********************************************************************************************************************/
// let obj = {}
// obj.foo = 1
// console.log(obj.foo) // 输出：1;
// console.log(Reflect.get(obj, 'foo')) // 输出：1;
// =====================================================================================================================
// 如果Reflect.get有第三个参数的话, 第三个参数会作为读取器的上下文
// let obj = {
//   'foo': 1,
//   get bar () {
//     return this.foo
//   }
// }
// let foo = {}
// foo.foo = 'hello'
// console.log(Reflect.get(obj, 'bar', foo))
// =====================================================================================================================

// =====================================================================================================================
/**********************************************************************************************************************
 *   Reflect.getOwnPropertyDescriptor(target, name)
 **********************************************************************************************************************/
// Reflect.getOwnPropertyDescriptor({ x: 'hello' }, 'x') // 不会包装成对象
// Object.getOwnPropertyDescriptor({ x: '1' }, 'x') // 包装成对象
// Reflect.getOwnPropertyDescriptor('hello', 0) // 抛出异常 Reflect.getOwnPropertyDescriptor called on non-object
// Object.getOwnPropertyDescriptor('hello', 0) // 输出：hello
// {value: "h", writable: false, enumerable: true, configurable: false}
// =====================================================================================================================

// =====================================================================================================================

// =====================================================================================================================
/**********************************************************************************************************************
 *   Reflect.getPrototypeOf(target)
 *   Reflect.getPrototypeOf和Object.getPrototypeOf是一样的, 他们都是返回一个对象的原型
 **********************************************************************************************************************/
// console.log(Reflect.getPrototypeOf({})) // 输出：{}
// console.log(Reflect.getPrototypeOf(Object.prototype)) // 输出：null
// console.log(Reflect.getPrototypeOf(Object.create(null))) // 输出： null
// =====================================================================================================================

// =====================================================================================================================

// =====================================================================================================================
/**********************************************************************************************************************
 *   Reflect.has(target,name)
 *  Reflect.has这个方法有点像操作符：in ， 比如这样： xx in obj;
 **********************************************************************************************************************/
// Reflect.has({ x: 0 }, 'x') // 输出： true；
// Reflect.has({ y: 0 }, 'y') // 输出：true
// let obj = { x: 0 }; console.log('x' in obj)
// let proxy = new Proxy(obj, {
//   has: function (target, args) {
//     console.log('执行has方法')
//     return Reflect.has(target, ...args)
//   }
// })
// console.log('x' in proxy) // 输出：true；
// console.log(Reflect.has(proxy, 'x')) // 输出：true
// =====================================================================================================================

// =====================================================================================================================

// =====================================================================================================================
/**********************************************************************************************************************
 *   Reflect.isExtensible(target)
 *   Reflect.isExtensible和Object.isExtensible的区别是， 如果参数不对，一个会抛错， 另一个只是返回true或者false：
 **********************************************************************************************************************/
// // 现在这个元素是可以扩展的；
// let empty = {}
// Reflect.isExtensible(empty) // === true
//
// // 使用preventExtensions方法， 让这个对象无法扩展新属性；
// Reflect.preventExtensions(empty)
// Reflect.isExtensible(empty) // === false
//
// // 这个对象无法扩展新属性， 可写的属性依然可以改动
// let sealed = Object.seal({})
// Reflect.isExtensible(sealed) // === false
//
// // 这个对象完全被冻结了
// let frozen = Object.freeze({})
// Reflect.isExtensible(frozen) // === false
// =====================================================================================================================
// Reflect.isExtensible和Object.isExtensible的区别是， 如果参数不对，一个会抛错， 另一个只是返回true或者false
// Reflect.isExtensible(1)// 抛错了: 1 is not an object
// console.log(Object.isExtensible(1))// 返回false;
// =====================================================================================================================

// =====================================================================================================================
/**********************************************************************************************************************
 *   Reflect.ownKeys(target)
 *   Reflect.ownKeys， Object可没有ownKeys方法, Reflect.ownKeysz他的作用是返回对象的keys;
 **********************************************************************************************************************/
// console.log(Reflect.ownKeys({ 'a': 0, 'b': 1, 'c': 2, 'd': 3 })) // 输出 ：["a", "b", "c", "d"]
// console.log(Reflect.ownKeys([])) // ["length"]
// let sym = Symbol.for('comet')
// let sym2 = Symbol.for('meteor')
// let obj = { [sym]: 0,
//   'str': 0,
//   '773': 0,
//   '0': 0,
//   [sym2]: 0,
//   '-1': 0,
//   '8': 0,
//   'second str': 0 }
// // 进行了一定的排序
// console.log(Reflect.ownKeys(obj))
// // 输出：/ [ "0", "8", "773", "str", "-1", "second str", Symbol(comet), Symbol(meteor) ]
// 排序是根据: 先显示数字， 数字根据大小排序，然后是 字符串根据插入的顺序排序，
// 最后是symbol类型的key也根据插入插入顺序排序;
/**********************************************************************************************************************
 *    Reflect.set(target, name, value, receiver)
 **********************************************************************************************************************/
// let obj = {}
// Reflect.set(obj, 'prop', 'value') // 输出：true
// console.log(obj.prop) // 输出："value"
//
// let arr = ['duck', 'duck', 'duck']
// Reflect.set(arr, 2, 'goose') // true
// console.log(arr[2]) // "goose"
//
// Reflect.set(arr, 'length', 1) // true
// console.log(arr)// ["duck"];

// =====================================================================================================================
// // Reflect.set(obj)相当于 Reflect.set(obj, undefined, undefined);
// let obj = {}
// Reflect.set(obj) // 输出：true
// // 以上的代码相当于 Reflect.set(obj, undefined, undefined);
// Reflect.getOwnPropertyDescriptor(obj, 'undefined')
// // { value: undefined, writable: true, enumerable: true, configurable: true }
// =====================================================================================================================
// Reflect.set也可以有第四个参数， 这个参数会作为stter的this
// let obj = {
//   value: 10,
//   set key (value) {
//     console.log('setter')
//     this.value = value
//   },
//   get key () {
//     return this.value
//   }
// }
// Reflect.set(obj, 'key', 'heheda', obj)
// console.log(obj)
/**********************************************************************************************************************
 *    Reflect.setPrototypeOf(target, prototype)
 *   Reflect.setPrototypeOf()方法和Object.setPrototypeOf差不多一样， 会给对象设置原型， 就是更改对象的__proto__属性了
 **********************************************************************************************************************/
// Reflect.setPrototypeOf({}, Object.prototype) // 输出true
//
// // 给该对象数组[[Prototype]] 为null.
// Reflect.setPrototypeOf({}, null) // true
// // 此时的obj.__proto__为undefine
//
// // 把对象冻结以后重新设置[[prototype]]
// Reflect.setPrototypeOf(Object.freeze({}), null) // false
//
// // 如果原型链循环依赖的话就会返回false.
// let target = {}
// let proto = Object.create(target)
// Reflect.setPrototypeOf(target, proto) // false
// =====================================================================================================================
