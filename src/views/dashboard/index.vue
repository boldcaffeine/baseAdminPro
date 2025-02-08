<template>
  <div class="dashboard-container">
     <adminDashboard></adminDashboard>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import adminDashboard from './admin/index.vue'


// 获取 Vuex store
const store = useStore()

// 使用 ref 来管理 currentRole


// 使用 computed 获取 roles
const roles = computed(() => store.getters.roles)


</script>

<style scoped>
/* 你可以在这里添加样式 */
</style>
