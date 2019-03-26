// 你有三个请求需要发生，第三个请求是依赖于第二个请求的解构第二个请求依赖于第一个请求的结果。
// 若用 ES5实现会有3层的回调，若用Promise 实现至少需要3个then。一个是代码横向发展，另一个是纵向发展
function sleep (second, param) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(param)
      resolve(param)
    }, second)
  })
}

async function test () { // 四个sleep按顺序执行
  let result0 = await sleep(2000, 'req00')
  let result1 = await sleep(2000, 'req01')
  let result2 = await sleep(1000, 'req02' + result1) // result1的值为上个await运行resolve的参数值
  let result3 = await sleep(500, 'req03' + result2)
  console.log(`
        ${result0}
        ${result1}
        ${result2}
        ${result3}
    `)
}

test()
