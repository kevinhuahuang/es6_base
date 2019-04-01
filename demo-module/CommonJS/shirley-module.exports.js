let name = 'Shirley' // 错误写法：module.exports.name = 'shirley'
let weight = '52kg'
let height = '158cm'
let nickname = '还没起绰号'
function getPersonalInformation () {
  return name + ' 体重:' + weight + ' 身高:' + height + ' 绰号：' + this.nickname
}

module.exports = {
  name,
  weight,
  height,
  nickname,
  getPersonalInformation
}

// 上面是下面的简写
// 方式1：
// module.exports.name = name
// module.exports.weight = weight
// module.exports.height = height
// module.exports.nickname = nickname
// module.exports.getPersonalInformation = getPersonalInformation

// 方式2：
// module.exports = {
//   name: name,
//   weight: weight,
//   height: height,
//   nickname: nickname,
//   getPersonalInformation: getPersonalInformation
// }

