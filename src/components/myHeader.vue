<template>
  <header class="myHeader" :class="{'fixed': fixed}">
    <div class="top_bar">
      <div class="abs_l"><slot name="left"></slot></div>
      <div class="abs_m">{{title}}<slot name="middle"></slot></div>
      <div class="abs_r"><slot name="right"></slot></div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    fixed: {
      type: Boolean,
      default: true
    },
    title: String
  }
}
</script>

<style lang="stylus">
.myHeader{
  display: block;
  position: relative;
  background: #00939c;
  font-size: 16px;
  color: #fff;
  overflow: hidden;
  &.fixed{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 666;
  }
  .top_bar{
    display: flex;
    align-items: center;
    position: relative;
    height: .5rem;
    user-select: none;
    a{
      display: inline-block;
      width: .5rem;
      height: 100%;
    }
    .abs_l, .abs_r{
      height: 100%;
    }
    .abs_m{
      flex: 1;
      font-weight: 700;
      text-align: center;
    }
  }
}
</style>
