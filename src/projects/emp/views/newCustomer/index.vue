<template>
  <section class="container">
    <el-form ref="form" :model="form" label-width="0">
      <el-form-item>
        报备新盘 <span class="text-danger">*</span>
      </el-form-item>

      <el-form-item>
        <el-input placeholder="填写您的真实姓名" class="is-bt-border" v-model="form.name">
          <template slot="prepend">
            姓名 <span class="text-danger">*</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="输入手机号" class="is-bt-border" v-model="form.tel">
          <template slot="prepend">
            手机 <span class="text-danger">*</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        性别 <span class="text-danger">*</span>
        <el-checkbox v-model="form.sex">先生 </el-checkbox>
        <el-checkbox v-model="form.sex">女士 </el-checkbox>
      </el-form-item>

      <el-form-item>
        购房意向
      </el-form-item>
      <el-form-item>
        <el-input type="textarea" placeholder="客户描述。。。" v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button class="block" type="primary" @click="onSubmit">立即创建</el-button>
    </div>
  </section>
</template>

<style scoped>
@import 'config.css';
/deep/ .el-input-group__prepend {
  padding-left: 0;
  color: $global-base-color;
}
</style>

<script>
import { Form, FormItem, Button, Input, Checkbox } from 'element-ui';

export default {
  components: {
    elForm: Form,
    elFormItem: FormItem,
    elButton: Button,
    elInput: Input,
    elCheckbox: Checkbox
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
