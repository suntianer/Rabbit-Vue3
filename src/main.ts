import { createApp } from 'vue'
import App from './App.vue'

// 该引用方式， 一引用立刻执行
import 'normalize.css'
import '@/assets/styles/common.less'
import router from './router'
import { createPinia } from 'pinia'
import XtxUI from './components'

const app = createApp(App)
const pinia = createPinia()

// 凡是能够通过app.use进行挂载都是vue的插件， 当自己封装插件的时候， 必须要有install方法
app.use(XtxUI)
app.use(router)
app.use(pinia)
app.mount('#app')
