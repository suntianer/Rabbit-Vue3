<script setup lang="ts" name="TopCategory">
import GoodsItem from "./components/goods-item.vue";
import { watchEffect } from "vue";
import useStore from "@/store";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
const { category, home } = useStore();
const route = useRoute();
const { topCategory } = storeToRefs(category);

// 监听路由
watchEffect(() => {
  // 有参数才发请求，
  if (!route.params.id) return;
  // 是一级类目才往下走
  if (route.fullPath !== `/category/${route.params.id}`) return;
  // 获取一级分类数据
  category.getTopCategory(route.params.id as string);
  // 获取展示的轮播图数据
  // 这里先使用首页的banner代替， 实际工作会有专门的接口
  home.getBannerList();
});
</script>

<template>
  <div class="top-category">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{ category.topCategory.name }}</XtxBreadItem>
      </XtxBread>

      <!-- 轮播图 -->
      <XtxCarousel
        :slides="home.bannerList"
        style="height: 500px"
      ></XtxCarousel>

      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>

      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in topCategory.children">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem
            v-for="goods in item.goods"
            :key="goods.id"
            :goods="goods"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}

.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
