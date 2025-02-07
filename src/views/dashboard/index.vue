<template>
  <div class="dashboard-container">
    {{ message }}
  </div>
</template>

<script setup>
import { ref } from "vue";

let message = ref("我是看板222");
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 16px;
//   background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
