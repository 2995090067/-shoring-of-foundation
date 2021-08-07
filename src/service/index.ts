//service统一出口
import ZYRequest from './request/index'
import { BASE_URL, TIME_OUT } from '@/service/request/config'
//本地缓存处理方法的ts文件
import localCache from '@/utils/cache'

const zyRequest = new ZYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 拦截器
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截,从本地缓存中获取
      const token = localCache.getCache('token')
      console.log('service/index=>', token)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截')
      return err
    }
  }
})

export default zyRequest
