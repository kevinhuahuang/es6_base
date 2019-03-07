/***********************************************************************************************************************
* call, apply和bind是Function对象自带的三个方法，目的是为了改变函数体内部this的指向
 * 第一个参数都是this要指向的对象，也就是想指定的上下文
 * 都可以利用后续参数传参
 * bind返回对应函数
 * apply, call则立即调用
***********************************************************************************************************************/
// function Fruits () {} // 需要调用到constructor的function首字母应该大写
// Fruits.prototype = {
//   color: 'red',
//   say: function () {
//     console.log('My color is ' + this.color)
//   }
// }
// let apple = new Fruits()
// apple.say() // color is red
// Fruits.prototype.say(apple) // 与上面的效果一样
//
// // 如果我们有一个对象 banana = {color: 'yellow'}, 我们不想重新定义say方法，
// // 我们可以通过call 和 apply 的say方法
// const banana = {
//   color: 'yellow'
// }
// // this的指向已经通过call方法改变了，反向是banana, this.color就是banana.color = 'yellow'
// apple.say.call(banana) // color is yellow
// Fruits.prototype.say.call(banana) // 与上面的效果一样
//
// // this的指向通过apply方法改变了，指向的是banana
// apple.say.apply(banana)
// Fruits.prototype.say.apply(banana) // 与上面的效果一样
//
// // null是window下的，此时this指向了window,但是window下并没有color这个属性，因此返回undefined
// apple.say.apply(null)
// Fruits.prototype.say.apply(null) // 与上面的效果一样

// =====================================================================================================================
// 对于apply, call二者而言，作用完全一样，只是接受参数的方式不一样。
// call是把参数按顺序传进去
// apply是把参数都放到数组里
// let array1 = [12, 'foo', { name: 'Joe' }, -2458]
// let array2 = [12, 'foo', { name: 'Joe' }, -2458]
// let array3 = ['Doe', 555, 1000]
//
// Array.prototype.push.call(array1, array3)
// // 第二个参数不会把array2当成数组，而是一个元素
// // 等价于 array1.push(['Doe', 555, 100]) 即array1.push(array3) array1.lenght = 5
// console.log(array1) // [ 12, 'foo', { name: 'Joe' }, -2458, [ 'Doe', 555, 1000 ] ]
// console.log(array1.length) // 5
//
// Array.prototype.push.apply(array2, array3)
// // 等价于 array2.push('Doe').push(555).push(1000) 即相当array2.push(...array3) array1.length = 7
// console.log(array2) // [ 12, 'foo', { name: 'Joe' }, -2458, 'Doe', 555, 1000 ]
// console.log(array2.length) // 7

// =====================================================================================================================
// 类（伪）数组使用数组方法
// var divElements = document.getElementsByTagName('div') // 虽然divElements有length属性，但是他是一个伪数组，不能使用数组里面的方法
// Array.isArray(divElements) // false
//
// var domNodes = Array.prototype.slice.call(document.getElementsByTagName('div'))
// // 将数组对象Array里的this指向伪数组document.getElementsByTagName('div')，
// // slice() 方法可从已有的数组中返回选定的元素，不传参数是，返回整个数组
// Array.isArray(domNodes) // true

/**
* bind() 方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，
 * 绑定函数会以创建它时传入bind()方法的第一个参数作为this, 传入bind() 方法的第二个以及以后的参
 * 数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数
* */
// var module = { // module不能用let定义，要用var定义
//   x: 42,
//   getX: function () {
//     return this.x
//   }
// }
//
// let unboundGetX = module.getX // 不加括号，相当于传入函数整体，与module对象脱离关系，可以查看该函数的完整信息
// let unboundGetXSuper = module.getX() // 加括号，立即执行这个函数，返回42
// console.log(unboundGetX()) // The function gets invoked at the global scope
// console.log(unboundGetXSuper)
// // expected output: undefined
//
// let boundGetX = unboundGetX.bind(module)
// console.log(boundGetX())
// // expected output: 42
// =====================================================================================================================
// this.x = 9 // 在浏览器中，this指向全局的 "window" 对象
// var module = {
//   x: 81,
//   getX: function () { return this.x }
// }
//
// console.log(module.getX()) // 81
//
// let retrieveX = module.getX
// console.log(retrieveX())
// // 返回9 - 因为函数是在全局作用域中调用的
//
// // 创建一个新函数，把 'this' 绑定到 module 对象
// // 新手可能会将全局变量 x 与 module 的属性 x 混淆
// var boundGetX = retrieveX.bind(module)
// console.log(boundGetX()) // 81
// =====================================================================================================================
// 偏函数
// bind()的另一个最简单的用法是使一个函数拥有预设的初始参数。
// 只要将这些参数（如果有的话）作为bind()的参数写在this后面。
// 当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面。
// function list () {
//   return Array.prototype.slice.call(arguments)
// }
//
// function addArguments (arg1, arg2) {
//   return arg1 + arg2
// }
//
// let list1 = list(1, 2, 3) // [1, 2, 3]
// console.log(list1)
//
// let result1 = addArguments(1, 2) // 3
// console.log(result1)
//
// // 创建一个函数，它拥有预设参数列表。
// let leadingThirtysevenList = list.bind(null, 37)
//
// // 创建一个函数，它拥有预设的第一个参数
// let addThirtySeven = addArguments.bind(null, 37)
//
// let list2 = leadingThirtysevenList()
// console.log(list2) // [37]
//
// let list3 = leadingThirtysevenList(1, 2, 3)
// console.log(list3) // [37, 1, 2, 3]
//
// let result2 = addThirtySeven(5)
// console.log(result2) // 37 + 5 = 42
//
// let result3 = addThirtySeven(5, 10)
// console.log(result3) // 37 + 5 = 42 ，第二个参数被忽略

// =====================================================================================================================
// 配合setTimeout
// 在默认情况下，使用 window.setTimeout() 时，this 关键字会指向 window （或global）对象。
// 当类的方法中需要 this 指向类的实例时，你可能需要显式地把 this 绑定到回调函数，就不会丢失该实例的引用。
// function LateBloomer () {
//   this.petalCount = Math.ceil(Math.random() * 12) + 1
// }
//
// // 在 1 秒钟后声明 bloom
// LateBloomer.prototype.bloom = function () {
//   global.setTimeout(this.declare.bind(this), 1000) // 显示地把this绑定到回调函数
// }
//
// LateBloomer.prototype.declare = function () {
//   console.log('I am a beautiful flower with ' + this.petalCount + ' petals!')
// }
//
// let flower = new LateBloomer()
// flower.bloom() // 一秒钟后, 调用'declare'方法
// =====================================================================================================================
// 快捷调用
// var slice = Array.prototype.slice
// slice.apply(arguments)
// // 用 bind()可以使这个过程变得简单。在下面这段代码里面，
// // slice 是 Function.prototype 的 apply() 方法的绑定函数，
// // 并且将 Array.prototype 的 slice() 方法作为 this 的值。这意味着我们用不着上面那个 apply()调用了。
//
// // 与前一段代码的 "slice" 效果相同
// var unboundSlice = Array.prototype.slice
// var slice = Function.prototype.apply.bind(unboundSlice)
// // ...
// slice(arguments)
/**
 * fun.call(thisArg, arg1, arg2, ...) 方法调用一个函数，其具有有一个指定的this值和分别地提供的参数(参数的列表)
 * */
// =====================================================================================================================
// function Product (name, price) {
//   this.name = name
//   this.price = price
// }
//
// function Food (name, price) {
//   Product.call(this, name, price)
//   this.category = 'food'
// }
//
// console.log((new Food('cheese', 5)).name) // cheese

// =====================================================================================================================
// 使用call方法调用父构造函数
// 在一个子构造函数中，你可以通过调用父构造函数的call方法来实现继承，类似于Java中的写法。
// 下例中，使用Food和Toy构造函数创建的对象实例都会拥有在Product构造函数中添加的name属性和price属性,
// 但category属性是在各自的构造函数中定义的。
// function Product (name, price) {
//   this.name = name
//   this.price = price
// }
//
// function Food (name, price) {
//   Product.call(this, name, price)
//   this.category = 'food'
// }
//
// function Toy (name, price) {
//   Product.call(this, name, price)
//   this.category = 'toy'
// }
//
// let cheese = new Food('feta', 5)
// let fun = new Toy('robot', 40)
// console.log(cheese)
// console.log(fun)
// =====================================================================================================================
// 使用call方法调用匿名函数
// var animals = [
//   { species: 'Lion', name: 'King' },
//   { species: 'Whale', name: 'Fail' }
// ]
//
// for (let i = 0; i < animals.length; i++) {
//   (function (i) { // 这个匿名函数的主要目的是给每个数组元素对象添加一个print方法
//     this.print = function () {
//       console.log('#' + i + ' ' + this.species +
//                 ': ' + this.name)
//     }
//     this.print()
//   }).call(animals[i], i)
// }
//
// console.log(animals)
// =====================================================================================================================
// 使用call方法调用函数并且指定上下文的this
// 下例子中，当调用greet时，该方法的this值会绑定到obj对象
// function greet () {
//   let reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ')
//   console.log(reply)
// }
//
// let obj = {
//   animal: 'cats',
//   sleepDuration: '12 and 16 hours'
// }
//
// greet.call(obj) // cats typically sleep between 12 and 16 hours

// =====================================================================================================================
// 使用call方法调用函数并且没有确定第一个参数（argument）
// let sData = 'Wisen'
// function display () {
//   console.log('sData value is %s', this.sData)
// }
//
// display.call()
/**
 * fun.apply(thisArg, [argsArray]) 方法调用一个函数，其具有有一个指定的this值和分别地提供的参数(参数的列表)
 * */
// let numbers = [5, 6, 2, 3, 7]
// let max = Math.max.apply(null, numbers)
// console.log(max)
// // expected output: 7
// let min = Math.min.apply(null, numbers)
// console.log(min)
// // expected output: 2

// =====================================================================================================================
// 使用apply和内置函数
// 聪明的apply用法允许你在某些本来需要写成遍历数组变量的任务中使用内建的函数。
// 在接下里的例子中我们会使用Math.max/Math.min来找出一个数组中的最大/最小值。
/* 找出数组中最大/小的数字 */
// let numbers = [5, 6, 2, 3, 7]
//
// /* 应用(apply) Math.min/Math.max 内置函数完成 */
// let max = Math.max.apply(null, numbers) /* 基本等同于 Math.max(numbers[0], ...) 或 Math.max(5, 6, ..) */
// let min = Math.min.apply(null, numbers)
// console.log(max)
// console.log(min)
// /* 代码对比： 用简单循环完成 */
// max = -Infinity
// min = +Infinity
//
// for (let i = 0; i < numbers.length; i++) {
//   if (numbers[i] > max) { max = numbers[i] }
//   if (numbers[i] < min) { min = numbers[i] }
// }
// =====================================================================================================================

// =====================================================================================================================

// =====================================================================================================================
// let bar = function () {
// //   return this.x
// // }
// //
// // let foo = {
// //   x: 3
// // }
// // let food = {
// //   x: 4
// // }
// // console.log(bar()) // undefined
// // let func = bar.bind(foo)
// // // 此时this已经指向了foo, 但是用bind方法不会立即执行，而是创建一个新函数
// // // 如果要直接调用的话，可以bar.bind(foo)()
// // console.log(func())
// // console.log(bar.bind(food)())
// =====================================================================================================================
// 多次bind是无效的，更深层的原因，bind的实现，相当于使用函数在内部包了一个call/apply
// 第二次bind相当于再包住第一次bind, 故第二次以后的bind是无法生效的
// let bar = function () {
//   console.log(this.x)
// }
// let foo = {
//   x: 3
// }
// let sed = {
//   x: 4
// }
// let func = bar.bind(foo).bind(sed)
// func() // 3
//
// let fiv = {
//   x: 5
// }
// let funcd = bar.bind(sed).bind(fiv)
// funcd()
// =====================================================================================================================
// apply call bind 使用时比较
// let obj = {
//   x: 81
// }
// let foo = {
//   getX: function () {
//     return this.x
//   }
// }
// console.log(foo.getX.bind(obj)()) // 81
// console.log(foo.getX.call(obj)) // 81
// console.log(foo.getX.apply(obj)) // 81

// =====================================================================================================================

// =====================================================================================================================
