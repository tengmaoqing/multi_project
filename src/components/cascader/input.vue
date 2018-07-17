<template>
  <div class="cascader-wrapper" :class="{'is-opening': popupVisbile}" @keyup.8="reset">
    <h-input @click.native="popupVisbile = true" :size="size" @focus="popupVisbile = true" suffixIcon="el-icon-arrow-down" :placeholder="placeholder" ref="reference" :name="name" v-model="selects" readonly></h-input>

    <popover v-model="popupVisbile" :reference="$refs.reference && $refs.reference.$el">
      <slot></slot>
    </popover>
    <!-- <template v-if="!isXssCreen">
      <popover
        trigger="click"
        :append-to-body="false"
        :visible-arrow="false"
        v-model="popupVisbile"
      >
        <h-input slot="reference" :placeholder="placeholder" :name="name" v-model="selects" readonly></h-input>
        <slot></slot>
      </popover>
    </template>
    <template v-else>
    </template> -->
  </div>
</template>

<style type="text/css">

.cascader-wrapper {
  display: inline-block;
}

.cascader-wrapper .el-input__inner {
  cursor: pointer;
}

.cascader-wrapper .el-popper {
  width: 100%;
  padding: 0;
}

.cascader-wrapper .mint-popup-bottom.mint-popup {
  padding: 0;
}

.cascader-wrapper.is-opening .el-input__suffix {
  transform: translateY(-50%) rotate(180deg);
}
</style>

<script type="text/javascript">
import hInput from '../input';
import isMobile from 'ismobilejs';
import Popover from '../popover';

export default {
  components: {
    Popover,
    // Popup,
    hInput
  },
  computed: {
    isXssCreen () {
      return isMobile.phone;
    }
  },
  props: {
    selects: String,
    // visible: Boolean,
    placeholder: String,
    name: String,
    size: String
  },
  methods: {
    close () {
      this.popupVisbile = false;
    },
    reset () {
      this.$emit('reset');
    }
  },
  data () {
    return {
      popupVisbile: false
    };
  }
};
</script>
