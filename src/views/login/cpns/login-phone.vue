<template>
  <el-form label-width="60px">
    <el-form-item label="手机号" prop="num" :rules="rules">
      <el-input v-model="phone.num" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input v-model="phone.code" />
        <el-button type="primary" class="get-btn">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '@/views/login/config/account-config'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '必须11位数字',
      code: ''
    })

    return {
      phone,
      rules
    }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
