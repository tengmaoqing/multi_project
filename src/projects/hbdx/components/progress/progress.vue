<template>
  <ul class="pro-list">
    <li class="pro-item" :class="{'down': idx + 1 < index, 'current': (idx + 1) === index}" v-for="(item, idx) in proList" :key="item.text">
      <p class="pro-item-ico">{{ idx + 1 }}</p>
      <p class="pro-item-txt">{{ $t(item.text) }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      proList: [{
        text: 'welcome.chooseProduct'
      }, {
        text: 'welcome.quickEva'
      }, {
        text: 'welcome.getPrice'
      }, {
        text: 'welcome.submitOrder'
      }]
    };
  }
};
</script>

<style scoped>
  @import 'config.css';

  .pro-list {
    margin-top: 20px;
    font-size: 0;
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #E6E6E6;
  }
  .pro-item {
    position: relative;
    display: inline-block;
    margin: 0 40px;
    opacity: 0.6;
    &:nth-of-type(4) {
      .pro-item-ico::after {
        display: none;
      }
    }
    &.current {
      opacity: 1;
    }
  }
  .pro-item-ico {
    display: inline-block;
    width: 21px;
    height: 21px;
    font-size: 14px;
    color: #fff;
    background: $global-primary-color;
    border-radius: 50%;
    &::after {
      content: " ";
      position: absolute;
      top: 50%;
      right: -64px;
      width: 52px;
      height: 4px;
      background: url('./dot.png');
    }
  }
  .pro-item-txt {
    display: inline-block;
    margin-left: 6px;
    font-size: 14px;
  }
</style>
