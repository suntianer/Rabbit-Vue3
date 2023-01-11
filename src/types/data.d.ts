// 所有接口的通用类型
export interface ApiRes<T>{
  code: string
  msg: string 
  result: T
}
// 单个分类的类型
export type categoryItem = {
  id: string
  name: string
  picture: string
  children: categoryItem[] //ts并不清楚后台返回的数据是什么样的
  open: boolean
}