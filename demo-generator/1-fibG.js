function fib (max) { // 斐波那契数列产生器
  let a = 0
  let b = 1
  let arr = [0, 1]
  while (arr.length < max) {
    [a, b] = [b, a + b]
    arr.push(b)
  }
  return arr
}

console.log(fib(5))
console.log(fib(10))

function * fibG (max) {
  let a = 0
  let b = 1
  let n = 0
  while (n < max) {
    yield a; // a为调用next方法时返回的value值
    [a, b] = [b, a + b]
    n++
  }
}

// 调用方法1
console.log('---------------------------------')
console.log('调用generator的next()')
let f = fibG(5)
console.log(f.next()) // 0
console.log(f.next()) // 1
console.log(f.next()) // 1
console.log(f.next()) // 2
console.log(f.next()) // 3
console.log(f.next()) // undefined

// 调用方法2
console.log('--------------------------------')
console.log('用for of遍历generator函数')
for (let x of fibG(5)) { // generator函数可遍历
  console.log(x) // 依次输出 0 1 1 2 3
}
