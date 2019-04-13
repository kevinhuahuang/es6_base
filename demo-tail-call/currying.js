// 函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。
function currying (fn, n) {
  return function (m) {
    return fn.call(this, m, n)
  }
}

// 尾递归函数
function tailFactorial (n, total) {
  if (n === 1) return total
  return tailFactorial(n - 1, n * total)
}

const factorial = currying(tailFactorial, 1) // total值设为1

console.log(factorial(5))

// 方法2，采用ES6的函数默认值
function factorialSecond (n, total = 1) { // total 默认值为1
  if (n === 1) return total
  return factorialSecond(n - 1, n * total)
}

console.log(factorialSecond(5)) // 120
