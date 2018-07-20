<template>
  <section class="ad">
    <div class="ad-title mb-lg">
      <b class="text-sz-sub-title text-black text-ellipsis title">
        软文营销
      </b>
      <span class="text-ellipsis">| 未来房价会大跌未来房价会大跌未来房价会大跌。。</span>
      <i class="el-icon-arrow-right text-sz-sub-title"></i>
    </div>
    <swiper class="swiper-wrap" :options="swiperOption">
      <swiper-slide v-for="(item, index) in list" :key="index">
        <a class="link" :href="item.link ? item.link : 'javascript:;'" :style="{'background-image': 'url(' + item.img + ')'}">
        </a>
      </swiper-slide>
      <div v-show="list.length > 1" class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </section>
</template>

<style scoped>
.ad-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  display: block;
  width: 80px;
  flex-shrink: 0;
}

.swiper-wrap {
  height: 100px;
}
.link {
  display: block;
  width: 100%;
  height: 100%;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      list: [{
        link: '/',
        img: 'https://www.baidu.com/img/bd_logo1.png?qua=high'
      }],
      pop: {
        show: false,
        context: ''
      },
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    };
  }
};
</script>
