<script lang="ts" setup>
import HomePanel from "./home-panel.vue";
import useStore from "@/store";
import { useLazyData } from "@/utils/hooks";
import HomeSkeleton from "./home-skeleton.vue";
const { home } = useStore();
const target = useLazyData(() => {
  home.getHotList();
});

// const target = ref(null);
// const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
//   if (isIntersecting) {
//     home.getHotList();
//     stop();
//   }
// });
</script>
<template>
  <div class="home-new" ref="target">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><XtxMore path="/" /></template>
      <!-- 面板内容 -->
      <ul class="goods-list" v-if="home.hotGoodList.length > 0">
        <li v-for="item in home.hotGoodList" :key="item.id">
          <RouterLink to="/">
            <img v-lazy="item.picture" alt="" />
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else></HomeSkeleton>
    </HomePanel>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
