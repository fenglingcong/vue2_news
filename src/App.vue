<template>
  <div id="app">
    <transition :name='transitionName'>
      <keep-alive exclude="detail">
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: ''
    }
  },
  beforeRouteUpdate (to, from, next) {
    let isBack = this.$router.isBack
    if (isBack) {
      this.transitionName = 'slide-right' // 返回
    } else {
      this.transitionName = 'slide-left'
    }
    this.$router.isBack = false
    next()
  }
}
</script>

<style lang="stylus">
#app {
  position: relative;
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  overflow: hidden;
  .child-view{
    transition: all .3s ease;
  }
}
.slide-left-enter {
    transform: translate3d(0, 0, 0);
}
.slide-left-leave-to {
    transform: translate3d(-100%, 0, 0);
}
.slide-right-enter {
    transform: translate3d(0, 0, 0);
}
.slide-right-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>
