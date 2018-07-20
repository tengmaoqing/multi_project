<template>
  <section class="container">
    <div class="header text-center">
      <img class="logo" src="../../assets/logo.png" alt="logo">
      <p class="text-sz-s-title">待命名经纪</p>
    </div>
    <el-form ref="form" :model="form" label-width="0">
      <el-form-item>
        <el-input placeholder="手机号" class="is-bt-border" v-model="form.tel">
          <template slot="prepend">
            <i class="el-icon-mobile-phone icon"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="密码" :type="type" class="is-bt-border" v-model="form.pwd">
          <template slot="prepend">
            <i class="el-icon-mobile-phone icon"></i>
          </template>
          <template slot="append">
            <i class="el-icon-view icon" @click="type !== 'password' ? type = 'password' : type = 'text' "></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="block" type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
    <div class="actions">
      <router-link class="text-muted" to="/findpwd">
        找回密码
      </router-link>
      <router-link class="text-muted" to="/rigister">
        立即注册
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.header {
  margin: 30px 0;
}
.logo {
  width: 80px;
}

.icon {
  font-size: 24px;
}

.actions {
  display: flex;
  justify-content: space-between;
}
</style>

<script>
import { Form, FormItem, Button, Input } from 'element-ui';

export default {
  components: {
    elForm: Form,
    elFormItem: FormItem,
    elButton: Button,
    elInput: Input
  },
  data () {
    return {
      form: {
        tel: '',
        pwd: ''
      },
      type: 'password'
    };
  },
  methods: {
    onSubmit () {
      console.log(this.$ref.form);
    }
  }
};
</script>
