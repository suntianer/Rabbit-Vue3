<script setup lang="ts">
import { ref } from "vue";
import "animate.css";
const flag = ref(false);
</script>

<template>
  <button @click="flag = !flag">点击</button>
  <transition
    name="fade"
    enter-active-class="animate__animated animate__bounceOutUp"
    leave-active-class="animate__animated animate__backOutDown"
  >
    <div class="box" v-if="flag"></div>
  </transition>
</template>

<style scoped>
.box {
  width: 300px;
  height: 300px;
  background-color: pink;
}
/* .from1 {
  opacity: 0;
}
.active1 {
  transition: 3s;
}

.to1 {
  opacity: 1;
} */

/* .fade-leave-from {
  opacity: 1;
}
.fade-leave-active {
  transition: 5s;
  width: 100px;
  height: 100px;
}

.fade-leave-to {
  opacity: 0;
} */
</style>
