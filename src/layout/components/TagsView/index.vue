<template>
  <div id="tags-view-container" class="tags-view-container">
    <el-scrollbar>
      <div class="scrollbar-flex-content">
        <router-link
          v-for="tag in visitedViews"
          ref="tagRef"
          :key="tag.path"
          :class="isActive(tag) ? 'active' : ''"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          class="tags-view-item"
          @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
          @contextmenu.prevent.native="openMenu(tag, $event)"
        >
          {{ tag.title }}
          <el-icon
            v-if="!isAffix(tag)"
            class="el-icon-close"
            @click.prevent.stop="closeSelectedTag(tag)"
          >
            <Close />
          </el-icon>
        </router-link>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
} from "vue";
import path from "path-browserify";

import { Close } from "@element-plus/icons-vue";

import { useStore } from "vuex";

import { useRoute, useRouter } from "vue-router"; // 引入 useRoute

// 通过 useRoute 获取路由信息
const route = useRoute();
const router = useRouter();

// 引入 Vuex store

const store = useStore();

// 响应式数据
const visible = ref(false);
const top = ref(0);
const left = ref(0);
const selectedTag = ref({});
const affixTags = ref([]);

// 计算属性
const visitedViews = computed(() => store.state.tagsView.visitedViews);
const routes = computed(() => store.state.permission.routes);

// 监听路由变化
watch(
  () => route,
  () => {
    addTags();
    moveToCurrentTag();
  }
);

// 监听菜单显示状态
watch(visible, (value) => {
  if (value) {
    document.body.addEventListener("click", closeMenu);
  } else {
    document.body.removeEventListener("click", closeMenu);
  }
});

// 初始化标签
onMounted(() => {
  initTags();
  addTags();
});

// 生命周期清理
onBeforeUnmount(() => {
  document.body.removeEventListener("click", closeMenu);
});

// 方法
const isActive = (r) => r.path === route.path;
const isAffix = (tag) => tag.meta && tag.meta.affix;

// 筛选固定标签
const filterAffixTags = (routes, basePath = "/") => {
  let tags = [];
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      });
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path);
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags];
      }
    }
  });
  return tags;
};

// 初始化标签
const initTags = () => {
  affixTags.value = filterAffixTags(routes.value);
  affixTags.value.forEach((tag) => {
    if (tag.name) {
      store.dispatch("tagsView/addVisitedView", tag);
    }
  });
};

// 添加标签
const addTags = () => {
  const { name } = route;
  if (name) {
    store.dispatch("tagsView/addView", route);
  }
};
let tagRef = ref(null);
let scrollPaneRef = ref(null);
// 移动到当前标签
const moveToCurrentTag = () => {
  const tags = tagRef.value;
  nextTick(() => {
    for (const tag of tags) {
      if (tag.to.path === route.path) {
        scrollPaneRef.value.moveToTarget(tag);
        if (tag.to.fullPath !== route.fullPath) {
          store.dispatch("tagsView/updateVisitedView", route);
        }
        break;
      }
    }
  });
};

// 刷新选中的标签
const refreshSelectedTag = (view) => {
  store.dispatch("tagsView/delCachedView", view).then(() => {
    const { fullPath } = view;
    nextTick(() => {
      router.replace({
        path: "/redirect" + fullPath,
      });
    });
  });
};

// 关闭选中的标签
const closeSelectedTag = (view) => {
  store.dispatch("tagsView/delView", view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view);
    }
  });
};

// 关闭其他标签
const closeOthersTags = () => {
  router.push(selectedTag.value);
  store.dispatch("tagsView/delOthersViews", selectedTag.value).then(() => {
    moveToCurrentTag();
  });
};

// 关闭所有标签
const closeAllTags = (view) => {
  store.dispatch("tagsView/delAllViews").then(({ visitedViews }) => {
    if (affixTags.value.some((tag) => tag.path === view.path)) {
      return;
    }
    toLastView(visitedViews, view);
  });
};

// 跳转到最后一个视图
const toLastView = (visitedViews, view) => {
  const latestView = visitedViews.slice(-1)[0];
  if (latestView) {
    router.push(latestView.fullPath);
  } else {
    if (view.name === "Dashboard") {
      router.replace({ path: "/redirect" + view.fullPath });
    } else {
      router.push("/");
    }
  }
};

// 打开右键菜单
const openMenu = (tag, e) => {
  const menuMinWidth = 105;
  const offsetLeft = $el.getBoundingClientRect().left;
  const offsetWidth = $el.offsetWidth;
  const maxLeft = offsetWidth - menuMinWidth;
  const leftPosition = e.clientX - offsetLeft + 15;

  left.value = leftPosition > maxLeft ? maxLeft : leftPosition;
  top.value = e.clientY;
  visible.value = true;
  selectedTag.value = tag;
};

// 关闭菜单
const closeMenu = () => {
  visible.value = false;
};

// 处理滚动
const handleScroll = () => {
  closeMenu();
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
  }
}

.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 32spx;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
.el-icon-close {
  position: relative;
  top: 2px;
}
.tags-view-item {
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 4px;
  &:first-of-type {
    margin-left: 15px;
  }
  &:last-of-type {
    margin-right: 15px;
  }
  &.active {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;
    &::before {
      content: "";
      background: #fff;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
      margin-right: 2px;
    }
  }
}
</style>
