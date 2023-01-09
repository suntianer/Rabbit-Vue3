<script setup lang="ts">
import request from "@/utils/request";
const test = async () => {
  const res = await request.get("/home/index");
  console.log(res);
};
test();
</script>

<template>
  <div class="box">app组件</div>
  <p>哈哈</p>
  <ul>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
  </ul>
</template>

<style scoped lang="less">
.box {
  width: 300px;
  height: 300px;
  background-color: @priceColor;
  .hoverShadow ();
}
</style>
