<template>
  <div class="container models-view">
    <!-- <config-banner class="model-swipe"></config-banner> -->
    <div class="search-box-wrapper">
      <Search @chooseProduct="productTap" show-result @showMoreSearch="showMoreSearch" :placeholder="$t('searchWhatYouWantEvalProduct')"></Search>
    </div>

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
      :infinite-load="isM"
      :productImg="!isM"
      ></model>
    <pagination class="text-right h-pagination" v-if="!isM" :page-size="+pageInfo.pageSize" layout="prev, pager, next" :current-page="+pageInfo.pageIndex" @current-change="handleCurrentChange" :total="+pageInfo.total"></pagination>
  </div>
</template>

<script>
import { Pagination } from 'element-ui';
import ModelStore from '@/core/models/store';
import superModel from '@/core/models/superModel';
// import ConfigBanner from '@/core/config-banner/config-banner';
import Search from '@/core/search/search';
import searchStore from '@/core/search/store';
import isMobile from 'ismobilejs';

const isM = isMobile.phone;

export default {
  extends: superModel,
  components: {
    Search,
    // ConfigBanner,
    Pagination
  },
  asyncData: superModel.asyncData,
  data () {
    return {
      isM: isM
    };
  },
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
    },
    showMoreSearch (key) {
      this.$router.push(`/search?key=${key}`);
    }
  },

  mounted () {
    this.$store.dispatch('search/setKey', '');
  }
};
</script>

<style src="./models.css" scoped></style>
