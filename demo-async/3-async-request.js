用setTimeout来模拟异步请求
function sleep (second, param) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(param)
    }, second)
  })
}

async function test () {
  let result1 = await sleep(2000, 'req01')
  let result2 = await sleep(1000, 'req02' + result1)
  let result3 = await sleep(500, 'req03' + result2)
  console.log(`
        ${result1}
        ${result2}
        ${result3}
    `)
}

test()
