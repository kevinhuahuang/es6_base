function prepare (success) {
  setTimeout(function () {
    console.log('prepare chicken')
    success()
  }, 1000)
}

function fired (success) {
  setTimeout(function () {
    console.log('fire chicken')
    success()
  }, 1000)
}

function stewed (success) {
  setTimeout(function () {
    console.log('stewed chicken')
    success()
  }, 1000)
}

function add (success) {
  setTimeout(function () {
    console.log('add chicken')
    success()
  }, 1000)
}

function serve (success) { // success是回调函数
  setTimeout(function () {
    console.log('serve chicken')
    success()
  }, 1000)
}

function run (fn) {
  const gen = fn()
  function next () { // Thunk的回调函数
    const result = gen.next()
    if (result.done) return
    result.value(next) // result.value是一个Thunk函数，而回调函数next是它的参数
  }
  next()
  // next函数就是Thunk的回调函数，
  // next函数先将指针移动Generator函数的下一步（gen.next方法）
  // 然后判断Generator函数是否结束（result.done属性）
  // 未结束，将next函数再传入Thunk函数（result.value属性）
  // 结束 直接退出
}

function * task () {
  yield prepare
  yield fired
  yield stewed
  yield add
  yield serve
}

run(task)