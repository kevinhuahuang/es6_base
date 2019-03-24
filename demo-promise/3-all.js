function firstPromise (message) {
  let p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('第一个Promise执行完成，耗时1秒')
      resolve(message)
    }, 1000)
  })
  return p
}

function secondPromise (message) {
  let p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('第二个Promise执行完成，耗时2秒')
      resolve(message)
    }, 2000)
  })
  return p
}

function thirdPromise (message) {
  let p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('第三个Promise执行完成，耗时3秒')
      resolve(message)
    }, 3000)
  })
  return p
}

function fourthPromise (message) {
  let p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('第四个Promise执行完成，耗时4秒')
      resolve(message)
    }, 4000)
  })
  return p
}

// all参数中的Promise对象并行执行（同时执行），全部执行完再执行then。
// all把所有promise对象返回的数据组成数组作为then的参数
// 以最慢的Promise执行完为then调用的时间点
Promise.all([firstPromise('第一个Promise'), secondPromise('第二个Promise'), thirdPromise('第三个Promise'), fourthPromise('第四个Promise')])
  .then(function (result) {
    console.log(result)
  })
