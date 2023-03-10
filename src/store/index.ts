import useCategoryStore from "./modules/category";
import useHomeStore from './modules/home'
import useGoodStore from './modules/good'
import useUserStore from './modules/user'
const useStore = () => {
  return {
    category: useCategoryStore(),
    home: useHomeStore(),
    goods: useGoodStore(),
    user: useUserStore()
  }
}
export default useStore