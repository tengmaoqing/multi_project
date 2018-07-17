<template>
  <div v-if="isMobile">
    <slot v-if="$slots.reference" name="reference"></slot>
    <popup position="bottom" v-model="popupVisbile">
      <slot></slot>
    </popup>
  </div>
  <div v-else>
    <popover
      :trigger="trigger"
      :append-to-body="appendToBody"
      :visible-arrow="visibleArrow"
      v-model="popupVisbile"
      :reference="reference"
    >
      <slot v-if="$slots.reference" name="reference" slot="reference"></slot>
      <slot></slot>
    </popover>
  </div>
</template>

<style type="text/css">

.mint-popup-bottom.mint-popup {
  width: 100%;
  padding: 15px;
}
</style>

<script type="text/javascript">
import { Popover } from 'element-ui';
import { Popup } from 'mint-ui';
import isMobile from 'ismobilejs';

export default {
  components: {
    Popover,
    Popup
  },
  props: {
    value: Boolean,
    visibleArrow: Boolean,
    appendToBody: Boolean,
    reference: {},
    slotReference: {},
    trigger: {
      type: String,
      default: 'click'
    }
  },
  computed: {
    popupVisbile: {
      get () {
        return this.value;
      },

      set (v) {
        this.$emit('input', v);
      }
    }
  },
  data () {
    return {
      isMobile: isMobile.phone
    };
  }
};
</script>
