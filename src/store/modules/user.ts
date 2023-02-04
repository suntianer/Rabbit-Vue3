
import request from '@/utils/request'
import { defineStore } from 'pinia'
import {ApiRes, Profile} from '@/types/data'
export default defineStore ('user', {
  state() {
    return {
       // 用户信息
      profile: {} as Profile,
    }
  },
  actions: {
    // 用户名和密码登录
    async login(account: string, password: string) {
      const res = await request.post<ApiRes<Profile>>('/login', {
        account,
        password,
      })
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result
    },
  }
})