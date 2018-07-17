<template>
  <el-table
    :data="tableData"
    height="100%"
    style="width: 100%">
    <el-table-column
      prop="pageName"
      label="页面">
    </el-table-column>
    <el-table-column
      prop="url"
      label="链接">
    </el-table-column>
  </el-table>
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
      tableData: [{
        pageName: '首页',
        url: '/'
      }, {
        pageName: '导航',
        url: '/#/map'
      }]
    };
  }
};
</script>
