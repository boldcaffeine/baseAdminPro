<template>
    <div>我是首页{{doneTodosCount}}</div>
</template>

<script setup>

import { computed } from 'vue';
import { useStore } from 'vuex'

const store = useStore()

const doneTodosCount = computed(() => {
  return store.state.count
})
console.log(store.state,'store.state')
console.log(store.getters,'store.getters')

</script>
