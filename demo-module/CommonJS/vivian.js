let name = 'Vivian'
let weight = '55kg'
let height = '165cm'

let nickname = '还没起绰号'
exports.nickname = nickname // 不能exports.nickname = '还没起绰号'
function getPersonalInformation () {
  return name + ' 体重:' + weight + ' 身高:' + height + ' 绰号：' + nickname // nickname不能用this.引用，否则undefined
}

function getVivianInformation () {
  return '二蚊 体重：' + weight + ' 身高' + height + ' 绰号：' + nickname // nickname不能用this.引用，否则undefined
}

// 混合使用时，exports只能导出变量，不能导出函数
// exports.getVivianInformation = getVivianInformation // 无法导出(函数)，导出使用时报错 is not a function

module.exports = {
  name,
  weight,
  height,
  getVivianInformation,
  getPersonalInformation
}
