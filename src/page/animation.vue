<template>
  <div class="animation">
    <div class="btn" @click="show = !show">开始动画</div>
    <div class="base-box">参照</div>
    <div class="box">
      <transition name="ani">
        <div v-show="show" class="slider"></div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  }
}
</script>

<style scoped>
.animation{
  font-size: 16px;
}
.btn{
  margin: 50px auto 0;
  width: 100px;
  height: 36px;
  background: #4280f0;
  border-radius: 6px;
  text-align: center;
  line-height: 36px;
  color: #fff;
}
.base-box,.box{
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  overflow: hidden;
}
.base-box{
  margin-top: 50px;
  background: pink;
  border-color: pink;
  text-align: center;
  line-height: 100px;
  font-size: 16px;
  color: #fff;
}
.slider{
  width: 100%;
  height: 100%;
  background: #4280f0;
  transition: transform 3s ease-out;
}
.ani-enter{ /*过度的开始状态*/
  transform: translate3d(-100%, -100%, 0);
}
/*定义过度生效时的状态。这个类被用来定义进入过度的过程时间，延迟和曲线函数*/
.ani-enter-active{
  /*transition: transform 3s ease-out;*/
}
.ani-enter-to{ /*过度的结束状态*/
  transform: translate3d(0, 0, 0);
}
.ani-leave{
  /*transform: translate3d(0, 0, 0);*/
}
.ani-leave-active{
  /*transition: transform .3s ease-out;*/
}
.ani-leave-to{
  transform: translate3d(100%, 100%, 0);
}
</style>
