<template>
  <el-table
    :data="data"
    :height="layout.height"
    :border="layout.border"
    style="width: 100%">
    <el-table-column
      v-for="(item, index) in layout.cols"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      :formatter="item.formatter"
      >
    </el-table-column>
  </el-table>
</template>

<script type="text/javascript">
import { Table, TableColumn } from 'element-ui';

export default {
  components: {
    'el-table': Table,
    'el-table-column': TableColumn
  },
  props: {
    layout: {
      type: Object,
      default () {
        return {
          border: true,
          height: 300,
          cols: [{
            prop: 'date',
            label: '日期',
            width: ''
          }, {
            prop: 'name',
            label: '姓名',
            width: '',
            formatter (row, column) {
              return row.name + row.date;
            }
          }]
        };
      }
    },
    data: {
      type: Array,
      default () {
        return [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }];
      }
    }
  }
};
</script>
