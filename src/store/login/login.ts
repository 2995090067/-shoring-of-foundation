import { Module } from 'vuex'
import { ILoginState } from '@/store/login/type'
import { IRootState } from '@/store/type'
//账号登录请求
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'

import localCache from '@/utils/cache'
import { IAccount } from '@/service/login/type'

import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  //命名空间
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    //修改state文件,不能直接在action里写
    changeToken(state, token: string) {
      state.token = token
      // console.log('token', token)
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  actions: {
    //playload保存了用户名和密码
    //async异步函数
    // commit：同步操作，数据提交至 mutations ，可用于读取用户信息写到缓存里
    async accountLoginAction({ commit }, payload: IAccount) {
      //1.实现登录逻辑
      // post请求传入账号和密码payload
      const accountResult = await accountLoginRequest(payload)
      //通过返回值获取账号id和服务器发送的token的数据源获取数据，存入{id,token}对象中
      const { id, token } = accountResult.data
      // 同步token提交给changeToken方法存入给vuex中的token
      commit('changeToken', token)
      // 调用vuex中的token写入本地缓存中的token
      localCache.setCache('token', token)
      // console.log('执行accouLoginAction:', accountResult)
      // console.log(accountResult.data.id, accountResult.data.token)

      //2.通过id获取用户信息
      const userInfoResult = await requestUserInfoById(id)
      //获取用户信息
      const userInfo = userInfoResult.data
      // console.log('userinfo=>', userInfo)
      commit('changeUserInfo', userInfo)
      //缓存用户信息
      localCache.setCache('userInfo', userInfo)
      console.log('用户信息', localCache.getCache(userInfo))

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      //跳转页面到首页
      router.push('/main')
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log('执行phoneLoginAction:', payload)
    },
    // 防止刷新丢失vuex数据
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      // 判断token是否有值
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
