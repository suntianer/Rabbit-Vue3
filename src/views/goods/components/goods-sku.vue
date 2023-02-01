<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, SpecValue, Spec } from "@/types/good";
import bwPowerSet from "@/utils/power";
console.log(bwPowerSet(["红色", "国产", "规格"]));

const props = defineProps<{
  goods: GoodsInfo;
}>();

// item表示当前规格， sub规格当中的某一项
const changeSelected = (item: Spec, sub: SpecValue) => {
  if (sub.disabled) return;
  if (sub.selected) {
    // 如果本身属于选中状态， false
    sub.selected = false;
  } else {
    //把同级所有（包括sub的selected）改为false
    item.values.forEach((v) => (v.selected = false));
    // 选中的sub改为true
    sub.selected = true;
  }
  getSelectedSpec();
};

// 获取路径字典-----------------------------------------------
const getPathMap = () => {
  const pathMap: {
    [key: string]: string[];
  } = {};
  // 1.过滤掉库存为0的sku
  // console.log(props.goods.skus);
  const skus = props.goods.skus.filter((item) => item.inventory > 0);
  // console.log(skus);
  // 2. 遍历有效的sku， 获取sku的幂集
  skus.forEach((item) => {
    // console.log(item.specs); {name: '颜色', valueName: '蓝色'} 要valuename
    const arr = item.specs.map((sub) => sub.valueName);
    // console.log(arr);
    // ['蓝色', '20cm', '中国']
    // 3. 调用powerSet获取幂集
    const powerSet = bwPowerSet(arr);
    // console.log(powerSet);
    // 4. 把这些powerSet合并到一个路径字典中
    powerSet.forEach((sub) => {
      const key = sub.join("+");
      // console.log(key);
      // 5. 判断pathMap中有没有key
      if (key in pathMap) {
        // 6.存在
        pathMap[key].push(item.id);
      } else {
        // 7.不存在
        pathMap[key] = [item.id];
      }
    });
  });
  return pathMap;
};

// 封装更新按钮禁用状态的函数
const updateDisabledStatus = () => {
  props.goods.specs.forEach((item) => {
    // console.log(item.values);
    item.values.forEach((sub) => {
      if (sub.name in pathMap) {
        // 当前规格的名字在pathMap存在，不禁用
        sub.disabled = false;
      } else {
        // 当前规格在pathMap找不到，禁用
        sub.disabled = true;
      }
    });
  });
};

// 获取选中的规格
const getSelectedSpec = () => {
  const arr: string[] = [];
  props.goods.specs.forEach((item) => {
    const temp = item.values.find((sub) => sub.selected);
    arr.push(temp ? temp.name : "");
    return arr;
  });
  console.log(arr);
};

const pathMap = getPathMap();
console.log(pathMap);
updateDisabledStatus();
</script>
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="sub in item.values" :key="sub.name">
          <img
            :class="{ selected: sub.selected, disabled: sub.disabled }"
            v-if="sub.picture"
            :src="sub.picture"
            alt=""
            @click="changeSelected(item, sub)"
          />
          <span
            v-else
            :class="{ selected: sub.selected, disabled: sub.disabled }"
            @click="changeSelected(item, sub)"
          >
            {{ sub.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
