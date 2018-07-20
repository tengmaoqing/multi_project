<template>
  <div class="item">
    <div class="img-wrap">
      <img src="" alt="">
    </div>

    <div class="right">
      <div class="header">
        <div class="text-sz-s-title">
          恒基·九里蓝湾
        </div>
        <span class="text-muted">
          12000元/m2
        </span>
      </div>
      <p class="addr text-muted">
        <span>南京栖霞</span>
        <span>线路</span>
        <span class="dis">>200m</span>
      </p>
      <div class="tags">
        <tag class="tag" type="info">推荐</tag>
      </div>

      <div class="bagge text-muted">
        1.9%/套(3个方案)
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-wrap {
  width: 120px;
  height: 87px;
  background-color: #f5f5f5;
  margin-right: 5px;
}

.item {
  padding-top: 15px;
  padding-bottom: 17px;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
}

.right {
  flex: 1;
}

.header {
  display: flex;
  justify-content: space-between;
}

.tag {
  height: 28px;
  line-height: 26px;
}
</style>

<script>
import { Tag } from 'element-ui';
export default {
  components: {
    Tag
  }
};
</script>
