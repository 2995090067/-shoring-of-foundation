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

app.use(store)
// app.use(Elementplus)
app.use(globalRegister)
app.use(setupStore)
app.use(router)

app.mount('#app')
