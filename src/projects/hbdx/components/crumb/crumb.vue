<template>
  <div class="crumb-wrapper">
    <img class="crumb-label" :src="icon"/>
    <ul class="crumb-list">
      <li class="crumb-item" v-for="item in list" :key="item.text">
        <router-link :to="item.to">{{ $t(item.text) }}</router-link>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return [{
          text: 'home',
          to: '/'
        }];
      }
    },
    icon: {
      type: String,
      default: require('./home.png')
    }
  }
};
</script>

<style scoped>
.crumb-wrapper {
  height: 70px;
  font-size: 0;
  padding-top: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #E6E6E6;
}

.crumb-label {
  display: inline-block;
  vertical-align: middle;
}

.crumb-list {
  display: inline-block;
  vertical-align: middle;
}

.crumb-item {
  margin-left: 8px;
  font-size: 14px;
}
</style>
