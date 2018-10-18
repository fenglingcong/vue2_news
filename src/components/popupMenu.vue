<template>
  <div id="popupMenu">
    <transition name="toggleSide">
      <div class="functionItem" v-show="visible">
        <slot></slot>
        <div class="cancel" @click="cancel">取消</div>
      </div>
    </transition>
    <div class="black" @click="cancel" v-show="visible"></div>
    <input type="text" :value="value" style="display:none">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false
    }
  },
  watch: {
    value (val) {
      this.visible = val
    },
    visible (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    cancel () {
      this.visible = false
    }
  }
}
</script>

<style lang="stylus">
#popupMenu{
  .functionItem{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1002;
    width: 100%;
    background: #f8f8f8;
    transition: transform .3s ease-out;
  }
  .cancel{
    width: 100%;
    height: 50px;
    background: #f8f8f8;
    border-top: 1px solid rgb(233, 233, 233);
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #333;
  }
  .black{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
  }
}
.toggleSide-enter, .toggleSide-leave-to{
  transform: translate3d(0, 100%, 0);
}
.toggleSide-enter-to{
  transform: translate3d(0, 0, 0);
}
</style>
