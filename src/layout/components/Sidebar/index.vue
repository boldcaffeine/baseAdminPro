<template>
  <div :class="{ 'has-logo': showLogo }" class="page">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar>
      <el-menu
        :collapse="isCollapse"
        :default-active="activeMenu"
        active-text-color="#ffd04b"
        background-color="#304156"
        text-color="#bfcbd9"
        :unique-opened="false"
        :collapse-transition="false"
        router
        
      >
        <RecursiveMenu
          v-for="item in permissionRoutes"
          :key="item.path"
          :menu-item="item"
          :base-path="item.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router"; // 引入 useRoute
import Logo from "./Logo.vue";
import RecursiveMenu from "./RecursiveMenu.vue";


// Get the store
const store = useStore();
const route = useRoute(); // 通过 useRoute 获取路由信息

const showLogo = computed(() => store.state.settings.sidebarLogo);
const sidebar = computed(() => store.state.app.sidebar);
const permissionRoutes = computed(() => store.getters.permission_routes);
const isCollapse = computed(() => !sidebar.value.opened);
const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>
