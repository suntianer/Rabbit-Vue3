import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'
import XtxMore from '@/components/more/index.vue'
import XtxBread from '@/components/bread/index.vue'
import XtxBreadItem from '@/components/bread/Item.vue'
import XtxCity from '@/components/city/index.vue'
// 参考：
declare module 'vue' {
  export interface GlobalComponents {
    XtxSkeleton: typeof XtxSkeleton
    XtxCarousel: typeof XtxCarousel
    XtxMore: typeof XtxMore
    XtxBread: typeof XtxBread
    XtxBreadItem: typeof XtxBreadItem
    XtxCity: typeof XtxCity
  }
}
export {}
// 初次使用vue3
// 做全局组件， 少写属性， 赋值不报错； element plus 看源代码， 添加了声明