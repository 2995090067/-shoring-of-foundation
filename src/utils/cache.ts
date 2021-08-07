class LocalCache {
  //保存缓存
  setCache(k: string, v: any) {
    //解析成字符串类型
    window.localStorage.setItem(k, JSON.stringify(v))
  }
  //获取缓存
  getCache(k: string) {
    const v = window.localStorage.getItem(k)
    if (v) {
      // console.log('getcache=>', v)
      return JSON.parse(v)
    }
  }
  //删除缓存
  deleteCache(k: string) {
    window.localStorage.removeItem(k)
  }
  //清楚缓存
  clearCache() {
    window.localStorage.clear()
  }
}
export default new LocalCache()
