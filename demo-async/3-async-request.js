// 用setTimeout来模拟异步请求
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
