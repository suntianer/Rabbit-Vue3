<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, SpecValue, Spec } from "@/types/good";
import bwPowerSet from "@/utils/power";

// sku组件的基本使用
// 1. （必须）需要传入 商品信息对象 => 拥有了启用， 禁用， 选择功能
// 2. （可选） 传入skuId => 默认回显， 默认让一些规格选中
// 3. 当全部规格选完之后， 就是确定了一个sku， 需要子传父 将skuId 传给父即可
const props = defineProps<{
  goods: GoodsInfo;
  skuId?: string;
}>();

const emit = defineEmits<{
  (e: "changeSku", skuId: string): void;
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
  updateDisabledStatus();
  // 1. 判断规格是否全部选中
  const selected = getSelectedSpec().filter((v) => v);
  if (selected.length === props.goods.specs.length) {
    // 说明全部选中
    // 2.去pathMap找到对应的skuId
    const key = selected.join("+");
    const [skuId] = pathMap[key];
    // 3.子传父
    emit("changeSku", skuId);
  }
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
  const selectArr = getSelectedSpec(); //['', '', '日本']

  // 根据路径字典 => 更新所有的按钮specValue的状态
  props.goods.specs.forEach((spec, index) => {
    spec.values.forEach((sub) => {
      // 让当前这个按钮， specValue.name(黑色) 和 selectArr 进行组合
      // 注意： 这边尝试组合， 判断是否禁用时， 需要拷贝一份原数组
      const tempArr = [...selectArr];
      tempArr[index] = sub.name;
      // 得到组合后转成字符串的key '黑色 + 日本' 去pathMap中查找的
      const key = tempArr.filter((item) => item).join("+");
      if (key in pathMap) {
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
  });
  return arr;
};

// 默认根据父传子， 传递的skuId， 进行回显， 设置选中状态
const initSelectedSpec = () => {
  if (!props.skuId) return;
  const sku = props.goods.skus.find((item) => item.id === props.skuId);
  if (!sku) return;
  // 基于sku.specs, 让按钮设置或选中状态
  props.goods.specs.forEach((item, index) => {
    // 获取sku选择的规格
    const specValue = sku.specs[index].valueName;
    // find, 三个按钮中， 其实， 只会有一个被选中
    const spec = item.values.find((item) => item.name === specValue);
    spec!.selected = true;
  });
};

const pathMap = getPathMap();
console.log(pathMap);
initSelectedSpec();
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
