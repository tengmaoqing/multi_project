<template>
  <section class="pannel clearfix">
    <label class="label text-muted" :class="{'hidden-xs': hidexs}">
      {{ label }}
    </label><div class="pannel-body" :style="{'vertical-align': bodyPosition}">
      <slot></slot>
    </div>
  </section>
</template>

<style type="text/css" scoped>
@import 'config.css';

.pannel {
  margin-bottom: 16px;
}
.label {
  width: 7em;
  display: inline-block;
  position: relative;
  margin-right: 0;
  min-height: 1px;
}

.pannel-body {
  display: inline-block;
}

@media (--sm-viewport) {
  .pannel {
    margin-bottom: 0;
  }
  .label {
    margin-bottom: $global-spacer-md;
  }
  .label, .pannel-body {
    display: block;
  }
}
</style>

<script type="text/javascript">
export default {
  props: {
    label: String,
    hidexs: Boolean,
    bodyPosition: {
      type: String,
      default: 'middle'
    }
  }
};
</script>
