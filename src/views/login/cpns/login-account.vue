<template>
  <div class="login-account">
    <!--   ：rules匹配规则 :model匹配账号和密码的最新值,formRef绑定了ElForm-->
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <!--      根据prop来匹配规则对象-->
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <!--        show-password，是否展示密码-->
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
// 账号登录功能
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
//账号密码的规则
import { rules } from '../config/account-config'
//缓存处理工具
import localCache from '@/utils/cache'
// usestore
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    // 响应式
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    //InstanceType函数从类型里取出想要的类型实例的构造函数
    const formRef = ref<InstanceType<typeof ElForm>>()
    // 绑定了el-form对象
    const loginAction = (isKeepPassword: boolean) => {
      //validate判断是否验证通过
      formRef.value?.validate((valid) => {
        // console.log(valid)
        //验证通过
        if (valid) {
          //是否记住密码
          if (isKeepPassword) {
            //本地缓存
            //保存账号和密码的缓存
            localCache.setCache('name:', account.name)
            localCache.setCache('password:', account.password)
          } else {
            //不要保存，忘记密码账号
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          //执行登录 传入账号密码 loginModule的登录方法
          // dispatch：含有异步操作，数据提交至 actions ，可用于向后台提交数据
          store.dispatch('login/accountLoginAction', { ...account })
          // console.log({ ...account })
          console.log('真正执行登录逻辑')
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
