import axios from 'axios'

axios.defaults.baseURL = 'http://123.207.32.32:8000/home/multidata'
axios.get(axios.defaults.baseURL).then((res) => {
  console.log('数据' + res.data)
})
axios
  .request({
    method: 'GET',
    url: axios.defaults.baseURL
  })
  .then((res) => {
    console.log('请求成功！')
    return res
  })
  .catch((err) => {
    console.log('请求失败')
    return err
  })

axios.interceptors.request.use(
  (res) => {
    console.log('请求拦截成功')
    return res
  },
  (err) => {
    console.log('请求失败')
    return err
  }
)
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功')
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)

axios.get<any>(axios.defaults.baseURL).then((res) => {
  console.log(res.data)
  return res
})
