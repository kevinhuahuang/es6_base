const fs = require('fs')
const co = require('co')

// 基础语法
async function basicDemo () { // 返回的是一个promise对象
  let result = await Math.random()
  // console.log(result)
}

// basicDemo()
// console.log(basicDemo()) // Promise { <pending> }

// async用来表示函数是异步的，定义的函数返回一个promise对象，可以使用then方法添加回调函数
async function demo01 () {
  return 123 // 如果async定义的函数有返回值，相当于Promise.resolve(123)
  // 没有声明式的return,相当于执行Promise.resolve()
}

demo01().then(value => {
  console.log(value)
})
