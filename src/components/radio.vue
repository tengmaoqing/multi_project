<template>
  <label class="hsb-radio"
    :class="
      [{ 'is-disabled': disabled },
      { 'is-focus': focus },
      { 'is-checked': model === label }]
    "
  >
    <span class="hsb-radio__input"
        :class="{
            'is-disabled': disabled,
            'is-checked': model === label
        }"
    >
      <span class="hsb-radio__inner"></span>
      <input
          class="hsb-radio__original"
          :value="label"
          type="radio"
          v-model="model"
          @focus="focus = true"
          @blur="focus = false"
          @change="handleChange"
          :name="name"
          :disabled="disabled"
          tabindex="-1"
        >
    </span>
    <span class="hsb-radio__label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<style scope>
  .hsb-radio__original {
    position: absolute;
    opacity: 0;
  }

  .hsb-radio__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
  }

  .hsb-radio__inner {
    display: inline-block;
    position: relative;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #fff;
    border: 2px solid #f2f2f2;
    vertical-align: middle;

    &::after {
      content: "";
      background-color: #fff;
      width: 4px;
      height: 4px;
      z-index: 10;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform .15s cubic-bezier(.71,-.46,.88,.6);
    }
  }

  .hsb-radio {
    position: relative;
  }

  .hsb-radio.is-focus .hsb-radio__inner {
    border-color: #409eff;
  }

  .hsb-radio.is-checked {

    color: #409eff;
    .hsb-radio__inner {
      border-color: #409eff;
      background-color: #409eff;
      &::after {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
</style>

<script type="text/javascript">
export default {
  data () {
    return {
      focus: false
    };
  },
  props: {
    value: String,
    label: String,
    disabled: Boolean,
    name: String
  },
  computed: {
    model: {
      get () {
        return this.value;
      },
      set (val) {
        this.$emit('input', val);
      }
    }
  },
  methods: {
    handleChange () {
      this.$nextTick(() => {
        this.$emit('change', this.model);
      });
    }
  }
};
</script>
