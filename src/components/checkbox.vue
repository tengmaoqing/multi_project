<template>
  <label
    class="hsb-checkbox"
    :class="[
      { 'is-disabled': disabled },
      { 'is-checked': isChecked }
    ]"
  >
    <span class="hsb-checkbox__input"
      :class="{
        'is-disabled': disabled,
        'is-checked': isChecked,
        'is-focus': focus
      }"
       aria-checked="mixed"
    >
      <span class="hsb-checkbox__inner"></span>
      <input
        v-if="trueLabel || falseLabel"
        class="hsb-checkbox__original"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false">
      <input
        v-else
        class="hsb-checkbox__original"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false">
    </span><span class="hsb-checkbox__label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<style type="text/css">

  .hsb-checkbox__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
  }

  .hsb-checkbox__label {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
  }

  .hsb-checkbox__original {
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    z-index: -1;
  }

  .hsb-checkbox {
    color: #606266;
    font-weight: 500;
    font-size: 14px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    user-select: none;

    .hsb-checkbox__inner {
        display: inline-block;
        position: relative;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        box-sizing: border-box;
        width: 18px;
        height: 18px;
        background-color: #fff;
        z-index: 1;
        transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);

      &::after {
        content: "";
        width: 3px;
        height: 7px;
        border: 2px solid #fff;
        border-left: 0;
        border-top: 0;
        z-index: 10;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg) scale(0);
        transition: transform .15s cubic-bezier(.71,-.46,.88,.6);
      }
    }

    &.is-checked {
      color: #409eff;

      .hsb-checkbox__inner {
        background-color: #409eff;
        border-color: #409eff;

        &::after {
          transform: translate(-50%, -50%) rotate(45deg) scale(1);
        }
      }
    }

  }
</style>

<script type="text/javascript">
export default {
  props: {
    value: {},
    label: {},
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number]
  },
  data () {
    return {
      selfModel: false,
      focus: false
    };
  },
  computed: {
    model: {
      get () {
        return this.value !== undefined ? this.value : this.selfModel;
      },

      set (val) {
        this.$emit('input', val);
        this.selfModel = val;
      }
    },
    isChecked () {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
    }
  },
  methods: {
    handleChange (ev) {
      let value;
      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit('change', value, ev);
    }
  }
};
</script>
