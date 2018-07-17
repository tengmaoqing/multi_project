<template>
  <div id="app" class="hbdx" :class="$route.name">
    <h-header v-if="!$route.meta.hideHeader" :logo="logo" :slogan="slogan"></h-header>
    <Crumb v-if="!$route.meta.hideCrumb" class="container hidden-xs"></Crumb>
    <Progress class="container hidden-xs" v-if="$route.meta.index" :index="$route.meta.index"></Progress>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
<!--     <footer>
      copyright@2018
    </footer> -->
  </div>
</template>

<script>
import hHeader from './components/header/index';
import Progress from './components/progress/progress';
import Crumb from './components/crumb/crumb';

export default {
  name: 'App',
  data () {
    return {
      logo: require('./assets/logo.png'),
      slogan: 'slogan'
    };
  },
  components: {
    hHeader,
    Progress,
    Crumb
  },
  computed: {
    theme () {
      return this.$store.state.config.theme;
    }
  },
  mounted () {
    console.log(this.$route.meta.index);
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

.hbdx {
  min-height: 100%;
  height: 100%;
}

</style>
