<script lang="ts" setup name="HomeCategory">
import useStore from "@/store";
const { category } = useStore();
</script>
<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="(item, index) in category.list" :key="index">
        <RouterLink to="/">{{ item.name }}</RouterLink>

        <!-- 提供的假数据没有chilren， 后台提供的数据没有children也会报错 -->
        <!-- template是vue内置模板标签， 不会渲染任何解构， 只是用于分块， v-if -->
        <RouterLink
          to="/"
          v-for="sub in item.children?.slice(0, 2)"
          :key="sub.id"
          >{{ sub.name }}</RouterLink
        >
        <!-- <RouterLink to="/">清洁</RouterLink> -->
      </li>
    </ul>
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
      &:hover {
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
}
</style>
