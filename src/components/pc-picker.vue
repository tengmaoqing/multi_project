<template>
  <div>
    <list ></list>
  </div>
</template>

<script type="text/javascript">
import List from './list';

export default {
  props: {
    list: Array,
    value: Array,
  },
  computed: {
    currentValue: {
      get: function () {
        return this.value;
      },
      set: function (val) {
        this.$emit('input', val);
      }
    }
  },
  components: {
    List
  },
  methods: {
  }
};
</script>
