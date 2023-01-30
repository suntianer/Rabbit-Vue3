// 所有接口的通用类型
export interface ApiRes<T>{
  code: string
  msg: string 
  result: T
}
export interface CategoryGoods {
  // [prop]: string
  id: string
  name: string
  picture: string
  desc: string
  price: string
  discount: any
  orderNum: any
}
// 单个分类的类型
export type categoryItem = {
  id: string
  name: string
  picture: string
  children: categoryItem[] //ts并不清楚后台返回的数据是什么样的
  open: boolean,
  goods: CategoryGoods[]
}

// 轮播图类型
export type BannerItem = {
  hrefUrl: string
  id: string
  imgUrl: string
  type: string
}


export type GoodItem = {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: any;
  orderNum: number;
}



export type HotGoods =  {
  id: string;
  picture: string;
  title: string;
  alt: string;
}


export type Brand = {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  picture: string;
  type?: any;
  desc: string;
  place: string;
}

// 首页商品推荐
export type HomeProduct = {
  id: string
  name: string
  picture: string
  saleInfo: string
  children: {
    id: string
    name: string
  }[]
  goods: {
    id: string
    name: string
    desc: string
    price: string
    picture: string
    discount?: any
    orderNum: number
  }[]
}

// 顶级分类类型
export type TopCategory = {
  id: string
  name: string
  picture: string
  children: categoryItem[]
}


export type SaleProperty = {
  id: string
  name: string
  properties: {
    id: string
    name: string
  }[]
}

// 二级类目
export type SubCategory = {
  id: string
  name: string
  picture?: any
  parentId: string
  parentName: string
  brands: {
    id: string
    name: string
    nameEn: string
    logo: string
    picture: string
    type?: any
    desc: string
    place: string
  }[]
  saleProperties: SaleProperty[]
  goods: GoodItem[]
}

