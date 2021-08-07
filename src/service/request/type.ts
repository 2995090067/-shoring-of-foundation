//规定拦截的接口
import { AxiosRequestConfig, AxiosResponse } from 'axios'

// ZY请求拦截器接口
export interface ZYRequestInterceptors<T = AxiosResponse, R = any> {
  // 定义接口内拦截的函数
  // requestInterceptor?:()=>void
  // 请求拦截成功 返回AxiosRequestConfig
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  //请求失败
  requestInterceptorCatch?: (error: R) => R
  //响应拦截成功
  responseInterceptor?: (config: T) => T
  //响应失败
  responseInterceptorCatch?: (error: R) => R
}
//类型添加，自定义请求配置接口
//axios请求的配置
// 合并接口让自己上面创建的拦截函数合并Axios里的AxiosRequestConfig里的函数
export interface ZYRequestConfig<T = AxiosResponse, R = any>
  extends AxiosRequestConfig {
  //可以选择性是否使用自定义拦截器拦截接口
  interceptors?: ZYRequestInterceptors<T, R>
  //配置showlonging
  showloading?: boolean
}
