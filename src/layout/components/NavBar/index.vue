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
    <div class="nav-right">
      <search class="right-menu-item" id="header-search" />
      <screenfull class="right-menu-item hover-effect" id="screenfull" />
      <el-tooltip content="Global Size" effect="dark" placement="bottom">
        <size-select id="size-select" class="right-menu-item hover-effect" />
      </el-tooltip>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <el-icon><ArrowDownBold /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/profile/index">
              <el-dropdown-item>Profile</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>Dashboard</el-dropdown-item>
            </router-link>
            <a
              target="_blank"
              href="https://github.com/PanJiaChen/vue-element-admin/"
            >
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a
              target="_blank"
              href="https://panjiachen.github.io/vue-element-admin-site/#/"
            >
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
              <span style="display: block">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Hamburger from "@/components/Hamburger/index.vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Search from "@/components/HeaderSearch/index.vue";
import Screenfull from "@/components/Screenfull/index.vue";
import SizeSelect from "@/components/SizeSelect/index.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router"; // 引入 useRoute
import { ArrowDownBold } from "@element-plus/icons-vue";
// 获取 Vuex store
const store = useStore();
const route = useRoute();
const router = useRouter();
// 计算属性
const sidebar = computed(() => store.getters.sidebar);
const avatar = computed(() => store.getters.avatar);
const device = computed(() => store.getters.device);

const toggleSideBar = () => {
  store.dispatch("app/toggleSideBar");
};

const logout = async () => {
  await store.dispatch("user/logout");
  router.push(`/login?redirect=${route.fullPath}`);
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
  .nav-right {
    display: flex;
    align-items: center;
    .right-menu-item {
      padding: 0 8px;
      color: #5a5e66;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .avatar-container {
      margin-right:8px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin-right: 12px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
