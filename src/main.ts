import { createApp } from 'vue'
import App from './App.vue'

// 该引用方式， 一引用立刻执行
import 'normalize.css'
import '@/assets/styles/common.less'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.mount('#app')
