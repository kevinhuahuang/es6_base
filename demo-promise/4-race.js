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

// 以最快完成的Promise为then调用的时间点，其它Promise会继续执行
Promise.race([firstPromise('第一个Promise'), secondPromise('第二个Promise'), thirdPromise('第三个Promise'), fourthPromise('第四个Promise')])
  .then(function (result) {
    console.log(result)
  })
/* 输出结果为
*第一个Promise执行完成，耗时1秒
*第一个Promise
*第二个Promise执行完成，耗时2秒
*第三个Promise执行完成，耗时3秒
*第四个Promise执行完成，耗时4秒
*/
