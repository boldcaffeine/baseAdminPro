<template>
  <div :class="{ show: show }" class="header-search">
    <svg-icon name="search" @click.stop="click" />
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option
        v-for="subItem in options"
        :key="subItem.item.path"
        :value="subItem.item"
        :label="subItem?.item?.title.join(' > ')"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick, computed } from "vue";
import Fuse from "fuse.js";
import path from "path-browserify";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

// 1. 定义响应式变量
let fuse = ref(null);
const search = ref("");
const options = ref([]);
const searchPool = ref([]);
const show = ref(false);
const headerSearchSelect = ref(null);

// 2. 获取当前路由和路由器实例
const route = useRoute();
const router = useRouter();
const store = useStore();

// 3. 计算属性
const routes = computed(() => store.getters.permission_routes);

const activeMenu = computed(() => {
  const { meta, path } = route;
  return meta.activeMenu || path;
});

// 4. 监听路由变化
watch(
  () => routes.value,
  () => {
    searchPool.value = generateRoutes(routes.value);
  }
);

// 5. 监听搜索池变化并初始化 Fuse 实例
watch(searchPool, (list) => {
  initFuse(list);
});

// 6. 监听 show 变量，控制点击关闭逻辑
watch(show, (value) => {
  if (value) {
    document.body.addEventListener("click", close);
  } else {
    document.body.removeEventListener("click", close);
  }
});

// 7. 获取面包屑数据
onMounted(() => {
  searchPool.value = generateRoutes(routes.value);
});

// 8. 点击事件，控制搜索框显示
function click() {
  show.value = !show.value;
  if (show.value) {
    nextTick(() => {
      headerSearchSelect.value && headerSearchSelect.value.focus();
    });
  }
}

// 9. 关闭搜索框
function close() {
  headerSearchSelect.value && headerSearchSelect.value.blur();
  options.value = [];
  show.value = false;
}

// 10. 路径变化事件
function change(val) {
  const { path } = val;
  if (path !== activeMenu.value) {
    router.push(path);
  }
  search.value = "";
  options.value = [];
  nextTick(() => {
    show.value = false;
  });
}

// 11. 初始化 Fuse.js 搜索实例
function initFuse(list) {
  fuse.value = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      { name: "title", weight: 0.7 },
      { name: "path", weight: 0.3 },
    ],
  });
  let a = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      { name: "title", weight: 0.7 },
      { name: "path", weight: 0.3 },
    ],
  });
}

// 12. 生成面包屑路由
function generateRoutes(routes, basePath = "/", prefixTitle = []) {
  let res = [];

  for (const router of routes) {
    if (router.hidden) continue;

    const data = {
      path: path.resolve(basePath, router.path),
      title: [...prefixTitle],
    };

    if (router.meta && router.meta.title) {
      data.title = [...data.title, router.meta.title];
      if (router.redirect !== "noRedirect") {
        res.push(data);
      }
    }

    if (router.children) {
      const tempRoutes = generateRoutes(router.children, data.path, data.title);
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes];
      }
    }
  }

  return res;
}

// 13. 搜索查询
function querySearch(query) {
  if (query !== "") {
    options.value = fuse.value.search(query);
  } else {
    options.value = [];
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    :deep(.el-select__wrapper) {
      box-shadow: none;
      border-bottom: 1px solid var(--el-border-color);
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
