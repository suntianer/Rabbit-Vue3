<script lang="ts" setup name="XtxCarousel">
import { BannerItem } from "@/types/data";
import { ref, onMounted, onUnmounted } from "vue";
// import { PropType } from "vue";
// defineProps({
//   slides: {
//     type: Array as PropType<BannerItem[]>,
//     required: true,
//   },
// });
interface props {
  slides: BannerItem[]; //必填项
  autoPlay?: boolean;
  duration?: number;
}
const props = withDefaults(defineProps<props>(), {
  autoPlay: false,
  duration: 3000,
});
const active = ref(0);
const prev = () => {
  if (active.value <= 0) {
    active.value = props.slides.length - 1;
  } else {
    active.value--;
  }
};
const next = () => {
  if (active.value >= props.slides.length - 1) {
    active.value = 0;
  } else {
    active.value++;
  }
};
let timer: number = -1;
const play = () => {
  // 不穿autoplay不轮播
  if (!props.autoPlay) return;
  clearInterval(timer);
  timer = window.setInterval(() => {
    next();
    // console.log(123);
  }, props.duration);
};

const stop = () => {
  clearInterval(timer);
};
// requestAnimationFrame 1.不会卡顿 2.节约性能
// 一旦使用const 进行变量声明， 变量的值将会成为变量的类型

onMounted(() => {
  // 如果不希望进入页面轮播
  play();
});

onUnmounted(() => {
  stop();
});
</script>

<template>
  <div class="xtx-carousel" @mouseenter="play" @mouseleave="stop">
    <!-- 轮播图主体 -->
    <ul class="carousel-body">
      <li
        class="carousel-item"
        :class="{ fade: active === index }"
        v-for="(item, index) in slides"
        :key="item.id"
      >
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <!-- 左箭头 -->
    <a href="javascript:;" class="carousel-btn prev" @click="prev"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <!-- 右箭头 -->
    <a href="javascript:;" class="carousel-btn next"
      ><i class="iconfont icon-angle-right" @click="next"></i
    ></a>
    <!-- 小圆点 -->
    <div class="carousel-indicator">
      <span
        v-for="(item, index) in slides"
        :key="item.id"
        :class="{ active: active === index }"
        @click="active = index"
      ></span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
