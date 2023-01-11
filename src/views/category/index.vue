<script setup lang="ts" name="TopCategory">
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <div class="category">分类组件 {{ route.params }}</div>
</template>

<style scoped></style>
