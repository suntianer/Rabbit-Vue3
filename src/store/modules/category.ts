import request  from '@/utils/request'
import { defineStore } from 'pinia'
import { categoryItem, ApiRes, TopCategory, SubCategory} from '@/types/data'
import { topCategory } from '../constants'

// [{name: '居家'}， {name: '美食'}]
const defaultCategory  = topCategory.map((item) => {
  return {
    name: item
  }
})
const useCategoryStore = defineStore('category', {
  state() {
    return {
      list: defaultCategory as categoryItem[],
      topCategory: {} as TopCategory, //一级分类
      subCategory: {} as SubCategory, //二级分类
    }
  },
  actions: {
    async getAllCategory () {
      const res = await request.get<ApiRes<categoryItem[]>>('/home/category/head')
      console.log(res.data.result);
      res.data.result.map((item) => {
        item.open = false
      })
      this.list = res.data.result
    },
    show(id: string) {
      const category = this.list.find((item) => item.id === id)
      category!.open = true
    },
    hide(id: string) {
      const category = this.list.find((item) => item.id === id)
      category!.open = false
    },
    // 动态获取， 根据id获取数据
    async getTopCategory(id: string) {
      const res = await request.get<ApiRes<TopCategory>>('/category', {
        params: {
          id,
        },
      })
      // console.log(res);
      this.topCategory = res.data.result
    },
    async getSubFilter(id: string) {
      const res = await request.get<ApiRes<SubCategory>>(
        '/category/sub/filter',
        {
          params: {
            id,
          },
        }
      )
      this.subCategory = res.data.result
    },
  }
})
export default useCategoryStore