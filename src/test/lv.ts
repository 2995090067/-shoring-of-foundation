interface lvInterface<T = string, R = any> {
  demo: (k: T) => T
}

class lvClass implements lvInterface {
  a = 'zhangsan'
  demo(a: string): string {
    return a
  }
}

export default lvClass
