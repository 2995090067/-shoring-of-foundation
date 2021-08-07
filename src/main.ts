import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
// //全局注册
// import Elementplus from 'element-plus'
// //element-plus样式
// import 'element-plus/lib/theme-chalk/index.css'
// 注册部分element_plus和样式
import { globalRegister } from '@/global'
//注册请求
import zyRequest from '@/service'

//引入初始化css
import 'normalize.css'
import './assets/css/index.less'

//防止刷新丢失vuex数据
import { setupStore } from './store'

const app = createApp(App)
app.use(router)
app.use(store)
// app.use(Elementplus)
app.use(globalRegister)
app.use(setupStore)
app.mount('#app')

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }
//
// zyRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     showloading: true
//   })
//   .then((res) => {
//     console.log(1111)
//     // ,防止
//     console.log('成功！！！', res.data)
//   })
// zyRequest
//   .get<DataType>({
//     url: '/home/multidata/404',
//     showloading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })
//   .catch((err) => err)
