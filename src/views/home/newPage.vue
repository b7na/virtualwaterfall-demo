<template>
  <div @click="backIndex"><el-button>backIndex</el-button></div>
  <div class="input—item">
    <input type="text" v-model="toDomsg" />
  </div>
  <el-button @click="add">添加</el-button>
  <el-button @click="remove">清除</el-button>
  <el-button @click="allSeclect">全选</el-button>
  <div v-if="list.length">
    <div v-for="(item, index) in list" :key="index">
      <input type="checkbox" v-model="item.done" />
      <span :class="{ done: item.done }">{{ item.msg }}</span>
      <span
        @click="deleteItem(index)"
        style="margin-left: 10px; cursor: pointer">x</span>
    </div>
  </div>
  <div v-else>暂无数据</div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router"; //useRoute
import { ref } from "vue";
const router = useRouter();
const backIndex = () => {
  router.back();
};
const isAllSelected = ref<boolean>(false); // 新增全选状态变量  
const add = () => {
  if (toDomsg.value) {
    list.value.push({ msg: toDomsg.value, done: false });
  }
  toDomsg.value = "";
};
const remove = () => {
  list.value = list.value.filter((item) => !item.done);
};

const allSeclect = () => {
  isAllSelected.value = !isAllSelected.value; // 切换全选状态  
  
  list.value.forEach(item => item.done = isAllSelected.value);
};
const deleteItem = (index: number) => {
  list.value.splice(index, 1);
  if (list.value.length && list.value.every(item => item.done)) {  
    isAllSelected.value = true;  
  } else {  
    isAllSelected.value = false;  
  }  
};
type listType= {
  msg: string;
  done: boolean;
}
const list = ref<listType[]>([
  { msg: "吃饭", done: false },
  { msg: "睡觉", done: false },
  { msg: "打豆豆", done: false },
]);
const toDomsg = ref<string>("");
</script>
<style lang="scss" scoped>
.input—item {
  margin: 20px 0;
}
.done {
  text-decoration: line-through;
  color: gray;
}
</style>
