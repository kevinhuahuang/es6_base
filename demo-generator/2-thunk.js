// Thunk函数是自动执行Generator 函数的一种方法
// 编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。
// 这个临时函数就叫Thunk函数
const fs = require('fs')

// 函数原型：fs.readFile(file[, options], callback)。支持3个参数，其中最后一个是回调函数
// 普通调用方式：
// function someCallback(err, data) {
//     if (err) throw err;
//     console.log(data);
// }
// fs.readFile('./oranges.txt','utf8', someCallback);

function someCallback (err, data) {
  if (err) throw err
  console.log(data)
}

const thunk = function (fileName, codeType) { // thunk返回一个回调函数
  return function (callback) {
    fs.readFile(fileName, codeType, callback)
  }
}

const readFileThunk = thunk('../data.json', 'utf-8')

// 经过处理，只接受回调函数作为参数，这个单参数版本，就叫做Thunk函数
// 任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式
readFileThunk(someCallback) // readFileThunk只接受一个回调函数为参数，它就是Thunk函数

// Thunk函数真正的作用是简化了参数，将原本多参的函数，简化成只接受回调函数做参数。
// 即多参版本的异步函数，经由Thunk，变成了单参（参数为回调函数）函数。
