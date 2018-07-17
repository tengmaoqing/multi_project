<template>
  <section class="container">
    <!-- 联系方式 -->
    <div class="card-box">
      <cell title="联系方式"></cell>
      <hInput class="form-item" placeholder="输入用户姓名" v-model="form.nickname" clearable></hInput>
      <hInput class="form-item" placeholder="输入手机号码" v-model="form.mobile" clearable></hInput>
    </div>
    <!-- 回收方式 -->
    <div class="card-box">
      <cell title="回收方式"></cell>
      <ul class="recycle-list">
        <li class="recycle-item"
          :class="{'is-active': index === recycleId}"
          v-for="(item, index) in recycleList"
          :key="index"
          @click="recycleTap(index)">{{ item.text }}</li>
      </ul>
      <!-- 顺丰上门 -->
      <div class="form-box" v-show="recycleId===0">
        <hInput class="form-item" placeholder="顺丰上门城市" v-model="sfForm.city" clearable></hInput>
        <hInput class="form-item" placeholder="详细地址" v-model="sfForm.address" clearable></hInput>
        <hInput class="form-item" placeholder="顺丰上门时间" v-model="sfForm.address" clearable></hInput>
      </div>
      <!-- 工程师上门 -->
      <div class="form-box" v-show="recycleId===1">
        <hInput class="form-item" placeholder="工程师上门城市" v-model="sfForm.city" clearable></hInput>
        <hInput class="form-item" placeholder="详细地址" v-model="sfForm.address" clearable></hInput>
        <hInput class="form-item" placeholder="工程师上门时间" v-model="sfForm.address" clearable></hInput>
      </div>
    </div>
    <div class="card-box">
      <cell title="收款方式"></cell>
      <ul class="pay-list">
        <li class="pay-item"
          :class="{'is-active': index === payId}"
          v-for="(item, index) in payList"
          :key="index"
        @click="payTap(index)">{{ item.text }}</li>
      </ul>
    </div>
    <div class="card-box">
      <!-- 微信扫码 -->
      <div class="form-box" v-show="payId===0">
        <hInput class="form-item" placeholder="微信扫码" v-model="sfForm.city" clearable></hInput>
      </div>
      <!-- 支付宝扫码 -->
      <div class="form-box" v-show="payId===1">
        <hInput class="form-item" placeholder="支付宝扫码" v-model="sfForm.city" clearable></hInput>
      </div>
      <!-- 支付宝扫码 -->
      <div class="form-box" v-show="payId===2">
        <hInput class="form-item" placeholder="银行卡信息" v-model="sfForm.city" clearable></hInput>
      </div>
    </div>
    <div class="mask">
      <Picker :data="[1, 2, 3, 4, 5, 6]" :visieble="true"></Picker>
    </div>
  </section>
</template>

<script type="text/javascript">
import evStore from '@/core/ev-info/store';
import hButton from '@/components/button';
import Checkbox from '@/components/checkbox';
import Radio from '@/components/radio';
import Cell from '@/components/cell';
import hInput from '@/components/input';
import Picker from '@/components/picker';

export default {
  asyncData ({ store, route }) {
    return store.dispatch('evaluate/getEvInfo', route.params.evID);
  },
  data () {
    return {
      recycleId: 0, // 顺丰回收(1)  工程师上门回收(2) 自己邮寄(3)
      payId: 0, // 微信收款(0) 支付宝收款(1) 银行卡收款(2)
      recycleList: [
        {
          text: '顺丰上门'
        },
        {
          text: '工程师上门'
        },
        {
          text: '自己邮寄'
        }
      ],
      payList: [{text: '微信收款'}, {text: '支付宝收款'}, {text: '银行卡收款'}],
      form: {
        mobile: '13249064450',
        nickname: '测试高雄'
      },
      sfForm: {
        city: '',
        address: ''
      }
    };
  },
  methods: {
    recycleTap (index) {
      this.recycleId = index;
    },
    payTap (index) {
      this.payId = index;
    }
  },
  registerModule (store, preserveState) {
    store.registerModule('evaluate', evStore, { preserveState });
  },
  destroyed () {
    this.$store.unregisterModule('evaluate');
  },
  components: {
    hButton,
    Checkbox,
    Radio,
    Cell,
    hInput,
    Picker
  }
};
</script>

<style src="./init-order.css"></style>
