
import request from '@/utils/request'
import { defineStore } from 'pinia'
import { BannerItem, ApiRes } from '@/types/data'
export default defineStore ('home', {
  state() {
    return {
      bannerList: [] as BannerItem[]
    }
  },
  actions: {
    async getBannerList() {
      const res = await request.get<ApiRes<BannerItem[]>>('/home/banner')
      console.log(res);
      this.bannerList = res.data.result
    }
  }
})