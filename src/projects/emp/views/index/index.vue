<template>
  <section class="container">
    <f-head class="header"></f-head>
    <main-nav class="bg-white br-base mb-lg nav-section"></main-nav>
    <news class="mb-lg "></news>
    <ad class="mb-lg "></ad>
    <house></house>
  </section>
</template>

<script>
import MainNav from './components/main-nav/index';
import News from './components/news/index';
import fHead from './components/head/index';
import ad from './components/ad/index';
import house from './components/house/index';

export default {
  components: {
    MainNav,
    News,
    fHead,
    ad,
    house
  }
};
</script>

<style scoped>
.container {
  background: url('./imgs/u8906.png') no-repeat;
}

.header {
  height: 115px;
  padding-top: 10px;
}

.nav-section {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);
}
</style>
