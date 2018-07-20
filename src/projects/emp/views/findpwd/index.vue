<template>
  <section>
    <el-form ref="form" :model="form" label-width="0" class="container bg-white mb-lg mt-base ">
      <el-form-item>
        <el-input placeholder="输入手机号" class="is-bt-border" v-model="form.tel">
          <template slot="prepend">
            手机号码 <span class="text-danger">*</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="输入验证码" :type="type" class="is-bt-border" v-model="form.code">
          <template slot="prepend">
            验&#8194;证&#8194;码 <span class="text-danger">*</span>
          </template>
          <template slot="append">
            获取验证码
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="至少6个数字或字母" :type="type" class="is-bt-border" v-model="form.pwd">
          <template slot="prepend">
            重置 <span class="text-danger">*</span>
          </template>
          <template slot="append">
            <i class="el-icon-view icon" @click="type !== 'password' ? type = 'password' : type = 'text' "></i>
          </template>
        </el-input>
      </el-form-item>

    </el-form>
    <div class="container">
      <el-button class="block" type="primary" @click="onSubmit">立即创建</el-button>
    </div>
  </section>
</template>

<style scoped>

.icon {
  font-size: 24px;
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
