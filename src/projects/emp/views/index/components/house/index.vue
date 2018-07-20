<template>
  <section>
    <div class="titles mb-lg">
      <router-link class="text-sz-s-title" to="/">
        新盘地图
      </router-link>
      <router-link class="text-sz-s-title" to="/">
        新盘动态
      </router-link>
    </div>
    <div class="lists">
      <item></item>
    </div>
  </section>
</template>

<style scoped>
.titles {
  display:flex;
  justify-content: space-between;
}

</style>

<script>
import Item from '@/projects/emp/components/houseListItem/index';
export default {
  components: {
    Item
  }
};
</script>
