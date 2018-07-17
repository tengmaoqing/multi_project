<template>
  <header class="cascader-menu">
    <ul class="cascader-wapper clearfix">
      <li class="menu-item" v-for="(t, i) in titles" :key="i" :class="
      [{
        'is-disabled': !lists[i],
        'is-active': i === current,
      }]" @click="titleClick(i)">{{t}}</li>
    </ul>
  </header>
</template>

<style type="text/css">

.cascader-wapper {
  display: flex;
  justify-content: space-between;
}

.cascader-menu {
  background-color: #f5f5f5;

  .menu-item {
    flex: 1;
    display: inline-block;
    width: 50px;
    padding: 10px 15px;
    text-align: center;
    cursor: pointer;

    &.is-active {
      background-color: #fff;
    }
  }

}
</style>

<script type="text/javascript">
export default {
  props: {
    titles: Array,
    lists: {
      type: Array,
      default () {
        return [];
      }
    },
    current: Number
  },
  methods: {
    titleClick (i) {
      if (!this.lists[i]) {
        return;
      }
      // this.current = i;
      this.$emit('switch', i);
    }
  }
};
</script>
