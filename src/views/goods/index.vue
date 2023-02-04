<script lang="ts" setup>
import GoodsImage from "./components/good-image.vue";
import { watchEffect, ref } from "vue";
import { storeToRefs } from "pinia";
import useStore from "@/store";
import { useRoute } from "vue-router";
import GoodsSales from "./components/goods-sales.vue";
import GoodsName from "./components/goods-name.vue";
import GoodsSku from "./components/goods-sku.vue";
import GoodsHot from "./components/goods-hot.vue";
import GoodsDetail from "@/views/goods/components/goods-detail.vue";
const { goods } = useStore();
const route = useRoute();
watchEffect(() => {
  const id = route.params.id as string;
  if (id && route.fullPath === `/goods/${id}`) {
    goods.resetGoodsInfo();
    goods.getGoodsInfo(id);
  }
});

const { info } = storeToRefs(goods);
const changeSku = (skuId: string) => {
  console.log(skuId);
  const sku = info.value.skus.find((item) => item.id === skuId);
  if (sku) {
    info.value.inventory = sku.inventory;
    info.value.price = sku.price;
    info.value.oldPrice = sku.price;
  }
};
const count = ref(5);
const min = 1;
const max = 10;
</script>
<template>
  <div class="xtx-goods-page" v-if="info.categories">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${info.categories[1].id}`">
          {{ info.categories[1].name }}
        </XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${info.categories[0].id}`">
          {{ info.categories[0].name }}
        </XtxBreadItem>
        <XtxBreadItem>{{ info.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="info.mainPictures"></GoodsImage>
          <GoodsSales></GoodsSales>
        </div>
        <div class="spec">
          <GoodsName :goods="info"></GoodsName>
          <GoodsSku
            :goods="info"
            :skuId="'1369155863389933570'"
            @changeSku="changeSku"
          ></GoodsSku>
          <!-- 数字选择框 -->
          <XtxNumbox v-model="count" :min="min" :max="max"></XtxNumbox>
          <XtxButton type="primary" style="margin-top: 20px">
            加入购物车
          </XtxButton>
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <!-- 商品详情 -->
            <GoodsDetail :goods="info" />
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :type="1" />
          <GoodsHot :type="2" />
          <GoodsHot :type="3" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
