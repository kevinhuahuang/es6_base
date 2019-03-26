// 自驱动流程
// 自动流程管理的函数
const fs = require('fs')
const thunkify = require('thunkify')

function run (generator) {
  const g = generator()
  function next (err, data) {
    if (err) throw err
    const result = g.next(data) // 返回 {value:thunk函数, done: ...}
    if (result.done) {
      return
    }
    result.value(next)
    // result.value是一个chunk函数，需要一个callback函数，而next就是一个callback的函数
  }
  next() // 手动执行，第一次启动next
}

// 定义Generator
const readFileThunk = thunkify(fs.readFile)
const gen = function * () {
  const r1 = yield readFileThunk('../data1.json', 'utf-8')
  // Thunk函数readFileThunk作为generator的value属性输出，所以此时的value属性是一个Thunk函数，它参数为一个回调函数
  console.log(r1.toString())
  const r2 = yield readFileThunk('../data2.json', 'utf-8')
  console.log(r2.toString())
}

run(gen)
