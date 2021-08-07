import { createStore } from 'vuex'
import { IRootState } from '@/store/type'
import login from '@/store/login/login'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'zy',
      age: 22
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

// dispatch：含有异步操作，数据提交至 actions ，可用于向后台提交数据
// this.$store.dispatch('isLogin', true);
// commit：同步操作，数据提交至 mutations ，可用于读取用户信息写到缓存里
// this.$store.commit('loginStatus', 1);
//防止vuex数据丢失
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
