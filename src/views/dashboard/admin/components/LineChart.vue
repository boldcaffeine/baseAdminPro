<template>
  <div class="chart-container">
    <div ref="chartContainer" class="chart-box"></div>
  </div>
</template>

<script setup>
import { ref, shallowRef, onMounted } from "vue";
import * as echarts from "echarts"; // 假设我们使用 ECharts 作为图表库
import useResizeHandler from "./mixins/useResizeHandler.ts";
const chartContainer = ref(null); // 绑定图表 DOM 容器
const chartInstance = shallowRef(null); // 图表实例
useResizeHandler(chartInstance);
onMounted(() => {
  if (chartContainer.value) {
    chartInstance.value = echarts.init(chartContainer.value); // 初始化图表
    const option = {
      title: {
        text: "ECharts 示例图表",
      },
      tooltip: {},
      xAxis: {
        data: ["苹果", "香蕉", "橙子", "葡萄", "梨"],
      },
      animation: true,
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10],
        },
      ],
    };
    chartInstance.value.setOption(option); // 设置图表数据
  }
  // 使用 resizeHandler，自动处理窗口和侧边栏变化
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
