<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="User" name="first">User</el-tab-pane>
      <el-tab-pane label="Config" name="second">Config</el-tab-pane>
      <el-tab-pane label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>
    <button id="counter" @click="increment">{{ count }}</button>
    <button @click="total">加一 {{ count }}</button>
    <input type="text" name="" id="" v-model="changetext" />{{ text }}
    <div>{{ obj.a }}</div>
    <p @click="btn"> e {{ obj }}</p>
    <p @click="btn">testNum{{ testNum }}</p>
  </div>
</template>
<script setup>

import { onMounted, ref, nextTick, computed, reactive } from "vue";
import { TabsPaneContext } from "element-plus";

const keyword = ref("");
const activeName = ref("first");
let count = ref(0);
let testNum = ref(4)
let num = ref(3);
let text = ref("sdadaa");
const obj = reactive({
  a: 1,
  b: 2,
  c: 3,
});
let { a:e,b:f,c:g } = obj;
function btn(){
  testNum.value++
}
const changetext = computed({
  get: () => text.value,

  set: (val) => {
    console.log("val", val);
    text.value = val;
  },
});
// const changetext = computed(()=>count.value+num.value)

const handleClick = (tab, event) => {
  console.log(tab, event);
};
onMounted(() => {});

//冒泡排序
function del(arr) {
  console.log(arr);
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  console.log("del", arr);
}
//选择排序
function selectDel(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let curMin = i;
    for (let j = i + 1; j < len - 1; j++) {
      if (arr[j] < arr[curMin]) {
        curMin = j;
      }
    }
    let temp = arr[i];
    arr[i] = arr[curMin];
    arr[curMin] = temp;
  }
  console.log("selectDel", arr);
}
async function increment() {
  console.log("学习nextTick");
  count.value++;
  console.log(count);

  // DOM 还未更新
  console.log(document.getElementById("counter").textContent); // 0

  await nextTick();
  // DOM 此时已经更新
  console.log(document.getElementById("counter").textContent); // 1
}
</script>