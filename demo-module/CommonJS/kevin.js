let name = 'Kevin'
exports.name = name
exports.weight = '70kg'
exports.height = '175cm'
exports.nickname = '还没起绰号'
exports.getPersonalInformation = function () {
  return name + ' 体重:' + this.weight + ' 身高:' + this.height + ' 绰号：' + this.nickname
}

exports.setName = function (newName) {
  name = newName
}

exports.setNickname = function (newNickname) {
  this.nickname = newNickname
}
