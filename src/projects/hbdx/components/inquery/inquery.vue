<template>
  <div class="container">
    <div >
      <div class="col-left">
        <product-info class="product-info" :pic="params.pic" :product-name="params.productName"  @back="reselect"></product-info>
      </div>
      <hr class="hr visible-xs-block">
      <div class="col-right">
        <Evaluate />
        <h-button class="btn-lg" type="primary" :disabled="!canSubmit" :loading="loading" size="large" @click="submit">{{ $t('evaluate.submit') }}</h-button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Evaluate from '@/core/evaluate/evaluate';
import productInfo from '@/core/evaluate/product-info';
import productParam from '@/core/evaluate/store.js';
import hButton from '@/components/button';
import { Toast } from 'mint-ui';

export default {
  asyncData ({ store, route }) {
    return store.dispatch('productParam/get', route.params.productId);
  },
  registerModule (store, preserveState) {
    store.registerModule('productParam', productParam, { preserveState });
  },
  destroyed () {
    this.$store.unregisterModule('productParam');
  },
  data () {
    return {
      loading: false
    };
  },
  components: {
    Evaluate,
    hButton,
    productInfo
  },
  computed: {
    canSubmit () {
      return this.$store.getters['productParam/canSubmit'];
    },
    params () {
      return this.$store.state.productParam.params;
    }
  },
  methods: {
    reselect () {
      this.$router.push('/products');
    },
    async submit () {
      this.loading = true;
      console.log(123);
      let res = null;
      try {
        res = await this.$store.dispatch('productParam/setPriceInfo');
      } catch (err) {
        console.log(err);
      }
      this.loading = false;
      if (!res || +res._errCode !== 0) {
        Toast(res._errStr || 'error');
        return;
      }
      this.$router.push({name: 'EvInfo', params: {evID: res._data.evaluateid}});
    }
  }
};
</script>

<style src="./inquery.css" scoped></style>
