// 小心并行处理
function sleep (second) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('request done!' + Math.random())
    }, second)
  })
}

async function bugDeom () { // 阻塞式同步操作
  console.log(await sleep(1000))
  console.log(await sleep(1000))
  console.log(await sleep(1000))
  console.log('clear the loading~')
}

bugDeom()
