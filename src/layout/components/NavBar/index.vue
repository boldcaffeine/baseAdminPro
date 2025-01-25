<template>
  <div class="navbar">
    <div class="nav-left">
      <hamburger
        class="hamburger-container"
        id="hamburger-container"
        :is-active="sidebar.opened"
        @toggleClick="toggleSideBar"
      />
      <Breadcrumb class="breadcrumb-container" id="breadcrumb-container" />
    </div>
    <div class="nav-right">我是右侧</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Hamburger from "@/components/Hamburger/index.vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";

import { useStore } from "vuex";
// 获取 Vuex store
const store = useStore();

// 计算属性
const sidebar = computed(() => store.getters.sidebar);

// 方法
const toggleSideBar = () => {
  store.dispatch("app/toggleSideBar");
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  .nav-left {
    display: flex;
    align-items: center;
    .hamburger-container {
      box-sizing: border-box;
      height: 50px;
      display: inline-block;
      padding: 15px;
      cursor: pointer;
    }
  }
}
</style>
