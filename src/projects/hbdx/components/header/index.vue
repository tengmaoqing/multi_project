<template>
  <header class="header">
    <nav class="container inner">
      <router-link to="/" exact>
        <img v-if="logo" class="logo" :src="logo" alt="logo"> <span class="hidden-xs head-slogan" v-if="slogan">| {{ $t(slogan) }}</span>
      </router-link>
      <div class="nav-actions fr text-white hidden-xs" v-if="$store.getters['user/userInfo'].tel">
        {{ $t('login.account') }}: {{ $store.getters['user/userInfo'].tel }}
        <h-button type="primary" size="small" @click="exit">{{ $t('exit') }}</h-button>
      </div>
      <div class="fr visible-xs-inline-block">
        <h-switch v-model="popupVisible"></h-switch>
      </div>
    </nav>
    <popup v-model="popupVisible" class="v-popup text-white text-center" :modal="false">
      <div>
        {{ $t('login.account') }}: {{ $store.getters['user/userInfo'].tel }}
      </div>
      <h-button type="primary" size="small" @click="exit">{{ $t('exit') }}</h-button>
    </popup>
  </header>
</template>

<script type="text/javascript">
import hButton from '@/components/button';
import hSwitch from './switch';
import { logout } from '@/apis/hbdx';
import { Toast, Popup } from 'mint-ui';

export default {
  components: {
    hButton,
    Popup,
    hSwitch
  },
  props: {
    logo: String,
    slogan: String
  },
  data () {
    return {
      popupVisible: false
    };
  },
  methods: {
    exit () {
      logout().then(res => {
        if (+res._errCode !== 0) {
          Toast(res._errStr);
          return;
        }
        this.$store.commit('user/loginOut');
        window.location.reload();
      });
    },
    showpopup () {

    }
  }
};
</script>

<style type="text/css" scoped>
@import 'config.css';

.header {
  background-color: #0B3F8A;
  z-index: 999;
  height: 60px;
  position: relative;

  .inner {
    box-sizing: border-box;
    margin: 0px auto;
    padding: 15px 15px;
  }
  a {
    color: $global-white;
    line-height: 24px;
    transition: color .15s ease;
    display: inline-block;
    vertical-align: middle;
    font-weight: 300;
    letter-spacing: .075em;
    margin-right: 1.8em;
    &:hover {
      color: #fff;
    }
    &.router-link-active {
      color: #fff;
      font-weight: 400;
    }
    &:nth-child(6){
      margin-right: 0;
    }
  }
}

.logo{
  width: 96px;
  height: auto;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}

.v-popup {
  background-color: rgba(0, 0, 0, .7);
  top: 65px;
  border-radius: 4px;
  right: 15px;
  left: auto;
  padding: 10px;
  transform: none;
  width: 180px;

  /deep/ .hsb-button {
    width: 100%;
    margin-top: 20px;
  }
}

.nav-actions /deep/ .hsb-button {
  margin-left: 2em;
}

@media (--sm-viewport) {
  .select-item {
    width: 100%;
  }
}
</style>
