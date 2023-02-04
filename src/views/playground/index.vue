<script setup lang="ts">
import Message from "@/components/message/index";
const handler = () => {
  Message({ type: "warning", text: "警告", duration: 3000 });
};
</script>

<template>
  <div>
    <button @click="handler">点击</button>
  </div>
</template>

<style scoped></style>
