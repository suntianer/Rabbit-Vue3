// 这个插件文件， 统一的注册所有的全局组件， 统一注册全局指令
import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'
import XtxMore from '@/components/more/index.vue'
import XtxBread from './Bread/index.vue'
import XtxBreadItem from './Bread/Item.vue'
import XtxCity from '@/components/city/index.vue'
import { App } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import defaultImg from '@/assets/images/200.png'
export default {
  install(app: App) {
    // 全局注册组件 构建组件
    app.component('XtxSkeleton', XtxSkeleton)
    app.component('XtxCarousel', XtxCarousel)
    app.component('XtxMore', XtxMore)
    app.component('XtxBread', XtxBread)
    app.component('XtxBreadItem', XtxBreadItem)
    app.component('XtxCity', XtxCity)
    // 构建指令
    // <img :src="item.src" alt="" />
    // <img v-lazy="item.src" alt="" />

    // 首先 VueUse =》 hooks =》 useIntersectionObserver
    app.directive('lazy', {
      // 指令所在的元素节点 被插入 父节点时触发， vue2中用inserted， vue3中用mounted
      // 两个参数， el和binding， el是目标元素， binding是指令的相关信息
      // 把binding的value解构出来， 是图片的地址
      mounted(el, {value}) {
        // el表示元素
        const {stop} = useIntersectionObserver(el, ([{isIntersecting}]) => {
          if(isIntersecting) {
            // 停止监听
            stop()
            // 给el元素设置src属性
            el.src = value

            // 如果图片加载失败， 显示一张默认图片
            el.onerror = function() {
              // 设置加载失败的图片
              el.src =  defaultImg
            }
          }
        })
      }
    })

  },
}