import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// 需要安装node的类型声明文件
// const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueSetupExtend()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
        @import "@/assets/styles/variables.less";
        @import "@/assets/styles/mixin.less";
        `
      }
    }
  }
})
