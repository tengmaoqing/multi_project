<template>
  <tabbar v-model="selected">
    <tab-item id="外卖">
      <router-link to="/">
        <img class="tab-item-icon" src="../../assets/ok.svg"> <br>
        首页
      </router-link>
    </tab-item>
    <tab-item id="订单">
      <router-link to="/message">
        <img class="tab-item-icon" src="../../assets/ok.svg"> <br>
        消息
      </router-link>
    </tab-item>
    <tab-item id="发现">
      <router-link to="/found">
        <img class="tab-item-icon" src="../../assets/ok.svg"> <br>
        推房
      </router-link>
    </tab-item>
    <tab-item id="我的">
      <router-link to="/my">
        <img slot="icon" class="tab-item-icon" src="../../assets/ok.svg">
        我的
      </router-link>
    </tab-item>
  </tabbar>
</template>

<style>
.tab-item-icon {
  width: 24px;
  height: 24px;
  margin: 0 auto 5px;
}
</style>

<script>
import { Tabbar, TabItem } from 'mint-ui';

export default {
  data () {
    return {
      selected: ''
    };
  },
  components: {
    Tabbar,
    TabItem
  }
};
</script>
