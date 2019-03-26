// await后面可以跟任何的JS表达式，虽然说await可以等很多类型的东西，
// 但是它最主要的意图是用来等待Promise对象的状态被resolved,
// 如果await的是promise对象会造成异步函数停止执行并且等待promise的解决
// 如果等待的是表达式，会立即执行
function sleep (second) { // 返回一个Promise对象
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(' enough sleep~')
    }, second)
  })
}

function normalFunc () {
  console.log('normalFunc')
}

async function awaitDemo () {
  await normalFunc()
  console.log('happening...')
  let result = await sleep(2000) // result保存 sleep中resolve传出的参数
  return result // then方法的参数
}

awaitDemo().then((data) => {
  console.log(data)
})
