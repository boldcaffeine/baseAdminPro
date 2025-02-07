<template>
  <div class="app-container">
    我是首页{{ doneTodosCount }}
    <div>
      <svg-icon name="user"></svg-icon>
      <SvgIcon name="drag"></SvgIcon>
      <SvgIcon name="edit"></SvgIcon>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const doneTodosCount = computed(() => {
  return store.state.count;
});
console.log(store.state, "store.state");
console.log(store.getters, "store.getters");
</script>

<style lang="scss" scoped>
.app-container {
  padding: 16px;
//   background-color: rgb(240, 242, 245);
  position: relative;
}
</style>


