function myPromise () {
  let p = new Promise(function (resolve, reject) {
    let num = Math.random() * 10
    setInterval(function () { // 并不会重复执行，只执行一次
      if (num < 5) {
        resolve('数据:' + num + ' 小于5 正确')
      } else {
        // reject('数据：' + num + ' 大于5 错误') // not good
        reject(new Error('数据：' + num + ' 大于5 错误')) // good
      }
    }, 1000)
  })
  return p
}

myPromise()
  .then(function (data) { // 对应resolve
    console.log('操作成功')
    console.log(data)
  })
  .catch(function (data) { // 对应reject
    console.log('操作失败')
    console.log(data)
  })
