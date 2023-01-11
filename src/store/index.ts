import useCategoryStore from "./modules/category";
const useStore = () => {
  return {
    category: useCategoryStore()
  }
}
export default useStore