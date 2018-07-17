<template>
  <section class="container">
    <div class="col-right">
      <div class="text-center order-panel">
        <i class="re-icon"></i>
        <div class="num-text">
          {{ $t('orderNum') }}
        </div>
        <strong class="text-sz-slogan">
          {{ orderInfo.orderNum }}
        </strong>
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
      <order-tip></order-tip>
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

  .re-icon {
    width: 60px;
    height: 60px;
  }
}

</style>

<script type="text/javascript">
import hButton from '@/components/button';
import CreatedOrder from '@/core/createdOrder/store';
import orderTip from '@/core/createdOrder/tip';

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
    orderTip
  },
  computed: {
    orderInfo () {
      return this.$store.state.createdOrder.orderInfo;
    }
  }
};
</script>
