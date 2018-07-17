<template>
  <section>
    <h2 class="text-center">
      404！NOT FOUND！
    </h2>
    <div class="text-center">
      <router-link :to="to">
        <h-button type="primary">首页</h-button>
      </router-link>
    </div>
  </section>
</template>

<script type="text/javascript">
import hButton from '@/components/button';
export default {
  components: {
    hButton
  },
  props: {
    to: {
      type: String,
      default: '/'
    }
  }
};
</script>

<style type="text/css" scoped="">
.text-center {
  margin: 30px 0;
}
</style>
