<template>
  <div class="container orders-view">

    <!-- 面包屑 -->
    <div class="orders-header clearfix"></div>
    <Crumb class="orders-crumb">
      <div class="search-wrap">
        <el-input class="search-text" :placeholder="$t('order.search')" type="text" v-model="key" @keyup.enter.native="doSearch" clearable></el-input>
        <h-button class="search-btn" type="primary" @click="doSearch">{{ $t('inquery') }}</h-button>
      </div>
    </Crumb>

    <!-- 订单分页列表 -->
    <div class="order-list-wrap"
      v-show="!showSearch"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-immediate-check="false"
      infinite-scroll-distance="0">
      <OrderList @choosed="toDetail"></OrderList>
      <div class="btm-wrap">
        <div class="h-loading-wrap">
          <div class="h-loading" v-show="loading">{{ $t('loading') }}...</div>
          <!-- <div v-show="!hasMoreOrder && !loading">{{ $t('withoutMore') }}!</div> -->
        </div>
      </div>
    </div>

    <div class="zero-data" v-show="orderList.length === 0">{{ $t('withoutMore') }}</div>

    <!-- 搜索结果 -->
    <div class="order-list-wrap" v-show="showSearch">
      <ul class="order-list" v-show="searchList.length">
        <OrderItem
          v-for="(item, index) in searchList"
          :key="index"
          :order="item"
          @choosed="toDetail"></OrderItem>
      </ul>
      <div v-show="!searchList.length">{{ $t('withoutRelativeData') }}</div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue';
import OrderStore from '@/core/order-list/store';
import OrderList from '@/core/order-list/order-list';
import Crumb from '../crumb/crumb';
import Pagination from '@/components/pagination';
import { InfiniteScroll } from 'mint-ui';
import hButton from '@/components/button';
import hInput from '@/components/input';
import OrderItem from '@/core/order-list/order-item';
import { Input } from 'element-ui';
Vue.use(InfiniteScroll);

export default {
  asyncData ({ store }) {
    return store.dispatch('order/getOrder');
  },
  registerModule (store, preserveState) {
    store.registerModule('order', OrderStore, { preserveState });
  },
  components: {
    hInput,
    hButton,
    Pagination,
    OrderList,
    Crumb,
    OrderItem,
    'el-input': Input
  },
  data () {
    return {
      key: '',
      loading: false,
      showSearch: false
    };
  },
  watch: {
    key (val) {
      if (!val.length) {
        this.showSearch = false;
      }
    }
  },
  destroyed () {
    this.$store.unregisterModule('order');
  },
  methods: {
    toDetail (orderId) {
      this.$router.push({name: 'OrderItem', params: {orderId}});
    },
    async loadMore () {
      let orderList = this.$store.state.order.orderList;
      let pageInfo = this.$store.state.order.pageInfo;
      if (this.loading) return;
      if (orderList.length === 0) return;
      if (parseInt(pageInfo.total) <= orderList.length) return;
      this.loading = true;
      await this.$store.dispatch('order/getMoreOrder');
      this.loading = false;
    },
    handleIndexChange (pageIndex) {
      const pageInfo = this.pageInfo;
      pageInfo.pageIndex = pageIndex;
      this.$store.commit('order/setPageInfo', pageInfo);
      this.$store.dispatch('order/getOrder');
    },
    async doSearch () {
      if (!this.key.length) return;
      this.$store.dispatch('order/search', this.key.trim());
      this.showSearch = true;
    }
  },
  computed: {
    hasMoreOrder () {
      return this.$store.getters['order/hasMoreOrder'];
    },
    orderList () {
      return this.$store.state.order.orderList;
    },
    pageInfo () {
      return this.$store.getters['order/pageInfo'];
    },
    searchList () {
      return this.$store.state.order.searchList;
    }
  }
};
</script>

<style scoped>
.hide {
  display: none;
}

.search-wrap {
  position: relative;
  float: right;
  top: -10px;
  font-size: 14px;

  .search-text {
    float: left;
    width: 249px;
  }

  .search-btn {
    float: left;
    margin-left: 10px;
  }
}

.order-list-wrap {
  margin-top: 24px;
}

.btm-wrap {
  text-align: center;
  padding-bottom: 20px;
}

.crumb-wrapper {
  position: relative;
}

.search-wrap {
  display: flex;
}
</style>
