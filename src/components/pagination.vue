<template>
  <ul class="pager-list">
    <li class="pager-item" v-show="current != 1">
      <a href="javascript:;void(0)" @click="setPageIndex(1)">首页</a>
    </li>
    <li class="pager-item" v-show="current != 1">
      <a href="javascript:;void(0)" @click="setPageIndex(current - 1)">上一页</a>
    </li>
    <li class="pager-item" v-for="item in grouplist" :key="item.val" :class="{'is-active':current == item.val}">
      <a href="javascript:;void(0)" @click="setPageIndex(item.val)"> {{ item.text }} </a>
    </li>
    <li class="pager-item" v-show="current != page && page != 0">
      <a href="javascript:;void(0)" @click="setPageIndex(current + 1)">下一页</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageIndex: {
      type: Number,
      default: 10
    },
    pagegroup: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      current: this.pageIndex
    };
  },
  computed: {
    page () {
      return Math.ceil(this.total / this.pageSize);
    },
    grouplist () {
      let len = this.page;
      let temp = [];
      let list = [];
      let count = Math.floor(this.pagegroup / 2);
      let center = this.current;
      if (len < this.pagegroup) {
        while (len--) {
          temp.push({
            val: this.page - len,
            text: this.page - len
          });
        }
        return temp;
      }
      while (len--) {
        temp.push(this.page - len);
      };

      let index = temp.indexOf(center);
      (index < count) && (center = center + count - index);
      (this.current > this.page - count) && (center = this.page - count);
      temp = temp.splice(center - count - 1, this.pagegroup);
      do {
        let t = temp.shift();
        list.push({
          text: t,
          val: t
        });
      } while (temp.length);
      if (this.page > this.pagegroup) {
        (this.current > count + 1) && list.unshift({
          text: '...',
          val: list[0].val - 1
        });
        (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
      }
      return list;
    }
  },
  methods: {
    setPageIndex (index) {
      if (this.current !== index && index > 0 && index < this.page + 1) {
        this.current = index;
        this.$emit('current-change', index);
      }
    }
  }
};
</script>

<style>
.pager-list {
  font-size: 0;
  text-align: center;
}
.pager-item {
  display: inline-block;
  margin: 0 10px;
  a {
    font-size: 14px;
  }
}
</style>
