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
    radar: {
      radius: "66%",
      center: ["50%", "42%"],
      splitNumber: 8,
      splitArea: {
        areaStyle: {
          color: "rgba(127,95,132,.3)",
          opacity: 1,
          shadowBlur: 45,
          shadowColor: "rgba(0,0,0,.5)",
          shadowOffsetX: 0,
          shadowOffsetY: 15,
        },
      },
      indicator: [
        { name: "Sales" },
        { name: "Administration" },
        { name: "Information Technology" },
        { name: "Customer Support" },
        { name: "Development" },
        { name: "Marketing" },
      ],
    },
    legend: {
      left: "center",
      bottom: "10",
      data: ["Allocated Budget", "Expected Spending", "Actual Spending"],
    },
    series: [
      {
        type: "radar",
        symbolSize: 0,
        areaStyle: {
          shadowBlur: 13,
          shadowColor: "rgba(0,0,0,.2)",
          shadowOffsetX: 0,
          shadowOffsetY: 10,
          opacity: 1,
        },
        data: [
          {
            value: [5000, 7000, 1200, 1100, 1500, 1400],
            name: "Allocated Budget",
          },
          {
            value: [4000, 900, 1000, 1500, 1300, 1100],
            name: "Expected Spending",
          },
          {
            value: [5500, 1100, 1200, 1500, 1200, 1200],
            name: "Actual Spending",
          },
        ],
        animationDuration: animationDuration,
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
