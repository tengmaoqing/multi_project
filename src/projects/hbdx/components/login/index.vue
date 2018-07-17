<template>
  <div class="login-ww">
    <login class="login-container" :logo="logo" :slogan="$t('slogan')"></login>
  </div>
</template>

<style type="text/css">
@import 'config.css';

.login-container {
  max-width: 350px;
  margin: 0 auto;
}

.login-ww {
  height: 100%;
  overflow: auto;
  background-color: #0B3F8A;
}
</style>

<script type="text/javascript">
import Login from '@/core/login/password-login';

export default {
  data () {
    return {
      logo: require('../../assets/logo.png')
    };
  },
  title: 'title',
  components: {
    Login
  }
};
</script>
