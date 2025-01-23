<template>
  <svg aria-hidden="true" :class="svgClass">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

  <script setup>
import { computed } from "vue";

const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#333",
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const svgClass = computed(() => {
  return props.name ? `svg-icon ${props.name}` : "svg-icon";
});
</script>
  

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
