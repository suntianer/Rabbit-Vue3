<script lang="ts" setup name="XtxCity">
export type CityResult = {
  provinceCode: string;
  provinceName: string;
  cityCode: string;
  cityName: string;
  countyCode: string;
  countyName: string;
};
import { ref, watch } from "vue";
import axios from "axios";
import { onClickOutside } from "@vueuse/core";
defineProps<{
  userAddress?: string;
}>();
const active = ref(false);
const toggle = () => {
  active.value = !active.value;
};

// ---------------------------------------------------------
// 城市列表类型
type AreaList = {
  code: string;
  level: number;
  name: string;
  areaList: AreaList[];
};
// ref处理数据， 如果基础类型不需要类型标注， 如果是复杂类型需要泛型标注
// 存储的是获取的信息
const cityList = ref<AreaList[]>([]);
const cacheList = ref<AreaList[]>([]);

// 存储的是用户选择的信息
const changeResult = ref({
  provinceCode: "",
  provinceName: "",
  cityCode: "",
  cityName: "",
  countyCode: "",
  countyName: "",
});
const getCityList = async () => {
  const res = await axios.get<AreaList[]>(
    "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
  );
  cityList.value = res.data;
  cacheList.value = res.data;
};
getCityList();

// 子组件选择完城市， 需要将数据传递给父组件
const emit = defineEmits<{
  (e: "changeCity", value: CityResult): void;
}>();
const selectCity = (city: AreaList) => {
  if (city.level === 0) {
    // 省
    changeResult.value.provinceCode = city.code;
    changeResult.value.provinceName = city.name;
    cityList.value = city.areaList;
  }
  if (city.level === 1) {
    // 市
    changeResult.value.cityCode = city.code;
    changeResult.value.cityName = city.name;
    cityList.value = city.areaList;
  }
  if (city.level === 2) {
    // 县（区）
    changeResult.value.countyName = city.name;
    changeResult.value.countyCode = city.code;
    // 关闭弹窗
    active.value = false;
    // 子传父
    emit("changeCity", changeResult.value);
  }
};

// 监听关闭弹窗的处理，恢复数据
watch(active, (value) => {
  // value表示的是active的变化
  // 当关闭active的时候，需要回复数据
  if (!value) {
    cityList.value = cacheList.value;
  }
});

const target = ref(null);
onClickOutside(target, (e) => {
  active.value = false;
});
</script>
<template>
  <div class="xtx-city" ref="target">
    <div class="select" :class="{ active: active }" @click="toggle">
      <span class="value" v-if="userAddress">{{ userAddress }}</span>
      <span class="placeholder" v-else>请选择配送地址</span>

      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="active">
      <span
        class="ellipsis"
        v-for="item in cityList"
        :key="item.code"
        @click="selectCity(item)"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
