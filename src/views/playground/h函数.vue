<script setup lang="ts">
// h等价于 createVNode
// createNode： 作用 ： 创建虚拟dom

import { h, onMounted, render } from "vue";
// 参数1： 创建虚拟dom的节点类型 div h1  a  img
// 参数2： 虚拟dom拥有的属性， 是一个对象
// 参数3： 虚拟dom节点的内容
const vNode = h(
  "h1",
  { title: "标题", id: "box", className: "aa" },
  "我是标题"
);
onMounted(() => {
  // 参数1：虚拟DOM
  // 参数2：真实的DOM，，，虚拟DOM的挂载点
  render(vNode, document.querySelector(".box")!);
});
</script>

<template>
  <div class="box"></div>
</template>

<style scoped></style>
