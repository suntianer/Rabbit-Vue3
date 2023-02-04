import {h, render} from 'vue'
import XtxMessage from './message.vue'
type Params = {
  type: 'success' | 'error' | 'warning'
  text: string
  duration?: number
}

// JS代码 DOM
// 创建一个div标签， 存储到内存中， 可以再控制台中打印出来， 但是页面中没有
const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)

export default function Message({type, text, duration}:Params) {
  const vNode = h(XtxMessage, {type, text})
  render(vNode, div)
  let timer
  // 开启延时器
  clearTimeout(timer)
  timer = setTimeout(() => {
    // 删除虚拟DOM
    render(null, div)
  }, duration)
}
Message.error = function (text: string, duration = 2000) {
  Message({
    type: 'error',
    text,
    duration,
  })
}
Message.success = function (text: string, duration = 2000) {
  Message({
    type: 'success',
    text,
    duration,
  })
}
Message.warning = function (text: string, duration = 2000) {
  Message({
    type: 'warning',
    text,
    duration,
  })
}