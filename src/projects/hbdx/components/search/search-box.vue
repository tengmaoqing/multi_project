<template>
  <div class="search-box">
    <img class="search-icon" :src="searchIcon" @click="ensure"/>
    <div class="search-text-wrapper">
      <input class="search-text" type="text" :value="text" @keyup.enter="ensure" @input="updateKey" :placeholder="placeholder">
      <img class="icon-close" src="./close.png" alt="关闭" v-show="text.length" @click="clear">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchIcon: {
      type: String,
      default: require('./search.png')
    },
    placeholder: {
      type: String
    },
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateKey (e) {
      this.$emit('updateKey', e.target.value);
    },
    clear () {
      this.$emit('updateKey', '');
    },
    ensure () {
      this.$emit('ensureKey');
    }
  }
};
</script>

<style scoped>

.search-box {
  position: relative;
  padding-left: 40px;
  background: #F5F5F5;
}

.search-text-wrapper {
  position: absolute;
  left: 40px;
  right: 0;
  top: 0;
  bottom: 0;
  right: 0;
}

.search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  margin-top: -10px;
}

.search-text {
  width: 100%;
  height: 100%;
  padding: 0;
  padding-right: 10px;
  padding-left: 10px;
  border: 0;
  outline: none;
  background-color: transparent;
}

.search-list {
  z-index: 25;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 10px 0;
  background: #fff;
  border: 1px #F5F5F5 solid;
}

.search-item {
  padding: 0 10px;
  line-height: 30px;
  cursor: pointer;
}

.icon-close {
  padding: 10px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>
