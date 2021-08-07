// 编写好规则
export const rules = {
  name: [
    {
      //是否传值
      required: true,
      message: '用户名是必传内容~',
      //触发标准--失去焦点
      trigger: 'blur'
    },
    {
      // 5-10个字母或数字
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5~10个字母或者数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '用户名必须是3位以上的字母或者数字~',
      trigger: 'blur'
    }
  ],
  num: [
    {
      requeired: true,
      message: '手机号必填',
      tigger: 'blur'
    },
    {
      pattern: /^[0-9]{11,}$/,
      message: '手机号必须11位以上',
      tigger: 'blur'
    }
  ]
}
