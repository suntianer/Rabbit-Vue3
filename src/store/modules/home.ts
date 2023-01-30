
import request from '@/utils/request'
import { defineStore } from 'pinia'
import { BannerItem, ApiRes, GoodItem, HotGoods, Brand, HomeProduct, goods } from '@/types/data'
export default defineStore ('home', {
  state() {
    return {
      bannerList: [] as BannerItem[],
      newGoodList: [] as GoodItem[],
      hotGoodList: [] as HotGoods[],
      brandList: [] as Brand[],
      productList: [] as HomeProduct[],
    }
  },
  actions: {
    async getBannerList() {
      const res = await request.get<ApiRes<BannerItem[]>>('/home/banner')
      console.log(res);
      this.bannerList = res.data.result
    },
    async getNewList() {
      setTimeout(async () => {
        const res = await request.get<ApiRes<GoodItem[]>>('/home/new')
        console.log(res);
        this.newGoodList = res.data.result
      }, 3000);
    },
    async getHotList() {
      const res = await request.get<ApiRes<HotGoods[]>>('/home/hot')
      console.log(res);
      this.hotGoodList = res.data.result
    },
    async getBrandList() {
      setTimeout(async () => {
        const res = await request.get<ApiRes<Brand[]>>('/home/brand')
        console.log(res);
        this.brandList = res.data.result
      }, 500)
      
    },
    async getProductList() {
      const res = await request.get<ApiRes<HomeProduct[]>>('/home/goods')
      this.productList = res.data.result
    },
  }
})