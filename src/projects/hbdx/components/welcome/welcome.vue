<template>
  <div class="container">
    <h2 class="slogan">{{ $t('slogan') }}</h2>
    <ul class="pro-list">
      <li class="pro-item" v-for="(item, index) in proList" :key="item.text">
        <p class="pro-item-ico text-center">{{ index + 1 }}</p>
        <p class="pro-item-txt">{{ $t(item.text) }}</p>
      </li>
    </ul>
    <div class="links center-block">
      <router-link to="/products">
        <h-button class="h-btn f-btn" size="large" type="primary">
          {{ $t('beginRecycle') }}
        </h-button>
      </router-link>
      <router-link to="/orders">
        <h-button class="h-btn" plain size="large">
          {{ $t('recycleList') }}
        </h-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import hButton from '@/components/button';

export default {
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
  },
  components: {
    hButton
  }
};
</script>

<style scoped>
  @import 'config.css';

  .slogan {
    margin-top: 142px;
    font-size: $global-slogan-fontsize;
    line-height: 42px;
    text-align: center;
  }
  .h-btn {
    height: 46px;
    margin: 0 auto;
  }

  .links {
    max-width: 348px;
    &:nth-of-type(1) {
      margin-top: 140px;
    }
  }

  .f-btn {
    margin-bottom: 28px;
  }

  .pro-list {
    margin-top: 55px;
    margin-left: 50%;
    display: inline-block;
    transform: translateX(-50%);
  }
  .pro-item {
    position: relative;
    margin-bottom: 20px;
    white-space: nowrap;

    &:nth-of-type(1) .pro-item-ico {
      opacity: .6;
    }
    &:nth-of-type(2) .pro-item-ico {
      opacity: .7;
    }
    &:nth-of-type(3) .pro-item-ico {
      opacity: .8;
    }
    &:nth-of-type(4) .pro-item-ico {
      opacity: .9;
      &::after {
        display: none;
      }
    }
  }
  .pro-item-ico {
    display: inline-block;
    width: 40px;
    height: 40px;
    font-size: $global-secondary-title-fontsize;
    color: #FFFFFF;
    line-height: 40px;
    border-radius: 50%;
    background: $global-primary-color;
    vertical-align: middle;
  }
  .pro-item-txt {
    margin-left: 2em;
    display: inline-block;
    margin-top: 10px;
    font-size: $global-secondary-title-fontsize;
    color: #000000;
    line-height: 18px;
  }

  /deep/ .is-plain {
    background-color: #fff;
  }

  @media screen and (max-width: 980px) {
    .container {
      background-color: #fff;
    }

    .slogan {
      margin-top: 40px;
    }
    .pro-list {
      margin-top: 20px;
    }
    .pro-item {
      &::after {
        display: none;
      }
    }

    .links {
      padding: 0 $global-spacer-md;
    }

    .links:nth-of-type(1) {
      margin-top: 40px;

      .h-btn {
        height: 40px;
      }
    }

    .f-btn {
      margin-bottom: 15px;
    }

    .pro-item {
      margin-bottom: 10px;
    }

    .pro-item-ico {
      width: 30px;
      height: 30px;
      line-height: 30px;
    }
  }
</style>
