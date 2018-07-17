<template>
  <div class="wrap" :class="{opening: cV}" @click="cV = !cV">
    <i class="item"></i>
    <i class="item"></i>
    <i class="item"></i>
  </div>
</template>

<style scoped type="text/css">

.wrap {
  width: 20px;
  font-size: 0;
}

.item {
  width: 100%;
  display: inline-block;
  height: 1px;
  background-color: #fff;
  margin: 4px 0;
  transform-origin: 0% 0%;
  transition: all .4s;
}

.opening {
  .item:nth-child(1) {
    transform: rotate(45deg) translate(5px, 0px);
  }

  .item:nth-child(2) {
    opacity: 0;
    visibility: hidden;
  }

  .item:nth-child(3) {
    transform: rotate(-45deg) translate(2px, 1px);
  }
}
</style>

<script type="text/javascript">

export default {

  props: {
    value: Boolean
  },

  computed: {
    cV: {
      get () {
        return this.value;
      },
      set (v) {
        this.$emit('input', v);
      }
    }
  }
};
</script>
