<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <!--    stretch是否撑开，:stretch:true的缩写-->
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <!--        账号密码登录功能，ref绑定账号密码登录的响应式数据-->
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <!--          class="对应的图标"-->
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <!--        手机登录功能-->
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <!--记住密码和忘记密码-->
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary" @click="delete">忘记密码</el-link>
    </div>
    <!--登录-->
    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
// https://element-plus.gitee.io/#/zh-CN elment-plus的国内官网
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
import localCache from '@/utils/cache'
//登录面板
//InstanceType实例类型
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    //记住密码
    const isKeepPassword = ref(true)
    //instancetype 实例类型 类型是账号密码登录
    //拿到组件对象的类型的实例里的构造函数
    //InstanceType函数从类型里取出想要的类型实例的构造函数
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    //获取手机信息
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    //获取了eltabs的v-mode属性，值是name的值，默认是第一个,默认account登录
    const currentTab = ref<string>('account')
    //立即登录功能
    const handleLoginClick = () => {
      //调用LoginAccount组件返回值对象中loginAction的类型，调用他的登录处理方法loginAction
      //isKeepPassword.value，把是否记住密码的值传出
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
        console.log('执行账号登录逻辑')
        // 这里是未识别的
        // console.log(accountRef.value?.loginAction(isKeepPassword.value))
      } else if (currentTab.value === 'phone') {
        console.log('执行loginPhone里的方法')
      }
      
      const delete = () => {
        localCache.delete('name')
        localCahce.delete('password')
      }
    }

    return {
      isKeepPassword,
      handleLoginClick,
      currentTab,
      accountRef,
      phoneRef
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  /*后台管理系统字体样式居中*/
  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
