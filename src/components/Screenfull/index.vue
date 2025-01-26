<template>
    <div>
      <svg-icon
        :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
        @click="click"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import screenfull from 'screenfull';

  import { ElMessage } from 'element-plus'
  
  // 定义状态
  const isFullscreen = ref(false);

  
  // 初始化
  const init = () => {
    if (screenfull.isEnabled) {
      screenfull.on('change', change);
    }
  };
  
  // 变更回调
  const change = () => {
    isFullscreen.value = screenfull.isFullscreen;
  };
  
  // 销毁
  const destroy = () => {
    if (screenfull.isEnabled) {
      screenfull.off('change', change);
    }
  };
  
  // 点击事件
  const click = () => {
    if (!screenfull.isEnabled) {
        ElMessage({
        message: 'Your browser cannot work with fullscreen.',
        type: 'warning',
      });
      return false;
    }
    screenfull.toggle();
  };
  
  // 生命周期钩子
  onMounted(() => {
    init();
  });
  
  onBeforeUnmount(() => {
    destroy();
  });
  </script>
  
  <style scoped>
  .screenfull-svg {
    display: inline-block;
    cursor: pointer;
    fill: #5a5e66;
    width: 20px;
    height: 20px;
    vertical-align: 10px;
  }
  </style>
  