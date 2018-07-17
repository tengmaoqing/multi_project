<template>
  <button
    :type="nativeType"
    class="hsb-button"
    :class="['hsb-button--' + type, 'hsb-button--' + size, {
      'is-disabled': disabled,
      'is-plain': plain,
      'is-round': round,
      'is-loading': loading,
    }]"
    @click="handleClick"
    :disabled="loading || disabled">
    <span class="hsb-button-icon" v-if="icon || $slots.icon">
      <slot name="icon"></slot>
    </span>
    <spinner v-if="loading" :show="true" stroke="#fff"></spinner>
    <label class="hsb-button-text">
      <slot></slot>
    </label>
  </button>
</template>

<script>
import spinner from './spinner';
import { throttle } from 'lodash';

const throttledClick = throttle(function (evt) {
  this.$emit('click', evt);
}, 2000, {
  trailing: false
});

export default {
  methods: {
    handleClick (evt) {
      if (this.wait) {
        throttledClick.call(this, evt);
        return;
      }
      this.$emit('click', evt);
    }
  },

  components: {
    spinner
  },

  props: {
    icon: String,
    disabled: Boolean,
    nativeType: {
      type: String,
      default: 'button'
    },
    plain: Boolean,
    round: Boolean,
    text: Boolean,
    loading: Boolean,
    wait: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'default',
      validator (value) {
        return [
          'default',
          'danger',
          'primary',
          'text'
        ].indexOf(value) > -1;
      }
    },
    size: {
      type: String,
      default: 'normal',
      validator (value) {
        return [
          'small',
          'normal',
          'large'
        ].indexOf(value) > -1;
      }
    }
  }
};
</script>

<style lang="css">
  @import "config.css";

  .hsb-button {
    appearance: none;
    border-radius: $global-border-radius;
    border: 0;
    box-sizing: border-box;
    color: inherit;
    display: inline-block;
    height: 41px;
    outline: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
    cursor: pointer;
    vertical-align: middle;

    &::after {
      background-color: #000;
      content: " ";
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    &:not(.is-disabled):active::after {
      opacity: .4;
    }

    &.is-disabled, &[disabled] {
      background-color: $global-disabled-bgc;
      cursor: not-allowed;
    }

    &.is-round {
      border-radius: 20px;
    }
  }

  .hsb-button-text {
    vertical-align: middle;
  }

  .hsb-button-icon {
    vertical-align: middle;
    display: inline-block;
  }

  .hsb-button--default {
    color: $global-base-color;
    background-color: $global-gray;

    &.is-plain {
      border: 1px solid $global-base-color;
      background-color: transparent;
      box-shadow: none;
      color: $global-base-color;
    }
  }

  .hsb-button--primary {
    color: $global-base-color;
    background-color: $global-primary-color;

    &.is-plain {
      border: 1px solid $global-primary-color;
      background-color: transparent;
      color: $global-primary-color;
    }
  }

  .hsb-button--danger {
    color: $global-base-color;
    background-color: $global-danger-color;

    &.is-plain {
      border: 1px solid $global-danger-color;
      background-color: transparent;
      color: $global-danger-color;
    }
  }

  .hsb-button--large {
    display: block;
    width: 100%;
    padding: 0 32px;
    height: 56px;
  }

  .hsb-button--normal {
    display: inline-block;
    padding: 0 24px;
  }

  .hsb-button--small {
    display: inline-block;
    font-size: 14px;
    padding: 0 16px;
    height: 30px;
  }

  .hsb-button--text {
    color: $global-base-color;
    background-color: $global-danger-color;
    border-color: transparent;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
  }
</style>
