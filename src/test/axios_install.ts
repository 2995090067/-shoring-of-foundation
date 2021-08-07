// console.log('axios发送请求了！')
//axios实例对象
// 严谨的说不是实例，是request函数
import axios from 'axios'

// axios.get()
axios
  .post('http://httpbin.org/post', {
    name: 'zhangsan',
    age: 18
  })
  .then((res) => {
    console.log(res.data)
  })

axios.request({
  method: 'GET',
  url: 'http://123.207.32.32:8000/home/multidata'
})
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  // console.log(res.data.data)
  console.log(res.data)
})
// new Promise<string>((resolve) => {
//   console.log('resplve:' + resolve)
// }).then((res) => {
//   console.log(res.length)
// })
//baseUrl
axios.defaults.baseURL = ''
//超时时长
axios.defaults.timeout = 1000
//默认头部
axios.defaults.headers = ''
