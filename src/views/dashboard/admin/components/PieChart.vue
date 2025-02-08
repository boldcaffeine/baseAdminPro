<template>
  <div class="chart-container">
    <div ref="chartContainer" class="chart-box"></div>
  </div>
</template>

<script setup>
import { shallowRef, onMounted, ref, nextTick } from "vue";
import * as echarts from "echarts"; // 假设我们使用 ECharts 作为图表库
import useResizeHandler from "./mixins/useResizeHandler.ts";

// Props
const props = defineProps({
  className: {
    type: String,
    default: "chart",
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "350px",
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
});

const animationDuration = 3000;
const chartContainer = ref(null); // 绑定图表 DOM 容器
const chartInstance = shallowRef(null); // 图表实例
useResizeHandler(chartInstance);
// Methods
const initChart = () => {
  if (chartContainer.value) {
    chartInstance.value = echarts.init(chartContainer.value); // 初始化图表
    setOptions();
  }
};

const setOptions = () => {
  if (!chartInstance.value) return;

  chartInstance.value.setOption({
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      left: "center",
      bottom: "10",
      data: ["Industries", "Technology", "Forex", "Gold", "Forecasts"],
    },
    series: [
      {
        name: "WEEKLY WRITE ARTICLES",
        type: "pie",
        roseType: "radius",
        radius: [15, 95],
        center: ["50%", "38%"],
        data: [
          { value: 320, name: "Industries" },
          { value: 240, name: "Technology" },
          { value: 149, name: "Forex" },
          { value: 100, name: "Gold" },
          { value: 59, name: "Forecasts" },
        ],
        animationEasing: "cubicInOut",
        animationDuration: 2600,
      },
    ],
  });
};

onMounted(() => {
  nextTick(() => {
    initChart();
  });
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-box {
  width: 100%;
  height: 400px;
}
</style>
