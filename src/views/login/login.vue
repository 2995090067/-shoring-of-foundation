<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/login-panel.vue'

export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {
      // name: 'lisi'
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  //flex布局
  display: flex;
  /*justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。*/
  /*提示：使用 align-content 属性对齐交叉轴上的各项（垂直）。*/
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
