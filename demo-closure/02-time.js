(function () {
  for (var i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i)
    }, 1000 * i)
  }
}()); // 两个立即执行函数间不加分号，运行将报错

// 定时输出 5 5 5 5 5  如果 var改为let，将输出0，1，2，3，4，5

(function () {
  for (var i = 0; i < 5; i++) {
    ((j) => { // 使用了闭包，使其内部能够记住每次循环所在的词法作用域和作用域链
      setTimeout(() => {
        console.log(j)
      }, 1000 * j)
    })(i)
  }
})()
