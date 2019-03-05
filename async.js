const fs = require('fs')
const co = require('co')
//======================================================================================================================
// // 基础语法
// async function basicDemo() { // 返回的是一个promise对象
//     let result = await Math.random()
//     // console.log(result)
// }
//
// basicDemo()
// //console.log(basicDemo()) // Promise { <pending> }

//======================================================================================================================
// // async用来表示函数是异步的，定义的函数返回一个promise对象，可以使用then方法添加回调函数
// async function demo01() {
//     return 123 // 如果async定义的函数有返回值，相当于Promise.resolve(123)
//     // 没有声明式的return,相当于执行Promise.resolve()
// }
//
// demo01().then(value => {
//     console.log(value)
// })

//======================================================================================================================
// // await后面可以跟任何的JS表达式，虽然说await可以等很多类型的东西，
// // 但是它最主要的意图是用来等待Promise对象的状态被resolved,
// // 如果await的是promise对象会造成异步函数停止执行并且等待promise的解决
// // 如果等待的是表达式，会立即执行
// function sleep(second) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(' enough sleep~')
//         }, second)
//     })
// }
//
// function normalFunc() {
//     console.log('normalFunc')
// }
//
// async function awaitDemo() {
//     await normalFunc()
//     console.log('happening...')
//     let result = await sleep(2000)
//     console.log(result)
// }
//
// awaitDemo()
//======================================================================================================================
// 用setTimeout来模拟异步请求
// function sleep(second, param) {
//     return new Promise((resolve, reject) => {
//         setTimeout( ()=> {
//             resolve(param)
//         }, second)
//     })
// }
//
// async function test() {
//     let result1 = await sleep(2000, 'req01')
//     let result2 = await sleep(1000, 'req02' + result1)
//     let result3 = await sleep(500, 'req03' + result2)
//     console.log(`
//         ${result1}
//         ${result2}
//         ${result3}
//     `)
// }
//
// test()

//======================================================================================================================
// //错误处理
// function sleep(second) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject('want to sleep~')
//         }, second)
//     })
// }
//
// async function errorDemo() { // 会报错 请使用try catch处理
//     let result = await sleep(1000)
//     console.log(result)
// }
//
// // 用try catch处理上面的函数
// async function errorDemoSuper() {
//     try { // 此实例此处并不执行
//         let result = await  sleep(1000)
//         console.log(result)
//     } catch (err) { //  此实例将执行此处
//         console.log(err)
//     }
// }
//
// errorDemoSuper()


//======================================================================================================================
// // 小心并行处理
// function sleep(second) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('request done!' + Math.random())
//         }, second)
//     })
// }
//
// async function bugDeom () { // 阻塞式同步操作
//     console.log(await sleep(1000))
//     console.log(await sleep(1000))
//     console.log(await sleep(1000))
//     console.log('clear the loading~')
// }
//
// bugDeom()

//======================================================================================================================
// await in for 循环
// 正常 for 循环
// async function forDemo() {
//     let arr = [1, 2, 3, 4, 5]
//     for (let i = 0 ; i < arr.length; i++) {
//         await arr[i]
//     }
// }
// forDemo()

// ======================================================================================================================
// // 依次读取两个文件
//
// let readFile = function (fileName) {
//     return new Promise(function (resolve, reject)  {
//         fs.readFile(fileName, function(error, data) {
//             if (error) reject(error)
//             resolve(data)
//         })
//     })
// }
//
// // Generator函数形式
// // let gen = function* () {
// //     let f1 = yield readFile('data1.json')
// //     let f2 = yield readFile('data2.json')
// //     console.log(f1.toString())
// //     console.log(f2.toString())
// // }
// //
// // co(gen)
//
// // async函数形式
// let asyncReadFile = async function () {
//     let f1 = await readFile('data1.json')
//     let f2 = await readFile('data2.json')
//     console.log(f1.toString())
//     console.log(f2.toString())
// }
//
// asyncReadFile()

// ======================================================================================================================
// await命令后面的Promise对象， 运行结果可能是rejected
// 所以最好把await命令放在try...catch代码中
async function myFunction () {
    try {
        await somethingThantReturnsAPromise()
    } catch (err) {
        console.log(err)
    }
}

//另一种写法
async function myFunction() {
    await somethingThatReturnsAPromise().catch(function (err){
        console.log(err)
    })
}











































