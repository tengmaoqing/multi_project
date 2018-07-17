<template>
  <div class="header-wapper">
    <header class="hsb-header">
        <div class="hsb-header-button is-left">
          <slot name="left">
            <a href="javascript:window.history.go(-1)">
                <i class="hsb-icon-right"></i>
            </a>
          </slot>
        </div>
        <div class="hsb-header-title">
          <slot>
          {{ title }}
          </slot>
        </div>
        <div class="hsb-header-button is-right">
          <slot name="right"></slot>
        </div>
    </header>
  </div>
</template>

<style type="text/css" scoped>
.header-wapper {
  z-index: 999;
}

.hsb-header {
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
  color: #333;
  display: flex;
  font-size: 17px;
  height: 50px;
  line-height: 1;
  padding: 0 10px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  border-bottom: 1px solid #eee;
}
.hsb-header .hsb-icon-right:after {
  -webkit-transform: translateY(-50%) rotate(-135deg);
  transform: translateY(-50%) rotate(-135deg);
  right: auto;
  left: 20px;
  border-color: #333;
  border-right-width: 2px;
  border-top-width: 2px;
  width: 15px;
  height: 15px;
}

.hsb-icon-right:after {
  border: 1px solid #666666;
  border-bottom-width: 0;
  border-left-width: 0;
  content: " ";
  top: 50%;
  right: 7px;
  position: absolute;
  width: 8px;
  height: 8px;
  -webkit-transform: translateY(-50%) rotate(45deg);
  transform: translateY(-50%) rotate(45deg);
  -webkit-transform-origin: center center;
  transform-origin: center center;
}

.hsb-header-button {
  flex: .5;
}

.hsb-header-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.5;
    font-size: inherit;
    font-weight: 400;
    flex: 1;
}

.hsb-header-button.is-left {
    text-align: left;
}
.hsb-header-button.is-right {
    text-align: right;
}
</style>

<script type="text/javascript">
import stickybits from 'stickybits';

export default {
  props: {
    title: String,
    isFixed: Boolean
  },
  watch: {
    isFixed (v) {
      if (v) {
        this.initStick();
      } else {
        this.stick && this.stick.cleanup();
      }
    }
  },
  methods: {
    initStick () {
      if (this.isFixed) {
        this.stick = stickybits(this.$el, {
          useStickyClasses: true
        });
      }
    }
  },
  mounted () {
    this.initStick();
  }
};
</script>
