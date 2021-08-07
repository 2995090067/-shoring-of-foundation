import axios from 'axios'
// type 这个是：JavaScript 进行静态类型检测的检测工具--@flow，@flow的一种写法

import type { AxiosInstance } from 'axios'
import type { ZYRequestConfig, ZYRequestInterceptors } from './type'

//引入elementplus组件和样式
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/es/el-loading/src/loading.type'
//控制loading是否启用
const DEFAULT_LOADING = true
//可扩展请求
class ZYRquest {
  //
  // (config: AxiosRequestConfig): AxiosPromise;
  // (url: string, config?: AxiosRequestConfig): AxiosPromise;
  //     defaults: AxiosRequestConfig;
  //     interceptors: {
  //         request: AxiosInterceptorManager<AxiosRequestConfig>;
  //         response: AxiosInterceptorManager<AxiosResponse>;
  //axios的实例,包含axios请求的配置,默认axios请求配置,里面有接口,请求拦截<泛型,泛axios请求配置的类型>和响应拦截
  instance: AxiosInstance
  //拦截器,拦截 ,自己定义的拦截器的接口
  interceptors?: ZYRequestInterceptors
  //loading
  showLoading: boolean
  loading?: ILoadingInstance
  //构造器 ,自定义的请求,参数是自定义的请求配置
  constructor(config: ZYRequestConfig) {
    //创建自定义的实例,等于axios创建的实例,传参,传的是自定义的请求的参数
    // 通过 '// @ts-ignore' 注释隐藏 .ts 文件中的错误
    //创建axios实例
    this.instance = axios.create(config)
    //自定义拦截器等于配置的拦截器
    this.interceptors = config.interceptors
    //保存基本信息
    this.showLoading = config.showloading ?? DEFAULT_LOADING
    //在构造函数里使用拦截器
    //1.当前实例的拦截器 请求拦截器
    this.instance.interceptors.request.use(
      // 当前拦截器的请求拦截
      //请求成功
      this.interceptors?.requestInterceptor,
      //请求失败
      this.interceptors?.requestInterceptorCatch
    )

    //服务器响应
    //当前实例的响应的拦截
    this.instance.interceptors.response.use(
      //响应成功
      this.interceptors?.responseInterceptor,
      //响应失败
      this.interceptors?.responseInterceptorCatch
    )

    //2.添加全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的拦截器:请求拦截成功')

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'loading......,请求中……',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器:请求拦截失败')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有的实例都有的拦截器：响应拦截成功')
        //电脑响应，移除loading
        this.loading?.close()
        //获取响应的数据源
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败-err')
        } else {
          console.log('响应成功！==>!!', data)
          return data
        }
      },
      (err) => {
        console.log('所有的实例都有的拦截器:响应拦截失败!')
        //移除loading
        this.loading?.close()
        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        //可以用switch进行判断
        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        return err
      }
    )
  } //构造函数结束

  //request请求,传参,传的参数类型是自定义的请求配置类型,请求函数的返回值类型是Promise,泛型泛T
  // request<t>(config:ZYRequestConfig):Promise<T>{
  //     return new Promise<T>((resolve,reject)=>{
  //
  //
  //     })
  // }
  //3.针对请求的单独的拦截器
  request<T>(config: ZYRequestConfig<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      //判断是否需要显示loading
      if (config.showloading === false) {
        this.showLoading = config.showloading
      }
      // 当前实例请求函数的泛型是any,T
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          //2.对showloading进行处理，让其为true，不会响应下一个请求
          this.showLoading = DEFAULT_LOADING
          // 讲结果返回出去
          resolve(res)
        })
        .catch((err) => {
          //对showloading进行处理，让其为true，不会响应下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }
  get<T>(config: ZYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: ZYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: ZYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: ZYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default ZYRquest
