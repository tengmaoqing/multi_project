<template>
  <a class="hsb-cell" :href="href">
    <span class="hsb-cell-mask" v-if="isLink"></span>
    <div class="hsb-cell-left">
      <slot name="left"></slot>
    </div>
    <div class="hsb-cell-wrapper">
      <div class="hsb-cell-title">
        <slot name="icon">
          <!-- <i v-if="icon" class="hsbui" :class="'hsbui-' + icon"></i> -->
        </slot>
        <slot name="title">
          <span class="hsb-cell-text" v-text="title"></span>
          <span v-if="label" class="hsb-cell-label" v-text="label"></span>
        </slot>
      </div>
      <div class="hsb-cell-value" :class="{ 'is-link' : isLink }">
        <slot>
          <span v-text="value"></span>
        </slot>
      </div>
      <i v-if="isLink" class="hsb-cell-allow-right"></i>
    </div>
    <div class="hsb-cell-right">
      <slot name="right"></slot>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    to: [String, Object],
    icon: String,
    title: String,
    label: String,
    isLink: Boolean,
    value: {}
  },

  computed: {
    href () {
      if (this.to && !this.added && this.$router) {
        const resolved = this.$router.match(this.to);
        if (!resolved.matched.length) return this.to;

        this.$nextTick(() => {
          this.lock();
          this.$el.addEventListener('click', this.handleClick);
        });
        return resolved.fullPath || resolved.path;
      }
      return this.to;
    }
  },

  methods: {
    lock () {
      this.added = true;
    },
    handleClick ($event) {
      $event.preventDefault();
      this.$router.push(this.href);
    }
  }
};
</script>

<style lang="css">
  @import "config.css";

  .hsb-cell {
    background-color: $global-white;
    box-sizing: border-box;
    color: inherit;
    min-height: 48px;
    display: block;
    overflow: hidden;
    position: relative;
    text-decoration: none;
      &:first-child {
        .hsb-cell-wrapper {
          background-origin: border-box;
        }
      }

      &:last-child {
        background-image: linear-gradient(0deg, $global-gray, $global-gray 50%, transparent 50%);
        background-size: 100% 1px;
        background-repeat: no-repeat;
        background-position: bottom;
      }
  }

  .hsb-cell-wrapper {
    background-image:linear-gradient(180deg, $global-gray, $global-gray 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: top left;
    background-origin: content-box;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    font-size: 16px;
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    padding: 0 10px;
    width: 100%;
  }

  .hsb-cell-mask {
    &::after {
      background-color: #000;
      content: " ";
      opacity: 0;
      position: absolute 0;
    }

    &:active::after {
      opacity: .1;
    }

    img {
      vertical-align: middle;
    }
  }

  .hsb-cell-text {
    vertical-align: middle;
  }

  .hsb-cell-label {
    color: #888;
    display: block;
    font-size: 12px;
    margin-top: 6px;
  }

  .hsb-cell-title {
    flex: 1;
  }

  .hsb-cell-value {
    color: $global-base-color;
    display: flex;
    align-items: center;
  }

  .hsb-cell-value.is-link {
    margin-right: 24px;
  }

  .hsb-cell-left {
    position: absolute;
    height: 100%;
    left: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .hsb-cell-right {
    position: absolute;
    height: 100%;
    right: 0;
    top: 0;
    transform: translate3d(100%, 0, 0);
  }

  .hsb-cell-allow-right::after {
    border: solid 2px $global-border-color;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    position: absolute;
    top: 50%;
    right: 20px;
    width: 5px;
    height: 5px;
    transform: translateY(-50%) rotate(45deg);
  }
</style>
