<template>
  <div>
    <ul class="c-list" v-for="(o, i) in list" :key="i">
      <li v-for="(item, i) in inner" :key="i" @click="doISelect(item)" :class="{'is-active': item === currentValue }">
        {{ item[label] }}
      </li>
    </ul>
  </div>
</template>

<style type="text/css" scoped>
  .c-list {
    width: 100px;
  }
</style>

<script type="text/javascript">
import { cloneDeep } from 'lodash';

export default {
  props: {
    labelStr: {
      type: String,
      default: 'label'
    },
    valueStr: {
      type: String,
      default: 'value'
    },
    childrenStr: {
      type: String,
      default: 'children'
    },
    value: Array,
    list: Array
  },
  data () {
    return {
      outer: []
    },
  },
  computed: {
    currentValue: {
      get () {
        return this.value;
      },
      set (val) {
        this.$emit('input', val);
      }
    },
  },
  watch: {
    list (v) {
      this.outer = v;
    }
  },
  methods: {
    reset () {
      this.currentValue = null;
      this.$emit('change', this.currentValue);
    },
    doISelect (item) {
      if (this.currentValue === item) {
        return;
      }
      this.currentValue = item;
      this.$emit('change', this.currentValue);
    }
  }
};
</script>
