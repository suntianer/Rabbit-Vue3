import XtxSkeleton from '@/components/skeleton/index.vue'
// 参考：
declare module 'vue' {
  export interface GlobalComponents {
    XtxSkeleton: typeof XtxSkeleton
  }
}
export {}
// 初次使用vue3
// 做全局组件， 少写属性， 赋值不报错； element plus 看源代码， 添加了声明