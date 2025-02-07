<template>
  <template v-if="!menuItem.hidden">
    <template v-if="hasOneShowingChild(menuItem.children, menuItem)">
      <el-menu-item :index="resolvePath(onlyOneChild.path)">
        <svg-icon
          v-if="onlyOneChild.meta && onlyOneChild.meta.icon"
          :name="onlyOneChild.meta.icon"
        />
        <span> {{ onlyOneChild.meta.title }}</span>
      </el-menu-item>
    </template>
    <template v-else>
      <el-sub-menu :index="resolvePath(menuItem.path)">
        <template #title>
          
          <span>{{ menuItem.meta.title }}</span>
        </template>
        <recursive-menu
          v-for="child in menuItem.children"
          :key="child.index"
          :base-path="resolvePath(child.path)"
          :menu-item="child"
        />
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import path from "path-browserify";
import { isExternal } from "@/utils/validate";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
// Define props using defineProps
const props = defineProps({
  menuItem: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: "",
  },
});

// Define local reactive state using ref
const onlyOneChild = ref({});

// Method to check if there is one visible child
function hasOneShowingChild(children = [], parent) {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item;
      return true;
    }
  });

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  return false;
}

// Method to resolve the path
function resolvePath(routePath) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
}
</script>

<style lang="scss" scoped>
.el-menu-item {
  
  .svg-icon {
    font-size: 17px;
    width: 24px;
    margin-right: 5px;
  }
}
</style>
