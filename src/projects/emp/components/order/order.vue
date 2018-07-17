<template>
  <div class="container order-view">
    <order-item
      @cancelOrder="showCancelOrderDialog"></order-item>

      <el-dialog
        class="cancel-dialog"
        :title="$t('tip')"
        :visible.sync="cancelOrderDialogVisible"
        :before-close="handleClose">
        <div>{{ $t('orderDetail.cancelOrderConfirm') }}</div>
        <h-button class="h-btn btn-lg" size="large" @click="closeCancelOrderDialog">{{ $t('cancel') }}</h-button>
        <h-button class="h-btn btn-lg" size="large" type="primary" @click="submitCancel">{{ $t('ensure') }}</h-button>
      </el-dialog>
  </div>
</template>

<script type="text/javascript">
import OrderItem from '@/core/order-item/index2c';
import OrderItemStore from '@/core/order-item/store';
import hButton from '@/components/button';
import hInput from '@/components/input';
import { Dialog } from 'element-ui';
export default {
  components: {
    hInput,
    hButton,
    OrderItem,
    'el-dialog': Dialog
  },
  asyncData ({ store, route }) {
    return store.dispatch('orderItem/getOrder', route.params.orderId);
  },
  data () {
    return {
      upDateRemarkDialogVisible: false,
      cancelOrderDialogVisible: false
    };
  },
  registerModule (store, preserveState) {
    store.registerModule('orderItem', OrderItemStore, { preserveState });
  },
  destroyed () {
    this.$store.unregisterModule('orderItem');
  },
  methods: {
    handleClose (done) {
      done();
    },
    async submitRemark () {
      const orderId = this.$route.params.orderId;
      const remark = this.remark;
      await this.$store.dispatch('orderItem/orderRemark', {orderId, remark});
      await this.$store.dispatch('orderItem/getOrder', orderId);
      this.closeRemarkDialog();
    },
    async submitCancel () {
      const orderId = this.$route.params.orderId;
      await this.$store.dispatch('orderItem/cancelOrder', orderId);
      await this.$store.dispatch('orderItem/getOrder', orderId);
      this.closeCancelOrderDialog();
    },
    showCancelOrderDialog () {
      this.cancelOrderDialogVisible = true;
    },
    closeCancelOrderDialog () {
      this.cancelOrderDialogVisible = false;
    }
  },
  computed: {
    remark: {
      get () {
        return this.$store.state.orderItem.remark || '';
      },
      set (val) {
        this.$store.commit('orderItem/setRemark', val);
      }
    }
  }
};
</script>

<style scoped>

@import 'config.css';

.fl {
  float: left;
}

.fr {
  float: right;
}

.container {
  padding: 60px 56px;
  background-color: #fff;
}

.form-wrapper {
  border: 1px solid #979797;
  border-radius: 4px;
}

.content-input {
  border: 1px solid #999;
  width: 100%;
  padding: 10px;
  min-height: 100px;
}

.remark-dialog {
  .el-dialog {
    width: 430px;
  }
  .h-btn {
    display: inline-block;
    width: 178px;
    width: 45%;
    margin-top: 20px;
    &:first-child {
      float: left;
    }
    &:last-child {
      float: right;
    }
  }
}
.cancel-dialog {
   .h-btn {
    display: inline-block;
    width: 178px;
    width: 45%;
    margin-top: 20px;
    &:first-child {
      float: left;
    }
    &:last-child {
      float: right;
    }
  }
}

/deep/ .el-dialog {

}

@media (--sm-viewport) {
  .order-view {
    padding: 0;
    padding-top: 20px;
  }
  /deep/ .remark-dialog {
    .el-dialog {
      width: 80%;
    }
  }
}
</style>
