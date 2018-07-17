<template>
  <div :class="[
    type === 'textarea' ? 'el-textarea' : 'el-input',
    inputSize ? 'el-input--' + inputSize : '',
    {
      'is-disabled': disabled,
      'is-focused': focused,
      'el-input-group': $slots.prepend || $slots.append,
      'el-input-group--append': $slots.append,
      'el-input-group--prepend': $slots.prepend,
      'el-input--prefix': $slots.prefix || prefixIcon,
      'el-input--suffix': $slots.suffix || suffixIcon
    }
    ]"
    @focuse="focused = true"
    @blur="focused = false"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="el-input-group__prepend" v-if="$slots.prepend"  :tabindex="pretabindex">
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="el-input__inner"
        v-bind="$props"
        :autocomplete="autoComplete"
        :value="currentValue"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      >
      <!-- 前置内容 -->
      <span class="el-input__prefix" v-if="$slots.prefix || prefixIcon" :style="prefixOffset">
        <slot name="prefix"></slot>
        <i class="el-input__icon"
           v-if="prefixIcon"
           :class="prefixIcon">
        </i>
      </span>
      <!-- 后置内容 -->
      <span
        class="el-input__suffix"
        v-if="$slots.suffix || suffixIcon || showClear || validateState && needStatusIcon"
        :style="suffixOffset">
        <span class="el-input__suffix-inner">
          <template v-if="!showClear">
            <slot name="suffix"></slot>
            <i class="el-input__icon"
              v-if="suffixIcon"
              :class="suffixIcon">
            </i>
          </template>
          <i v-else
            class="el-input__icon el-icon-circle-close el-input__clear"
            @click="clear"
          ></i>
        </span>
        <i class="el-input__icon"
          v-if="validateState"
          :class="['el-input__validateIcon', validateIcon]">
        </i>
      </span>
      <!-- 后置元素 -->
      <div class="el-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      :tabindex="tabindex"
      class="el-textarea__inner"
      :value="currentValue"
      @input="handleInput"
      ref="textarea"
      v-bind="$props"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    >
    </textarea>
  </div>
</template>
<script>
export default {
  name: 'ElInput',

  componentName: 'ElInput',

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  data () {
    return {
      currentValue: this.value,
      // textareaCalcStyle: {},
      prefixOffset: null,
      suffixOffset: null,
      hovering: false,
      focused: false
    };
  },

  props: {
    value: [String, Number],
    placeholder: String,
    size: String,
    resize: String,
    name: String,
    form: String,
    id: String,
    maxlength: Number,
    minlength: Number,
    readonly: Boolean,
    autofocus: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    rows: {
      type: Number,
      default: 2
    },
    autoComplete: {
      type: String,
      default: 'off'
    },
    max: {},
    min: {},
    step: {},
    validateEvent: {
      type: Boolean,
      default: true
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    tabindex: String,
    pretabindex: {
      type: String,
      default: '0'
    }
  },

  computed: {
    _elFormItemSize () {
      return (this.elFormItem || {}).elFormItemSize;
    },
    validateState () {
      return this.elFormItem ? this.elFormItem.validateState : '';
    },
    needStatusIcon () {
      return this.elForm ? this.elForm.statusIcon : false;
    },
    validateIcon () {
      return {
        validating: 'el-icon-loading',
        success: 'el-icon-circle-check',
        error: 'el-icon-circle-close'
      }[this.validateState];
    },
    textareaStyle () {
      return { resize: this.resize };
    },
    inputSize () {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    isGroup () {
      return this.$slots.prepend || this.$slots.append;
    },
    showClear () {
      return this.clearable && this.currentValue !== '' && (this.focused || this.hovering);
    }
  },

  watch: {
    value (val, oldValue) {
      this.setCurrentValue(val);
    }
  },

  methods: {
    focus () {
      (this.$refs.input || this.$refs.textarea).focus();
    },
    getMigratingConfig () {
      return {
        props: {
          'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
          'on-icon-click': 'on-icon-click is removed.'
        },
        events: {
          'click': 'click is removed.'
        }
      };
    },
    handleBlur (event) {
      this.focused = false;
      this.$emit('blur', event);
    },
    inputSelect () {
      (this.$refs.input || this.$refs.textarea).select();
    },
    // resizeTextarea() {
    //   if (this.$isServer) return;
    //   var { autosize, type } = this;
    //   if (type !== 'textarea') return;
    //   if (!autosize) {
    //     this.textareaCalcStyle = {
    //       minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
    //     };
    //     return;
    //   }
    //   const minRows = autosize.minRows;
    //   const maxRows = autosize.maxRows;

    //   this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
    // },
    handleFocus (event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    handleInput (event) {
      const value = event.target.value;
      this.$emit('input', value);
      this.setCurrentValue(value);
    },
    handleChange (event) {
      this.$emit('change', event.target.value);
    },
    setCurrentValue (value) {
      if (value === this.currentValue) return;
      // this.$nextTick(_ => {
      //   this.resizeTextarea();
      // });
      this.currentValue = value;
    },
    calcIconOffset (place) {
      const pendantMap = {
        'suf': 'append',
        'pre': 'prepend'
      };

      const pendant = pendantMap[place];

      if (this.$slots[pendant]) {
        return { transform: `translateX(${place === 'suf' ? '-' : ''}${this.$el.querySelector(`.el-input-group__${pendant}`).offsetWidth}px)` };
      }
    },
    clear () {
      this.$emit('input', '');
      this.$emit('change', '');
      this.setCurrentValue('');
      this.focus();
    }
  },

  created () {
    this.$on('inputSelect', this.inputSelect);
  },

  mounted () {
    // this.resizeTextarea();
    if (this.isGroup) {
      this.prefixOffset = this.calcIconOffset('pre');
      this.suffixOffset = this.calcIconOffset('suf');
    }
  }
};
</script>

<style type="text/css">
.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
}

.el-input__inner:hover {
    border-color: #c0c4cc;
}

.is-focused .el-input__inner {
    outline: none;
    border-color: #409eff;
}

.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  width: 100%;
}

.el-input .el-input__suffix {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  color: #c0c4cc;
  transition: all .3s;
  pointer-events: none;
}

.el-input__icon {
    width: 25px;
}

.el-input__icon, .el-input__prefix {
    text-align: center;
    transition: all .3s;
}

.el-input--large {
  .el-input__inner {
    height: 50px;
    line-height: 50px;
  }
}

.el-input-group__append, .el-input-group__prepend {
    background-color: #f5f7fa;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
}

.el-input-group__prepend {
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.el-input-group--prepend .el-input__inner, .el-input-group__append {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.el-input-group--append .el-input__inner {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.el-input-group>.el-input__inner {
    vertical-align: middle;
    display: table-cell;
}

.el-input-group {
  line-height: normal;
  display: inline-table;
  width: 100%;
  border-collapse: separate;
}

.el-input-group__append .hsb-button, .el-input-group__prepend .hsb-button {
  display: inline-block;
  margin: -5px -20px;
  border-color: transparent;
  background-color: transparent;
  color: inherit;
  border-top: 0;
  border-bottom: 0;
}
</style>
