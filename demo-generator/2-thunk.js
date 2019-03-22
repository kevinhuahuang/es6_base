// Thunk函数是自动执行Generator 函数的一种方法
// 编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。
// 这个临时函数就叫Thunk函数
const fs = require('fs')

const thunk = function (fileName, codeType) { // thunk返回一个回调函数
  return function (callback) {
    fs.readFile(fileName, codeType, callback)
  }
}

const readFileThunk = thunk('../data.json', 'utf-8')

// 经过处理，只接受回调函数作为参数，这个单参数版本，就叫做Thunk函数
// 任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式
readFileThunk((err, data) => { // readFileThunk只接受一个回调函数为参数，它就是Thunk函数
  console.log(data)
})
