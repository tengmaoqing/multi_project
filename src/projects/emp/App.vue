<template>
  <div id="app" class="app" :class="$route.name">
    <f-header v-show="$route.meta.header" :title="$route.meta.header"></f-header>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <!-- <footer> -->
      <f-nav class="sticky" v-show="$route.meta.navshow"></f-nav>
    <!-- </footer> -->
  </div>
</template>

<script>
import FNav from './components/nav/index';
import FHeader from '@/components/header';

export default {
  name: 'App',
  components: {
    FNav,
    FHeader
  },
  computed: {
    theme () {
      return this.$store.state.config.theme;
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

.app {
  min-height: 100%;
  height: 100%;
}

.sticky {
  position: sticky;
  bottom: 0;
}

</style>
