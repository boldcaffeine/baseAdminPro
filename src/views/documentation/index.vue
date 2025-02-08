<template>
  <div class="app-content">
    <el-table :data="list" style="width: 100%; padding-top: 15px">
      <el-table-column label="Order_No" min-width="200">
        <template #default="scope">
          {{ scope.row.order_no }}
        </template>
      </el-table-column>
      <el-table-column label="Price" width="195" align="center">
        <template #default="scope"> ¥{{ scope.row.price }} </template>
      </el-table-column>
      <el-table-column label="Status" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="statusFilter(row.status)">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { transactionList } from "@/api/remote-search";

const list = ref(null);

const statusFilter = (status) => {
  const statusMap = {
    success: "success",
    pending: "danger",
  };
  return statusMap[status];
};

const fetchData = async () => {
  let result = await transactionList();
  list.value = result.data.items.slice(0, 8);
};

onMounted(() => {
  fetchData();
});
</script>

<style lang="scss" scoped>
/* Add any necessary styles here */
.app-content {
  background: #f0f2f5;
  padding: 16px;
}
</style>
