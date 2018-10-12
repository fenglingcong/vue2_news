<template>
  <swiper :options="swiperOption" id="swiper-box" ref="mySwiper">
    <swiper-slide v-for="(item, index) in indexColumn" :key="index">
      <pullContainer :type="item.classpath" />
    </swiper-slide>
  </swiper>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import pullContainer from './pullContainer'
export default {
  data () {
    return {
      swiperOption: {
        noNextTick: true,
        on: {
          sliderMove: this.slideMoveCallBack, // 移动的时候
          slideChange: this.slideChangeCallBack, // 滚动完改变
          touchEnd: this.touchEndCallBack // 释放即执行
        }
      }
    }
  },
  components: {
    pullContainer
  },
  computed: {
    ...mapState('index', [
      'indexColumn',
      'indexActive'
    ]),
    ...mapGetters('index', [
      'activeMeta'
    ]),
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  watch: {
    indexActive () {
      this.slideTo(300)
    }
  },
  methods: {
    ...mapMutations('index', [
      'set_indexActive',
      'set_indexSwiper'
    ]),
    // 滚动到指定index的位置
    slideTo (speed) {
      this.swiper.slideTo(this.activeMeta.index, speed, true)
    },
    slideChangeCallBack () {
      let index = this.swiper.activeIndex
      this.set_indexActive(this.indexColumn[index].classpath) // 滚动完改变active栏目，使其一致
    },
    // 待完成功能
    slideMoveCallBack () {
      this.set_indexSwiper(true)
    },
    touchEndCallBack () {
      this.set_indexSwiper(false)
    }
  },
  mounted () {
    this.slideTo(0)
  }
}
</script>

<style lang="stylus">
#swiper-box{
  padding-top: 80px;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
