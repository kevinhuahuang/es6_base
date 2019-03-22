// 错误处理
function sleep (second) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('want to sleep~')
    }, second)
  })
}

async function errorDemo () { // 会报错 请使用try catch处理
  let result = await sleep(1000)
  console.log(result)
}

// 用try catch处理上面的函数
async function errorDemoSuper () {
  try { // 此实例此处并不执行
    let result = await sleep(1000)
    console.log(result)
  } catch (err) { //  此实例将执行此处
    console.log(err)
  }
}

errorDemoSuper()
