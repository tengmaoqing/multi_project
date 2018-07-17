<template>
  <div class="picker" v-show="visieble">
    <div class="picker-toolbar">
      <div class="picker-toolbar-left">取消</div>
      <div class="picker-toolbar-center">请选择</div>
      <div class="picker-toolbar-left" @click="ensure">确认</div>
    </div>
    <div class="picker-values">
      <span
        @click="changeCol(index)"
        class="picker-value"
        v-for="(item, index) in values"
        v-if="values[index][indexs[index]]"
        :key="index">{{ values[index][indexs[index]]['name'] }}</span>
    </div>
    <div class="picker-cols">
      <div class="picker-col"
        v-for="(item, index) in values"
        v-if="values.length === index+1"
        :key="index">
          <div class="picker-items">
            <div class="picker-item"
            v-for="(item, index) in item"
            @click="handlePicer(item, index)"
            :key="index">{{ item.name }}</div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'picker',
  props: {
    visieble: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      list: [{
        name: '北京',
        sub: [{
          name: '东城区'
        }, {
          name: '王井府'
        }]
      }, {
        name: '上海',
        sub: [{
          name: '松江区'
        }, {
          name: '浦东区'
        }]
      }],
      values: [],
      indexs: []
    };
  },
  methods: {
    handlePicer (item, index) {
      this.indexs[this.values.length - 1] = index;
      this.indexs = [].concat(this.indexs);
      if (item.sub && item.sub.length) {
        this.values.push(item.sub);
      }
    },
    changeCol (index) {
      index = index + 1;
      this.values.splice(index);
      this.indexs.splice(index);
      this.values = [].concat(this.values);
      this.indexs = [].concat(this.indexs);
    },
    ensure () {
      console.log(this.values);
      console.log(this.indexs);
    }
  },
  mounted () {
    this.values.push(this.list);
  }
};
</script>

<style scoped>
.picker-toolbar {
  position: relative;
  display: flex;
  height: 46px;
  line-height: 46px;
  text-align: center;
  justify-content: space-between;
  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: " ";
    height: 1px;
    width: 100%;
    background-color: #ddd;
    transform: scaleY(.5);
  }
}

.picker-items {
  height: 180px;
  overflow: scroll;
  scroll-behavior: smooth;
}

.picker-item {
  height: 30px;
  padding: 0 10px;
  line-height: 30px;
}

.picker-values {
  height: 30px;
  padding: 0 10px;
  line-height: 30px;
}

.picker-value {
  margin-right: 6px;
}

.picker-toolbar {
  padding: 0 10px;
}
</style>
