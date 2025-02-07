<template>
  <div class="app-wrapper" :class="classObj">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="main-container" :class="{ hasTagsView: needTagsView }">
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar></Navbar>
        <tags-view v-if="needTagsView" />
      </div>
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import Sidebar from "./components/Sidebar/index.vue";
import Navbar from "./components/NavBar/index.vue";
import TagsView from "./components/TagsView/index.vue";
import AppMain from "./components/AppMain/index.vue";
// Vuex store
const store = useStore();

// Computed properties
const sidebar = computed(() => store.state.app.sidebar);
const device = computed(() => store.state.app.device);
const showSettings = computed(() => store.state.settings.showSettings);
const needTagsView = computed(() => store.state.settings.tagsView);
const fixedHeader = computed(() => store.state.settings.fixedHeader);
const classObj = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  openSidebar: sidebar.value.opened,
  withoutAnimation: sidebar.value.withoutAnimation,
  mobile: device.value === "mobile",
}));
// Methods
const handleClickOutside = () => {
  store.dispatch("app/closeSideBar", { withoutAnimation: false });
};
console.log(classObj.value);
</script>

<style lang="scss" scoped>
@use "@/globalStyles/mixin.scss";
@use "@/globalStyles/variables.scss" as vars;

.app-wrapper {
  @include mixin.clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .sidebar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    width: vars.$sideBarWidth;
    height: 100%;
    transition: width 0.28s;
    background-color: vars.$menuBg;
    font-size: 0px;
    :deep(.el-menu--vertical){
      border-right: 1px solid #304156 ;
    }
  }

  .main-container {
    margin-left: vars.$sideBarWidth;
    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      width: calc(100% - vars.$sideBarWidth);
      transition: width 0.28s;
    }
  }
  &.hideSidebar {
    :deep(.el-menu--collapse) {
      border-right-color: transparent;
      .svg-icon {
        margin: 0;
        text-align: center;
        vertical-align: middle;
        width: var(--el-menu-icon-width);
      }
    }
    .sidebar-container {
      width: vars.$miniSideBarWidth;
    }
    .main-container {
      margin-left: vars.$miniSideBarWidth;
    }
  }
}
</style>
