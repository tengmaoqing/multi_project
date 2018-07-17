<template>
  <div class="container models-view">
    <!-- <order-progress></order-progress> -->
    <div class="search-box-wrapper">
      <Search @chooseProduct="productTap" @showMoreSearch="showMoreSearch" :placeholder="$t('searchWhatYouWantEvalProduct')"></Search>
    </div>
    <!-- <categories @onCategoryChanged="handeCategory"></categories> -->
    <model
      :products="products"
      :brands="brands"
      :currentBrand="brandId"
      :categories="categories"
      :currentCategory="categoryId"
      @categoryClick="handeCategory"
      @brandClick="handleBrand"
      @productClick="productTap"
      :loading="pageloading"
      @infinite="infiniteHandler"
      :productImg="true"
      ></model>
  </div>
</template>

<script>
import superModel from '@/core/models/superModel';
import ModelStore from '@/core/models/store';
import Search from '@/core/search/search';
import searchStore from '@/core/search/store';
// import orderProgress from '../progress/progress';
// import { getProducts } from '@/apis/base';

export default {
  extends: superModel,
  components: {
    Search
  },
  asyncData: superModel.asyncData,
  registerModule (store, preserveState) {
    store.registerModule('models', ModelStore, { preserveState });
    store.registerModule('search', searchStore, { preserveState });
  },
  destroyed () {
    this.$store.unregisterModule('models');
    this.$store.unregisterModule('search');
  },
  methods: {
    updateKey (e) {
      this.$store.dispatch('search/setKey', e.target.value);
      // this.$store.dispatch('search/setProducts');
    },
    showMoreSearch (key) {
      // if (!key) return;
      this.$router.push(`/search?key=${key}`);
    }
  },
  mounted () {
    this.$store.dispatch('search/setKey', '');
  }
};
</script>

<style src="./models.css" scoped></style>
