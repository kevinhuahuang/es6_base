// Thunk函数是自动执行Generator 函数的一种方法
// 编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。
// 这个临时函数就叫Thunk函数
const fs = require('fs')
const thunkify = require('thunkify')

const thunk = function (fileName, codeType) { // thunk返回一个回调函数
  return function (callback) {
    fs.readFile(fileName, codeType, callback)
  }
}

const readFileThunk = thunk('data.json', 'utf-8')

// 经过处理，只接受回调函数作为参数，这个单参数版本，就叫做Thunk函数
// 任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式
readFileThunk((err, data) => { // readFileThunk只接受一个回调函数为参数，它就是Thunk函数
  console.log(data)
})


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