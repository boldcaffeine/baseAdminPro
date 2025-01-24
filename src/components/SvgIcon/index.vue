<template>
  <i :class="svgClass">
    <svg aria-hidden="true">
      <use :xlink:href="symbolId" />
    </svg>
  </i>
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

<style lang="scss" scoped>
.svg-icon {
  display: inline-flex;
  justify-content: center;
  width: 1em;
  height: 1em;
  line-height: 1em;
  --color: inherit;
  align-items: center;
  position: relative;
  fill: currentColor;
  color: var(--color);
  overflow: hidden;
  svg {
    width: 1em;
    height: 1em;
  }
}
</style>
