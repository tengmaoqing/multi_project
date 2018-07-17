<template>
  <div class="error-wrap" :class="{'is-error': error}">
    <slot></slot>
    <span class="error-info" v-if="error">{{ errorMsg }}</span>
  </div>
</template>

<style type="text/css" scoped>
@import 'config.css';

.error-wrap {
  display: inline-block;
  position: relative;
  font-size: $global-description;
}

.is-error /deep/ .el-input__inner {
  border-color: $global-danger-color;
}

.error-info {
  color: $global-danger-color;
  position: absolute;
  left: 0;
  top: 101%;
}

@media (--sm-viewport) {
  .error-wrap {
    width: 100%;
  }
}
</style>

<script type="text/javascript">
export default {
  props: {
    error: Boolean,
    errorMsg: String
  }
};
</script>
