<template>
  <div>
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
          <span
            v-if="
              item.redirect === 'noRedirect' || index == levelList.length - 1
            "
            class="no-redirect"
            >{{ item.meta.title }}</span
          >
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { compile } from "path-to-regexp";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router"; // 引入 useRoute

// Get the store
const store = useStore();

// 通过 useRoute 获取路由信息
const route = useRoute();
const router = useRouter();

let levelList = ref(null);

// 4. 获取面包屑数据的方法
function getBreadcrumb() {
  let matched = route.matched.filter((item) => item.meta && item.meta.title);
  const first = matched[0];

  if (!isDashboard(first)) {
    matched = [{ path: "/dashboard", meta: { title: "Dashboard" } }].concat(
      matched
    );
  }

  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
}

// 5. 判断是否为 Dashboard 路由
function isDashboard(route) {
  const name = route && route.name;
  if (!name) {
    return false;
  }
  return name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase();
}

// 6. 编译路径
function pathCompile(path) {
  const { params } = route;
  const toPath = compile(path);
  return toPath(params);
}

// 7. 处理点击链接
function handleLink(item) {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect);
    return;
  }
  router.push(pathCompile(path));
}

// 3. 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    if (newPath.startsWith("/redirect/")) {
      return;
    }
    getBreadcrumb();
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  font-size: 14px;
  padding: 18px 0;
}
</style>
