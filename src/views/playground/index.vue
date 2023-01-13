<script setup lang="ts">
// import { useIntersectionObserver } from "@vueuse/core";
// import { ref } from "vue";

// const target = ref<HTMLImageElement | null>(null);
// useIntersectionObserver(target, ([{ isIntersecting }]) => {
//   console.log(isIntersecting);
// });
const url =
  "https://yanxuan-item.nosdn.127.net/79f289a4e975fd030d5c37b98b9282c5.jpg";
</script>

<template>
  <div style="height: 1000px"></div>
  <img v-lazy="url" alt="" />
</template>

<style scoped></style>
