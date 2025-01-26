<template>
  <el-dropdown trigger="click" @command="handleSetSize">
      <svg-icon name="size" />
    <template #dropdown>
      <el-dropdown-menu >
        <el-dropdown-item
          v-for="item of sizeOptions"
          :key="item.value"
          :disabled="size === item.value"
          :command="item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed,nextTick } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

// 定义响应式的 sizeOptions
const sizeOptions = [
  { label: "Default", value: "default" },
  { label: "Medium", value: "medium" },
  { label: "Small", value: "small" },
  { label: "Mini", value: "mini" },
];
1;

// 计算属性 size
const size = computed(() => store.getters.size);

// 设置大小的方法
const handleSetSize = (size) => {
  store.dispatch("app/setSize", size);
  refreshView();
  // 显示消息
  store.dispatch("app/showMessage", {
    message: "Switch Size Success",
    type: "success",
  });
};

// 刷新视图的方法
const refreshView = () => {
  // 重新渲染已缓存的页面
  store.dispatch("tagsView/delAllCachedViews", route);

  const { fullPath } = route;

  nextTick(() => {
    router.replace({
      path:fullPath,
    });

  });
};
</script>
