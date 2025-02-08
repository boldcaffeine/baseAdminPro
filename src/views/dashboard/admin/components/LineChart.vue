<template>
  <div class="chart-container">
    <div ref="chartContainer" class="chart-box"></div>
  </div>
</template>

<script setup>
import { shallowRef, onMounted, ref, watch, nextTick } from "vue";
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
  chartData: {
    type: Object,
    required: true,
  },
});

const chartContainer = ref(null); // 绑定图表 DOM 容器
const chartInstance = shallowRef(null); // 图表实例
useResizeHandler(chartInstance);
// Methods
const initChart = () => {
  if (chartContainer.value) {
    chartInstance.value = echarts.init(chartContainer.value); // 初始化图表
    setOptions(props.chartData);
  }
};

const setOptions = ({ expectedData, actualData } = {}) => {
  if (!chartInstance.value) return;

  chartInstance.value.setOption({
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      boundaryGap: false,
      axisTick: {
        show: false,
      },
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 20,
      top: 30,
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      padding: [5, 10],
    },
    yAxis: {
      axisTick: {
        show: false,
      },
    },
    legend: {
      data: ["expected", "actual"],
    },
    series: [
      {
        name: "expected",
        lineStyle: {
          color: "#FF005A",
          width: 2,
        },
        itemStyle: {
          color: "#FF005A",
        },
        smooth: true,
        type: "line",
        data: expectedData,
        animationDuration: 2800,
        animationEasing: "cubicInOut",
      },
      {
        name: "actual",
        lineStyle: {
          color: "#3888fa",
          width: 2,
        },
        itemStyle: {
          color: "#3888fa",
        },
        areaStyle: {
          color: "#f3f8ff",
        },
        smooth: true,
        type: "line",
        data: actualData,
        animationDuration: 2800,
        animationEasing: "quadraticOut",
      },
    ],
  });
};

onMounted(() => {
  nextTick(() => {
    initChart();
  });
});

// Watchers
watch(
  () => props.chartData,
  (newVal) => {
    setOptions(newVal);
  },
  { deep: true }
);
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
