<template>
  <div class="wrapper">
    <div class="page-header clearfix">
      <div class="back-wrapper hidden-xs pointer" @click="goBack">{{ $t('back') }}</div>
      <Search :text="kw" @updateKey="updateKey" @ensureKey="switchSearch" :placeholder="$t('searchWhatYouWantEvalProduct')"></Search>
    </div>
    <div class="product-list-wrapper"
      ref="pscroll"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="0">
      <ul class="product-list clearfix">
        <li class="product-item" v-for="(item, index) in productList" :key="index" @click="toEva(item)">
          <div class="product-logo-wrap">
            <img class="product-logo" :src="item.productLogo" :alt="item.productName">
          </div>
          <p class="product-name">{{ item.productName }}</p>
        </li>
      </ul>
      <div class="btm-wrapper text-center">
        <div v-show="loading">{{ $t('loading') }}</div>
        <div v-show="!loading && productList.length === 0 && kw.length">{{ $t('withoutRelativeData') }}</div>
        <div v-show="!loading && productList.length !== 0 && pageInfo.total == productList.length">{{ $t('withoutMore')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductsByKey } from '@/apis/base';
import Vue from 'vue';
import { Loading } from 'element-ui';
import { InfiniteScroll } from 'mint-ui';
import Search from './search-box';

Vue.use(InfiniteScroll);
Loading.directive.install(Vue);

export default {
  components: {
    Search
  },
  data () {
    return {
      kw: '',
      loading: false,
      productList: [],
      pageInfo: {
        pageIndex: 1,
        pageSize: 20,
        total: 0
      }
    };
  },
  methods: {
    resetPageInfo () {
      this.pageInfo = {
        pageIndex: 1,
        pageSize: 20,
        total: 0
      };
    },
    async setProducts () {
      const kw = this.kw;
      const pageInfo = this.pageInfo;
      let res = await getProductsByKey(kw, pageInfo.pageIndex, pageInfo.pageSize);
      this.productList = res._data.productList;
      this.pageInfo = res._data.pageInfo;
    },
    async setMoreProducts () {
      const kw = this.kw;
      const pageInfo = this.pageInfo;
      let res = await getProductsByKey(kw, parseInt(pageInfo.pageIndex) + 1, pageInfo.pageSize);
      const data = res._data;
      this.productList = this.productList.concat(data.productList);
      this.pageInfo = data.pageInfo;
    },
    async updateKey (val) {
      this.kw = val;
    },
    async loadMore () {
      const list = this.productList;
      const pageInfo = this.pageInfo;
      if (list.length === 0) {
        return;
      }
      if (list.length >= parseInt(pageInfo.total)) {
        return;
      }
      if (this.loading) {
        return;
      }
      this.loading = true;
      await this.setMoreProducts();
      this.loading = false;
    },
    goBack () {
      this.$router.back();
    },
    switchSearch () {
      window.scrollTo(0, 0);
      this.$nextTick(() => {
        this.$router.replace(`/search?key=${this.kw}`);
      });
    },
    toEva (item) {
      this.$router.push({
        name: 'ProductInfo',
        params: {
          productId: item.productId
        }
      });
      // this.$router.push(`/productInfo/${item.productId}`);
    }
  },
  watch: {
    '$route.query' (query) {
      this.kw = query.key;
      this.resetPageInfo();
      this.setProducts();
    }
  },
  created () {
    this.kw = this.$route.query.key;
    this.resetPageInfo();
    this.setProducts();
  }
};
</script>

<style scoped>

$pc-search-input-height: 56px;
$h5-search-input-height: 46px;
$pc-search-box-width: 360px;

.wrapper {
  position: relative;
  width: 1200px;
  margin: 0 auto;
}

.page-header {
  z-index: 15;
  top: 0;
  width: 1200px;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
  background-color: #fff;
}

.back-wrapper {
  float: left;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
}

.search-box {
  position: relative;
  float: right;
  width: 360px;
  height: 56px;
  padding-left: 40px;
  background: #F5F5F5;
  border-radius: 44px;
  .search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    margin-top: -10px;
  }
  .search-text {
    position: absolute;
    left: 40px;
    right: 0;
    height: $pc-search-input-height;
    padding: 0;
    border: 0;
    outline: none;
    background-color: transparent;
  }
}

.product-item {
  float: left;
  width: 275px;
  height: 310px;
  margin-bottom: 55px;
  cursor: pointer;
  text-align: center;
  .product-logo {
    height: 207px;
    margin-top: 24px;
  }
  .product-name {
    margin-top: 20px;
    font-size: 16px;
    line-height: 22px;
  }
  &:hover {
    background: #FFFFFF;
    box-shadow: 0 6px 20px 0 rgba(0,0,0,0.06);
    border-radius: 4px;
    .product-name {
      font-weight: bold;
    }
  }
}

.pager-list {
  .pager-item {
    min-width: 28px;
    padding: 3px 6px;
    font-size: 14px;
    &.is-active {
      background: #529AFF;
      a {
        color: #fff;
      }
    }
  }
}

.btm-wrapper {
  height: 50px;
  line-height: 50px;
}

.product-list-wrapper {
  padding-top: 40px;
}

@media screen and (max-width: 980px) {
  .wrapper {
    width: 100%;
    margin: 0 auto;
    padding-top: 60px;
  }
  .page-header {
    z-index: 99;
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: auto;
    padding: 10px;
  }
  .search-box {
    width: 100%;
    height: $h5-search-input-height;
    .search-text {
      height: $h5-search-input-height;
      box-sizing: border-box;
    }
  }
  .product-list-wrapper {
    overflow: hidden;
    padding-top: 60px;
    padding-bottom: 20px;
  }
  .product-item {
    float: left;
    width: 50%;
    height: auto;
    margin-top: 0;
    margin-bottom: 10px;
    cursor: pointer;
    text-align: center;
    .product-logo {
      width: 90%;
      height: auto;
      margin-top: 20px;
    }
    .product-name {
      margin-top: 20px;
      font-size: 16px;
      line-height: 22px;
    }
  }
  .hidden-xs {
    display: none;
  }
}
</style>
