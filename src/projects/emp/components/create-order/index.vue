<template>
  <section class="container">
    <div class="form-group">
      <pannel label="结算清单" class="bill" body-position="top">
        <div class="clearfix">
          <div class="product-img col-left">
            <img class="img-responsive" v-if="evInfo.pic" :src="evInfo.pic" alt="">
          </div>
          <div class="payment-info col-right">
            <div class="payment-item">
              <div class="payment-title text-muted">型号</div>
              <div class="payment-value">{{ evInfo.productName }}</div>
            </div>
            <div class="payment-item">
              <div class="payment-title text-muted">回收价</div>
              <div class="payment-value">{{ evInfo.quotation | fen2yuan }}</div>
            </div>

            <div class="payment-item pointer" v-for="active in activeList" :key="active.activityId">
              <div class="payment-title text-muted">{{ active.activityName }}</div>
              <div class="payment-value">
                <span slot="reference" @click="setActivityPop(active.activityDes)">
                  {{ active.couponMoney | fen2yuan }}
                </span>
              </div>
            </div>

            <popup v-model="activityPop.show" class="e-popup">
              <!-- <div v-html="activityPop.activityDes"></div> -->
              <div>
                <p>
                  1，活动期间送实物大奖，回收成功后按照成交金额统计，金额最高（若同金额则以成交时间早者得），免费获得努比亚v18一部！具体制式、颜色等以收到实物为准。以下单手机号为统计维度。
                </p>
                <p>
                  2，全场满加。检测价指的是：根据收到设备实物，根据实际情况检测的价格。
                  检测价100~199元，加价8元，<br>
                  检测价200~499元，加价18元，<br>
                  检测价500~699元，加价38元，<br>
                  检测价700~999元，加价58元，<br>
                  检测价1000~1500元，加价88元，<br>
                  检测价大于1500元，加价158元。
                </p>
                <p>
                  3，指定机型加价6.18%。nubia Z17mini、nubiaZ11、Iphone7plus、小米MIX，若回收的是这4款机型，将享受6.18%的活动额外加价，金额向下取整。
                </p>
                <p>
                </p>
                  4，成功回收指的是用户确认交易并获得对应的回收代金券。
                <p>
                </p>
                  5，本活动回收宝拥有在法律范围内的最终解释权，如有任何问题可联系客服电话：400-080-9966.
                <p>
                  6，如发现任何恶意刷单、破坏公平原则的形式将取消获奖资格。
                </p>

              </div>
            </popup>

            <div class="payment-item p-r">
              <div class="payment-title text-muted">小计(元)</div>
              <div class="payment-value text-danger">{{ totalPrice | fen2yuan }}</div>
            </div>

            <div class="payment-item payway">
              <div class="payment-title text-muted">收款方式</div>
              <div class="payment-value pointer">
                <span ref="lm" @click="popupVisbile1 = true">
                  回收代金券 <img class="svg-icon" src="../../assets/q.svg">
                </span>
                <popover class="popover-l" v-model="popupVisbile1" :append-to-body="true" :reference="$refs.lm">
                  1、旧手机回收款将以“回收代金券”的形式发放到努比亚账户上，<br>多次回收的代金券金额会叠加在账户上展示；<br>
                  2、回收代金券不可提现，可在努比亚商城全场购物通用，<br>可直接用于抵扣订单金额（订单满0元即可使用）；<br>
                  3、当发生退货退款时，对应订单使用的回收代金券金额会退回到用户的努比亚账户上；<br>
                </popover>
              </div>
            </div>

          </div>
        </div>
      </pannel>
    </div>

    <div class="form-group">
      <pannel label="回收方式">
        <radio class="text-center" v-model="form.recycleType" label="1">
          <img class="sf-icon" src="./img/sf.svg">
          邮寄回收（顺丰包邮）
        </radio>
        <!-- <radio class="el-input__inner text-center" v-model="form.recycleType" label="2"> 上门回收 </radio> -->
      </pannel>
    </div>

    <div class="form-group" ref="form">
      <pannel label="个人信息">
        <error-wrap :error="errors.has('name')" error-msg="请输入姓名">
          <h-input size="large" class="b-input" placeholder="姓名" v-validate="'required'" name="name" :maxlength="20" v-model="form.userName"></h-input>
        </error-wrap>
        <error-wrap :error="errors.has('tel')" :error-msg="errors.first('tel')">
          <h-input size="large" class="b-input" placeholder="联系电话" v-validate="'required|tel'" data-vv-as="联系电话" name="tel" :maxlength="20" v-model="form.tel"></h-input>
        </error-wrap>
      </pannel>

      <pannel hidexs>
        <error-wrap :error="errors.has('sfcity')" error-msg="请选择城市">
          <cascader size="large" v-model="selectedSFCity" v-validate="'required'" name="sfcity" placeholder="选择城市" :options="sfCtiys" :titles="['省', '市', '区']" :props="{label: 'areaName', value: 'areaName', children: 'children' }"></cascader>
        </error-wrap>
        <error-wrap :error="errors.has('sfaddr')" error-msg="请输入详细地址">
          <h-input size="large" class="b-input" placeholder="详细地址" v-validate="'required'" name="sfaddr" :maxlength="30" v-model="form.address"></h-input>
        </error-wrap>
      </pannel>

      <pannel label="预约日期" hidexs>
        <error-wrap :error="errors.has('sftime')" error-msg="请选择预约日期">
          <cascader size="large" v-model="selectedTimes" v-validate="'required'" name="sftime" placeholder="选择预约日期" :options="sfSupportVisitTime" :props="{label: 'name', value: 'value', children: 'sub' }" :titles="['日期', '时段']"></cascader>
        </error-wrap>
      </pannel>
    </div>

    <div class="form-group clearfix">
      <pannel label="注意事项" body-position="top">
        <p>
          <b>解锁</b>
        </p>
        <p class="text-muted mt-base mb-base">
          请解除开机密码并且注销手机账户，以确保您的隐私安全和顺利质检；对未解锁的手机，我们将拒签退回。
        </p>
        <span class="text-primary pointer" ref="js" @click="popupVisbile2 = true">
          如何解锁 <img class="svg-icon" src="../../assets/q.svg">
        </span>
        <popover v-model="popupVisbile2" append-to-body :reference="$refs.js">
          <p>
            ios设备（关闭iCloud和屏幕锁）：
          </p>
          <p>
            1.选择【设置】-> 点击最上方的【账号】->【iCloud】<br/>->【查找我的iPhone】->【关闭】–输入密码（部分机型没有查找我的iPhone）；
          </p>
          <p>
            2.选择【设置】-> 点击最上方的【账号】->【退出登录】<br/>-> 输入Apple ID密码，点击【关闭】
          </p>
          <p>
          3.【设置】->【Touch ID与密码】或者【面容ID与密码】<br/>->输入密码->关闭密码。
          </p>
          <br>
          <p>
            Android设备 账号注销方式：
          </p>
          <p>
          选择【设置】->找到“账号/账户” ->进入页面后，<br/>在最下方点击“退出账号/删除账号”
          </p>
          <p>
          ->确认“删除/注销”
          </p>
          <p>
          注：不同的品牌设备，账号的位置不一致，可以在设置上方的搜索框<br/>输入“账号”或“账户”找到入口，如有疑问可以联系400-080-9966为您服务。
          </p>
        </popover>
      </pannel>

      <hr class="hr">

      <div class="price-info clearfix">
        <div class="fr">
          <div class="clearfix item">
            <div class="col-left text-muted">已选商品</div>
            <div class="col-right text-muted">1件</div>
          </div>
          <div class="clearfix item">
            <div class="col-left text-muted">回收价</div>
            <div class="col-right text-muted">{{ evInfo.quotation | fen2yuan }}</div>
          </div>
          <div class="clearfix item" v-for="active in activeList" :key="active.activityId">
            <div class="col-left text-muted">{{ active.activityName }}</div>
            <div class="col-right text-muted">{{ active.couponMoney | fen2yuan }}</div>
          </div>
          <hr class="hr">
          <div class="clearfix item">
            <div class="col-left text-muted">合计</div>
            <div class="col-right text-sz-price">{{ totalPrice | fen2yuan }}</div>
          </div>
        </div>
      </div>

      <div class="text-right btn fr">
        <!-- <p v-if="">
          * 请先完成必填项
        </p> -->
        <h-button type="primary" size="large" :loading="submitting" @click="createOrder">提交订单</h-button>
      </div>
    </div>

  </section>
</template>

<style type="text/css" src="./index.css" scoped></style>

<script type="text/javascript">
import VeeValidate, { Validator } from 'vee-validate';
import VueScrollTo from 'vue-scrollto';
import evStore from '@/core/ev-info/store';
import Cascader from '@/components/cascader/index';
import Popover from '@/components/popover';
import Pannel from './form-panel';
import Radio from '@/components/radio';
import hInput from '@/components/input';
import hButton from '@/components/button';
import ErrorWrap from './error-wrap';
import isMobilePhone from 'validator/lib/isMobilePhone';
import Vue from 'vue';
import { Toast, Popup } from 'mint-ui';
import { getSfCity, supportVisitTime, createOrder } from '@/apis/base';

Validator.localize('zh-cn', {
  messages: {
    required: (a, b) => {
      return `请输入${a}`;
    }
  }
});

Validator.extend('tel', {
  validate: v => {
    if (isMobilePhone(v, 'zh-CN')) {
      return {
        valid: true
      };
    }
    return {
      valid: false,
      data: {
        message: '请输入正确的联系电话'
      }
    };
  },
  getMessage: (field, params, data) => data.message
});
Vue.use(VeeValidate);

export default {
  asyncData ({ store, route }) {
    return Promise.all([
      // store.dispatch('evaluate/getPayway'),
      store.dispatch('evaluate/getEvInfo', route.params.evID)
    ]);
  },
  registerModule (store, preserveState) {
    store.registerModule('evaluate', evStore, { preserveState });
  },
  destroyed () {
    this.$store.unregisterModule('evaluate');
  },
  components: {
    Cascader,
    Pannel,
    Radio,
    hInput,
    hButton,
    ErrorWrap,
    Popover,
    Popup
  },

  computed: {
    evInfo () {
      return this.$store.state.evaluate.info;
    },

    activeList () {
      return (this.evInfo.activityList && this.evInfo.activityList.slice(0, 2)) || [];
    },

    activeTotalAddPrice () {
      return this.activeList.reduce((pre, item) => {
        return pre + +item.couponMoney;
      }, 0);
    },

    totalPrice () {
      return +this.evInfo.quotation + this.activeTotalAddPrice;
    },

    activityId () {
      return this.activeList.map(at => at.activityId).join(',');
    },

    selectedSfAddr () {
      const [province, city, county] = this.selectedSFCity;
      return {
        province,
        city,
        county
      };
    },

    selectedTime () {
      const [date, time] = this.selectedTimes;
      return {
        time: date + time
      };
    }
  },

  data () {
    return {
      form: {
        tel: '',
        payType: '15',
        recycleType: '1',
        userName: '',
        address: '',
        evaluateid: this.$route.params.evID
      },
      activityPop: {
        activityDes: '',
        show: false
      },
      sfaddr: '',
      sfSupportVisitTime: [],
      sfCtiys: [],
      selectedSFCity: [],
      selectedTimes: [],
      submitting: false,
      popupVisbile1: false,
      popupVisbile2: false
    };
  },
  methods: {
    async init () {
      let sfret = await getSfCity();
      if (sfret._errCode !== 0) {
        this.sfCtiys = sfret._data.areaList;
      }

      let timeRet = await supportVisitTime();
      if (timeRet._errCode !== 0) {
        this.sfSupportVisitTime = timeRet._data.sf;
      }
    },

    setActivityPop (des) {
      this.activityPop.show = true;
      this.activityPop.activityDes = des;
    },

    async createOrder () {
      const result = await this.$validator.validateAll();
      if (!result) {
        VueScrollTo.scrollTo(this.$refs.form, 300);
        return;
      }

      const formData = Object.assign({
        activityId: this.activityId
      }, this.selectedTime, this.selectedSfAddr, this.form);
      this.submitting = true;
      let orderResult = null;
      try {
        orderResult = await createOrder(formData);
      } catch (err) {

      }
      this.submitting = false;
      if (!orderResult || +orderResult._errCode !== 0) {
        Toast(orderResult._errStr);
        return;
      }
      this.$router.push(`/orderResult/${orderResult._data.orderNum}`);
    }
  },
  mounted () {
    this.init();
  }
};
</script>
