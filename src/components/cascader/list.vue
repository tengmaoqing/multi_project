<template>
  <ul v-show="list.length" class="cascader-list">
    <li v-for="(item, index) in list" :key="index" class="cascader-list-item" :class="{'is-active': currentValue && item[props.value] === currentValue[props.value]}" @click="itemClick(item)">{{ item[props.label] }}</li>
  </ul>
</template>

<style type="text/css">

.is-title-mode .cascader-list {
  width: 100%;
}

.cascader-list {
  display: inline-block;
  vertical-align: top;
  overflow: auto;
  height: 200px;
  width: 100px;
  padding: 8px 0;
}

.cascader-list-item {
  padding: 8px 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  &.is-active {
    background-color: #f5f5f5;
    /*color: #fff;*/
  }
}
</style>

<script type="text/javascript">

export default {
  props: {
    initList: Array,
    props: {
      type: Object,
      default () {
        return {
          value: 'value',
          label: 'label',
          children: 'children'
        };
      }
    },
    list: Array,
    value: Object
  },

  computed: {
    currentValue: {
      get () {
        return this.value;
      },

      set (v) {
        this.$emit('input', v);
      }
    }
  },

  methods: {
    itemClick (item) {
      if (item !== this.currentValue) {
        this.currentValue = item;
        this.$emit('change', item);
      }
    }
  }
};
</script>
