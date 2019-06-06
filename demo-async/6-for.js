// 正常 for 循环
async function forDemo () {
  let arr = [1, 2, 3, 4, 5]
  for (let i = 0; i < arr.length; i++) {
    await arr[i]
  }
}
console.log(forDemo())// 正常输出

async function forBugDemo () {
  let arr = [1, 2, 3, 4, 5]
  // arr.forEach(item => {
  //   await item; // 报错 await 不在 async的上下文
  // }, this)
  for (let item of arr) {
    await item
  }
}

forBugDemo()// Uncaught SyntaxError: Unexpected identifier
