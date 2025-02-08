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
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      top: 10,
      left: "2%",
      right: "2%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "pageA",
        type: "bar",
        stack: "vistors",
        barWidth: "60%",
        data: [79, 52, 200, 334, 390, 330, 220],
        animationDuration,
      },
      {
        name: "pageB",
        type: "bar",
        stack: "vistors",
        barWidth: "60%",
        data: [80, 52, 200, 334, 390, 330, 220],
        animationDuration,
      },
      {
        name: "pageC",
        type: "bar",
        stack: "vistors",
        barWidth: "60%",
        data: [30, 52, 200, 334, 390, 330, 220],
        animationDuration,
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
