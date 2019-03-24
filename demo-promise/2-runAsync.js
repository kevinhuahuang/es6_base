function runAsync (message) {
  let p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('执行完成')
      resolve(message)
    }, 2000)
  })
  return p
}

runAsync('第一个promise').then(function (data) {
  console.log(data)
  return runAsync('第二个Promise')
})
  .then(function (data) {
    console.log(data)
    return runAsync('第三个Promise')
  })
  .then(function (data) {
    console.log(data)
    return '直接返回数据，而不是Promise对象，不需要执行Promises函数，直接调用后面的then，并返回数据'
  })
  .then(function (data) {
    console.log(data)
  })
