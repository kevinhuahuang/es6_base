const fs = require('fs')
const thunkify = require('thunkify')

// function fib (max) { // 斐波数列产生器
//     let t,
//         a = 0,
//         b = 1,
//         arr = [0, 1]
//     while (arr.length < max) {
//         [a, b] = [b, a + b]
//         arr.push(b)
//     }
//     return arr
// }

// console.log(fib(5))
// console.log(fib(10))

// function* fibG(max) {
//     let t,
//         a = 0,
//         b = 1,
//         n = 0;
//     while (n < max) {
//         yield a;  // a为调用next方法时返回的value值
//         [a, b] = [b, a + b]
//         n++
//     }
// }

// 调用方法1
// let f = fibG(5)
// console.log(f.next())  // 0
// console.log(f.next())  // 1
// console.log(f.next())  // 1
// console.log(f.next())  // 2
// console.log(f.next())  // 3
// console.log(f.next())  // undefined

// // 调用方法2
// for (let x of fibG(5)){
//     console.log(x) // 依次输出 0 1 1 2 3
// }
//======================================================================================================================
// // Thunk函数是自动执行Generator 函数的一种方法
// // 编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。
// // 这个临时函数就叫Thunk函数
// const fs = require('fs')
//
// const thunk = function (fileName, codeType) { // thunk返回一个回调函数
//     return function (callback) {
//         fs.readFile(fileName, codeType, callback)
//     }
// }
//
// const readFileThunk = thunk('data.json', 'utf-8')
//
// // 经过处理，只接受回调函数作为参数，这个单参数版本，就叫做Thunk函数
// // 任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式
// readFileThunk((err,data) => { // readFileThunk只接受一个回调函数为参数，它就是Thunk函数
//     console.log(data)
// })

//======================================================================================================================
// function prepare(success) {
//     setTimeout(function () {
//         console.log('prepare chicken')
//         success()
//     }, 1000)
// }
//
// function fired(success) {
//     setTimeout(function () {
//         console.log('fire chicken')
//         success()
//     }, 1000)
// }
//
// function stewed(success) {
//     setTimeout(function () {
//         console.log('stewed chicken')
//         success()
//     }, 1000)
// }
//
// function add(success) {
//     setTimeout(function () {
//         console.log('add chicken')
//         success()
//     }, 1000)
// }
//
// function serve(success) { // success是回调函数
//     setTimeout(function () {
//         console.log('serve chicken')
//         success()
//     }, 1000)
// }
//
// function run(fn) {
//     const gen = fn()
//     function next() { // Thunk的回调函数
//         const result = gen.next()
//         if (result.done) return
//         result.value(next) // result.value是一个Thunk函数，而回调函数next是它的参数
//     }
//     next()
//     // next函数就是Thunk的回调函数，
//     // next函数先将指针移动Generator函数的下一步（gen.next方法）
//     // 然后判断Generator函数是否结束（result.done属性）
//     // 未结束，将next函数再传入Thunk函数（result.value属性）
//     // 结束 直接退出
// }
//
// function* task() {
//     yield prepare
//     yield fired
//     yield stewed
//     yield add
//     yield serve
// }
//
// run(task)

//=====================================================================================================================
// // 使用thunkify库
// /**
//  * var Thunk = function (fn) {
//  *   return function (..args) {
//  *      return function (callback) {
//  *          return fn.call(this, ...args, callback);
//  *      }
//  *   }
//  * }
//  */
//
// const fs = require('fs')
// const thunkify = require('thunkify')
//
// const thunk = thunkify(fs.readFile)
// const readFileThunk = thunk('data.json', 'utf-8')
// readFileThunk((err, data) => {
//     console.log(data)
// })

//=====================================================================================================================
// // 在Generator中使用thunk函数
//
// const readFileThunk = thunkify(fs.readFile)
// const gen = function* () {
//     const r1 = yield readFileThunk('data1.json', 'utf-8') //r1是yield上一次操作的返回值，由next()参数提供
//     console.log(r1)
//     const r2 = yield readFileThunk('data2.json', 'utf-8')
//     console.log(r2)
// }
//
// const g = gen()
// // 试着打印 g.next() 这里一定要明白 value 是一个 thunk函数 ，否则下面的代码你都看不懂
// // console.log( g.next() )  // g.next() 返回 {{ value: thunk函数, done: false }}
//
// // 下一行中，g.next().value 是一个 thunk 函数，它需要一个 callback 函数作为参数传递进去
// g.next().value((err, data1) => {
//     // 这里的 data1 获取的就是第一个文件的内容。下一行中，g.next(data1) 可以将数据传递给上面的 r1 变量，此前已经讲过这种参数传递的形式
//     // 下一行中，g.next(data1).value 又是一个 thunk 函数，它又需要一个 callback 函数作为参数传递进去
//     g.next(data1).value((err, data2) => {
//         // 这里的 data2 获取的是第二个文件的内容，通过 g.next(data2) 将数据传递个上面的 r2 变量
//         g.next(data2)
//     })
// })

//======================================================================================================================
// // 自驱动流程
// // 自动流程管理的函数
// function run (generator) {
//     const g = generator()
//     function next(err, data) {
//         const result = g.next(data) // 返回 {value:thunk函数, done: ...}
//         if (result.done) {
//             return
//         }
//         result.value(next)
//         // result.value是一个chunk函数，需要一个callback函数，而next就是一个callback的函数
//     }
//     next() // 手动执行，第一次启动next
// }
//
// // 定义Generator
// const readFileThunk = thunkify(fs.readFile)
// const gen = function* () {
//     const r1 = yield readFileThunk('data1.json', 'utf-8')
//      //Thunk函数readFileThunk作为generator的value属性输出，所以此时的value属性是一个Thunk函数，它参数为一个回调函数
//     console.log(r1.toString())
//     const r2 = yield readFileThunk('data2.json', 'utf-8')
//     console.log(r2.toString())
// }
//
// run(gen)


//======================================================================================================================
// //co库
// const co = require('co')
// const readFileThunk = thunkify(fs.readFile)
// const gen = function* () {
//     const r1 = yield readFileThunk('data1.json')
//     console.log(r1.toString())
//     const r2 = yield readFileThunk('data2.json')
//     console.log(r2.toString())
// }
//
// const c = co(gen) // 返回的是一个Promise对象
// c.then(data => {
//     console.log('结束')
// })


//======================================================================================================================
// // koa中如何应用Generator
// let info = ''
// function* g1() {
//     info += '1' // 拼接 1
//     yield* g2() // 拼接 234
//     info += '5' // 拼接 5
// }
//
// function* g2() {
//     info += '2' // 拼接 2
//     yield* g3() // 拼接 3
//     info += '4' // 拼接 4
// }
//
// function* g3() {
//     info += '3' // 拼接3
// }
//
// let g = g1()
// g.next()
// console.log(info)

//======================================================================================================================

