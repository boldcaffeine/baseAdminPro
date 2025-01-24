<template>
  <div :class="{ 'has-logo': showLogo }" class="page">
    <logo v-if="showLogo" :collapse="isCollapse" />

    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>

      <!-- 添加更多的菜单项 -->
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>Navigator Four</span>
      </el-menu-item>

      <!-- 添加更多菜单项以测试滚动 -->
      <el-menu-item index="5">Navigator Five</el-menu-item>
      <el-menu-item index="6">Navigator Six</el-menu-item>
      <el-menu-item index="7">Navigator Seven</el-menu-item>
      <el-menu-item index="8">Navigator Eight</el-menu-item>
      <el-menu-item index="9">Navigator Nine</el-menu-item>
      <el-menu-item index="10">Navigator Ten</el-menu-item>
      <el-menu-item index="11">Navigator Eleven</el-menu-item>
      <el-menu-item index="12">Navigator Twelve</el-menu-item>
      <el-menu-item index="13">Navigator Thirteen</el-menu-item>
      <el-menu-item index="14">Navigator Fourteen</el-menu-item>
      <el-menu-item index="15">Navigator Fifteen</el-menu-item>
    </el-menu>
  </div>
</template>
<style lang="scss" scoped>
.page {
  font-size: 14px !important;
  color: #fff;
}
</style>
<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import Logo from "./Logo.vue";

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
// Get the store
const store = useStore();

const showLogo = computed(() => store.state.settings.sidebarLogo);
const sidebar = computed(() => store.state.app.sidebar);

const isCollapse = computed(() => !sidebar.value.opened);
</script>