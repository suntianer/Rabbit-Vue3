import { createApp } from 'vue'
import App from './App.vue'

// 该引用方式， 一引用立刻执行
import 'normalize.css'
import '@/assets/styles/common.less'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
