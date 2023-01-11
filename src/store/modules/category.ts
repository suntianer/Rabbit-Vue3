import request  from '@/utils/request'
import { defineStore } from 'pinia'
import { categoryItem, ApiRes} from '@/types/data'
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
      list: defaultCategory as categoryItem[]
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
  }
})
export default useCategoryStore