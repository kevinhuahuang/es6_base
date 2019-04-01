/*
* ES6 模块不是对象，而是通过export命令显示指定输出的代码，再通过import命令输入.
* 编译时加载（静态加载）
* ES6模块无法被引用，因为它不是对象
* */
let firstName = 'Huang'
let lastName = 'Hua'
let birthday = '1984_06_05'
let nationality = 'china'
function getPersonalInformation () {
  return firstName + ' ' + lastName + ' born in ' + birthday + ' come from ' + nationality
}

export {
  firstName,
  lastName,
  birthday,
  nationality,
  getPersonalInformation
}
