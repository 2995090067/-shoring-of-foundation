//json to ts

export interface IAccount<T = any> {
  name: string
  password: T
}
export interface ILoginResult<T = number, R = string> {
  id: T
  name: R
  token: R
}

export interface IDataType<T = number, R = any> {
  code: T
  data: R
}
