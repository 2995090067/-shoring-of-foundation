import zyRequest from '@/service'

import { IAccount, IDataType, ILoginResult } from '@/service/login/type'

enum login {
  AccountLogin = '/login',
  //请求用户信息
  LoginUserInfo = '/users/', //用法/users/1
  UserMenus = '/role/' //用法role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return zyRequest.post<IDataType<ILoginResult>>({
    // 路径是baseurl+’login‘
    url: login.AccountLogin,
    // 传入的数据就是用户名和密码
    data: account
  })
}
//通过id获取用户消息
export function requestUserInfoById(id: number) {
  return zyRequest.get<IDataType>({
    // 路径改变
    url: login.LoginUserInfo + id,
    showloading: false
  })
}
//请求用户菜单
export function requestUserMenusByRoleId(id: number) {
  return zyRequest.get<IDataType>({
    url: login.UserMenus + id + '/menu',
    showloading: false
  })
}
