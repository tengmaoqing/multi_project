<template>
  <section class="container result">
    <div>
      <div class="col-left">
        <product-info class="product-info" :pic="params.pic" :tip="''" :btn-tip="$t('evluateRes.reEvaluate')" :product-name="params.productName"  @back="$router.go(-1)">
          <h2 class="text-danger price">
            {{price | fen2yuan}}
          </h2>
        </product-info>
        <hr class="hr visible-xs-block">
      </div>
      <div class="col-right">
        <div>
          IMEI
        </div>
        <h-input :placeholder="$t('evluateRes.imie')" class="mb-base imei-input" v-model="imei"></h-input>
        <div class="actions">
          <router-link to="/">
            <h-button type="default" size="large" class="btn-lg">{{ $t('evluateRes.cancel') }}</h-button>
          </router-link><h-button type="primary" size="large" class="btn-lg" @click="createOrder">{{ $t('evluateRes.confirm') }}</h-button>
        </div>

        <hr class="hr hr-l">
        <selects show-name :selects="$store.state.evaluate.info.selectParams"></selects>
      </div>
    </div>
  </section>
</template>

<style type="text/css" src="./info.css" scoped></style>

<script type="text/javascript">
import evStore from '@/core/ev-info/store';
import Selects from '@/core/ev-info/selects';
import productInfo from '@/core/evaluate/product-info';
import hButton from '@/components/button';
import hInput from '@/components/input';
import { createOrder } from '@/apis/base';
import { Toast } from 'mint-ui';

export default {
  asyncData ({ store, route }) {
    return store.dispatch('evaluate/getEvInfo', route.params.evID);
  },
  registerModule (store, preserveState) {
    store.registerModule('evaluate', evStore, { preserveState });
  },
  components: {
    Selects,
    hButton,
    hInput,
    productInfo
  },
  computed: {
    price () {
      return this.$store.state.evaluate.info.quotation;
    },
    evaluateid () {
      return this.$route.params.evID;
    },
    params () {
      return this.$store.state.evaluate.info;
    }
  },
  data () {
    return {
      imei: ''
    };
  },
  methods: {
    createOrder () {
      createOrder(this.evaluateid, this.imei).then(res => {
        if (+res._errCode !== 0) {
          Toast(res._errStr);
          return;
        }
        this.$router.push(`/orderResult/${res._data.orderNum}`);
      });
    }
  },
  destroyed () {
    this.$store.unregisterModule('evaluate');
  }
};
</script>
