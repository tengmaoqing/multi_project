<template>
  <div>
    <el-upload
      ref="upload"
      :action="action"
      list-type="picture-card"
      :on-success="handleAvatarSuccess"
      :on-error="handleError"
      :auto-upload="false"
      :multiple="true"
      :limit="limit"
      :on-exceed="handleExceed"
      :on-preview="handlePictureCardPreview"
      :before-upload="beforeAvatarUpload"
      >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import { Upload, Dialog } from 'element-ui';
import { Toast } from 'mint-ui';
// import photoCompress from '@/helper/imageCompress';

export default {
  props: {
    // 上传地址
    action: String,
    // 数量限制
    limit: {
      type: Number,
      default: 1
    },
    // 多张选择
    multiple: {
      type: Boolean,
      default: true
    },
    // 上传文件大小限制(kb)
    size: {
      type: Number,
      default: 10
    }
  },
  components: {
    'el-upload': Upload,
    'el-dialog': Dialog
  },
  data () {
    return {
      imageUrl: '',
      elmUrl: 'https://jsonplaceholder.typicode.com/posts/',
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const validator = [];
      validator.push(() => {
        let isPassed = file.size / 1024 < this.size;
        if (!isPassed) {
          Toast({
            message: `图片大小不能超过${this.size}k!`,
            position: 'bottom',
            duration: 2000
          });
        }
        return isPassed;
      });

      return !validator.some(v => v());
    },
    handleError (e) {
      this.$emit('error', e);
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed (data) {
      Toast({
        message: `图片数量不能超过${this.limit}张!`,
        position: 'bottom',
        duration: 2000
      });
    },
    submit () {
      this.$refs.upload.submit();
    }
  }
};
</script>
