<template>
  <section class="container">
    <div class="col-left">
      <product-info class="pinfo" :pic="orderInfo.pic" :tip="''" :product-name="orderInfo.productName">
        <h2 class="text-danger price">
          {{ orderInfo.price | fen2yuan}}
        </h2>
        <div class="text-muted">
          {{ $t('havePlaceOrdered') }}
        </div>
      </product-info>
    </div>
    <hr class="hr visible-xs-block">
    <div class="col-right">
      <div class="text-center order-panel">
        <i class="re-icon hidden-xs"></i>
        <div class="num-text">
          {{ $t('orderNum') }}
        </div>
        <strong class="text-sz-slogan">
          {{ orderInfo.orderNum }}
        </strong>
        <div class="text-des">
          {{ $t('orderRes.orderTip') }}
        </div>
      </div>

      <div class="text-center actions">
        <router-link to="/orders">
          <h-button size="large" class="act-l btn-lg">{{ $t('orderList') }}</h-button>
        </router-link>
        <router-link to="/products">
          <h-button size="large" type="primary" class="btn-lg">{{ $t('orderRes.continue') }}</h-button>
        </router-link>
      </div>
      <hr class="hr">
      <div>
    <!--     <div class="center-block col-left">
          <div class="clearfix">
            <div class="sr img">
              <img class="img-responsive" :src="$store.state.phoneImgRoot + $store.state.createdOrder.orderInfo.pic">
            </div>
            <div class="sr g-r">
              <h4>{{$store.state.createdOrder.orderInfo.productName}}</h4>
              <h1 class="text-danger bprice">￥{{ $store.state.createdOrder.orderInfo.price | fen2yuan }}</h1>
            </div>
          </div>
        </div> -->
        <selects show-name :selects="orderInfo.selectParams"></selects>
      </div>
    </div>
  </section>
</template>

<style type="text/css" scoped>
@import 'config.css';

.pinfo /deep/ .hsb-button {
  display: none;
}

.container {
  margin-top: 60px;
}

.actions {
  margin: 60px auto;
}

.num-text {
  margin: 5px 0;
}

.price {
  margin: 20px 0;
  font-size: $global-main-title-fontsize;
}

.order-panel {
  margin-top: 15px;
  padding: 50px 0;
}

.text-des {
  font-size: responsive 10px 18px;
}

.actions .act-l {
  margin-right: 30px;
}

.re-icon {
  width: 80px;
  height: 80px;
  display: inline-block;
  background-image: url(./img/ok.png);
  background-size: cover;
}

@media (--sm-viewport) {
  .container {
    margin-top: 0;
  }

  .order-panel {
    padding: 0;
  }

  .actions {
    margin: 15px 0;
  }
}

</style>

<script type="text/javascript">
import hButton from '@/components/button';
import Selects from '@/core/ev-info/selects';
import CreatedOrder from '@/core/createdOrder/store';
import productInfo from '@/core/evaluate/product-info';

export default {
  asyncData ({ store, route }) {
    return store.dispatch('createdOrder/getTempOrder', route.params.orderNum);
  },
  registerModule (store, preserveState) {
    store.registerModule('createdOrder', CreatedOrder, { preserveState });
  },
  destroyed () {
    this.$store.unregisterModule('createdOrder');
  },
  components: {
    hButton,
    Selects,
    productInfo
  },
  computed: {
    orderInfo () {
      return this.$store.state.createdOrder.orderInfo;
    }
  }
};
</script>
