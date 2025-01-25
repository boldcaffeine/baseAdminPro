<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <router-link class="sidebar-logo-link" to="/">
      <img v-if="logo" :src="logo" class="sidebar-logo" />
      <h1 class="sidebar-title">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// 定义 props
const props = defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});

// 使用 `reactive` 和 `ref` 创建数据
const title = "Vue Element Admin";
const logo =
  "https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png";
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  align-items: center;
  width: 100%;
  height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  .sidebar-logo-link {
    display: inline-flex;
    align-items: center;
    height: 50px;
    width: 100%;
    .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
      margin-left: 16px;
    }

    .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      font-size: 14px;
      opacity: 1;
      transform: translateY(0px);
      transition: opacity 0.3s ease, transform 0.3s ease, font-size 0.3s ease,
        color 1.3s ease;
    }
  }
  &.collapse {
    .sidebar-title {
      font-size: 0;
      opacity: 0;
      transform: translateY(-30px);
      color: #304156;
    }
  }
}
</style>
