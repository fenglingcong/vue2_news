<template>
  <footer class="index-footer" v-if="visible">
    <div class="logo center"></div>
    <div class="text center">
      <p class="title">健康头条</p>
      <p class="title-sub">看头条，知健康</p>
    </div>
    <a href="http://www.baidu.com" target="_blank" class="down-btn center">立即下载</a>
    <a class="close-btn center" @click="close"></a>
  </footer>
</template>

<script>
import cache from '@/utils/cache.js'
export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    close () {
      this.visible = false
      cache.setSession('downLoad', 'false') // 关闭之后不会再次出现
    }
  },
  mounted () {
    if (!cache.getSession('downLoad')) {
      this.visible = true
    }
  }
}
</script>

<style lang="stylus">
.index-footer{
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  width: 100%;
  height: 50px;
  overflow: hidden;
  background: rgba(0, 0, 0, .7);
  color: #fff;
  .center{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .logo{
    left: 10px;
    width: 35px;
    height: 35px;
    background-image: url(../../../assets/img/downLoad.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 35px;
  }
  .text{
    left: 50px;
    font-size: 15px;
    .title-sub{
      font-size: 12px;
    }
  }
  .down-btn{
    right: 40px;
    padding: 0 10px;
    display: inline-block;
    width: 80px;
    border-radius: 6px;
    background: #00939c;
    line-height: 30px;
    text-align: center;
    font-size: 13px;
    color: #fff;
    text-decoration: none;
  }
  .close-btn{
    right: 0;
    width: 40px;
    height: 100%;
    background-image: url(https://s3a.pstatp.com/resource/growth/mobile_detail/static/image/banner_ic_close_6951b35.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 14px;
  }
}
</style>
