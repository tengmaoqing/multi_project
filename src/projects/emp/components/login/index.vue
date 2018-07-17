<template>
  <div class="login-ww">
    <login class="login-container" auth-url="https://api.huishoubao.com/api/user/oauthLogin" :logo="logo" :auth-prams="authPrams" ></login>
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
import Login from '@/core/login/login';
import { isNubiaApp } from '../../nubiaAPPauth';

export default {
  data () {
    return {
      logo: require('../../assets/logo2.png')
    };
  },
  computed: {
    authPrams () {
      if (isNubiaApp()) {
        return {
          isapk: '1'
        };
      }
      return null;
    }
  },
  title: 'title',
  components: {
    Login
  }
};
</script>
