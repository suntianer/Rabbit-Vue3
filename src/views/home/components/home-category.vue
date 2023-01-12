<script lang="ts" setup name="HomeCategory">
import { ref, computed } from "vue";
import useStore from "@/store";
const { category } = useStore();

// setTimeout(() => {
//   console.log(category.list[0].goods);
// }, 5000);

// 要的是弹层数据 --> list（数组.goods）
// 1.创建变量， 保存id
// 2.鼠标划入到左侧菜单的时候， 记录id
// 3.计算属性， 动态的获取list中和记录id相同的数据item， 然后将item当中的goods做返回
// 4.渲染 --> layer
const goodsId = ref("");
const handle = (id: string) => {
  goodsId.value = id;
  // console.log(goodsId.value);
};

const goods = computed(() => {
  const item = category.list.find((item) => item.id === goodsId.value);
  return item?.goods;
});
</script>
<template>
  <div class="home-category" @mouseleave="goodsId = ''">
    <ul class="menu">
      <li
        v-for="(item, index) in category.list"
        :key="index"
        @mouseenter="handle(item.id)"
        :class="{ active: goodsId === item.id }"
      >
        <RouterLink to="/">{{ item.name }}</RouterLink>

        <!-- 提供的假数据没有chilren， 后台提供的数据没有children也会报错 -->
        <!-- template是vue内置模板标签， 不会渲染任何解构， 只是用于分块， v-if -->
        <template v-if="item.children">
          <RouterLink
            to="/"
            v-for="sub in item.children?.slice(0, 2)"
            :key="item.id"
            >{{ sub.name }}</RouterLink
          >
        </template>
        <template v-else>
          <XtxSkeleton
            :width="60"
            :height="18"
            style="margin-right: 5px"
            bg="rgba(255,255,255,0.2)"
            animated
          />
          <XtxSkeleton
            :width="50"
            :height="18"
            bg="rgba(255,255,255,0.2)"
            animated
          />
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul>
        <li v-for="item in goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;
      &:hover,
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
