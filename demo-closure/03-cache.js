var CachedSearchBox = (function () {
  var cache = {}

  var count = []

  return {

    attachSearchBox: function (dsid) {
      if (dsid in cache) { // 如果结果在缓存中
        return cache[dsid]// 直接返回缓存中的对象
      }

      var fsb = new uikit.webctrl.SearchBox(dsid)// 新建

      cache[dsid] = fsb// 更新缓存

      if (count.length > 100) { // 保正缓存的大小<=100
        delete cache[count.shift()]
      }

      return fsb
    },

    clearSearchBox: function (dsid) {
      if (dsid in cache) {
        cache[dsid].clearSelection()
      }
    }

  }
})()

CachedSearchBox.attachSearchBox('input1')
