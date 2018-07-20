<template>
  <section class="state">
    <el-table
      :data="list"
      height="100%"
      size="mini"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="name"
        label="新盘">
      </el-table-column>
      <el-table-column
        prop="address"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="address"
        label="客户">
      </el-table-column>
      <el-table-column
        prop="address"
        label="提示">
      </el-table-column>
    </el-table>
    <div class="sticky actions text-white bg-primary">
      <div class="item">
        快捷报备
      </div>
      <div class="item">
        现场经理
      </div>
      <router-link to="/newCustomer" class="item">
        新客户报备
      </router-link>
      <div class="item">
        成交申报
      </div>
      <div class="item">
        查看
      </div>
    </div>
  </section>
</template>

<script>
import { Table, TableColumn } from 'element-ui';
export default {
  components: {
    elTable: Table,
    elTableColumn: TableColumn
  },
  data () {
    return {
      list: []
    };
  }
};
</script>

<style scoped>
.state {
  position: relative;
  height: calc(100% - 50px);
}

.actions {
  display: flex;
  width: 100%;
}

.item {
  padding: 10px;
}
</style>
