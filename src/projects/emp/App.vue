<template>
  <div id="app" class="nby" :class="$route.name">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <footer>
      <tabbar v-model="selected">
        <tab-item id="外卖">
          <router-link to="/">
            <img class="tab-item-icon" src="./assets/ok.svg"> <br>
            首页
          </router-link>
        </tab-item>
        <tab-item id="订单">
          <router-link to="/message">
            <img class="tab-item-icon" src="./assets/ok.svg"> <br>
            消息
          </router-link>
        </tab-item>
        <tab-item id="发现">
          <router-link to="/found">
            <img class="tab-item-icon" src="./assets/ok.svg"> <br>
            推房
          </router-link>
        </tab-item>
        <tab-item id="我的">
          <router-link to="/my">
            <img slot="icon" class="tab-item-icon" src="./assets/ok.svg">
            我的
          </router-link>
        </tab-item>
      </tabbar>
    </footer>
  </div>
</template>

<script>
import { Tabbar, TabItem } from 'mint-ui';

export default {
  name: 'App',
  data () {
    return {
      selected: ''
    };
  },
  components: {
    Tabbar,
    TabItem
  },
  computed: {
    theme () {
      return this.$store.state.config.theme;
    },
    title () {
      if (typeof this.$route.meta.headerTitle === 'function') {
        return this.$route.meta.headerTitle(this.$route, this.$store);
      }
      return this.$route.meta.headerTitle;
    }
  },
  mounted () {
    // console.log(this.$route.meta.index);
  }
};
</script>

<style>
@import '../../rootcss/base/base.css';
@import 'recover.css';

.view {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.fade-enter-active, .fade-leave-active{
  transition: all .2s ease;
}

.fade-enter, .fade-leave-active{
  opacity: 0;
}

.tab-item-icon {
  width: 24px;
  height: 24px;
  margin: 0 auto 5px;
}

.app {
  min-height: 100%;
  height: 100%;
}

</style>
