import Vue from 'vue'
import goTop from './goTop'
import slide from './slide'

// 点击头部返回页面顶部
Vue.directive('goTop', {
  inserted: function (el, binding, vnode) {
    if (binding.value) {
      goTop(el, binding.arg, vnode.context)
    } else {
      return ''
    }
  }
})

// 返回上一页
Vue.directive('slide', {
  inserted: function (el, binding, vnode) {
    if (binding.value) {
      slide(el, binding.arg, binding.value, vnode.context)
    } else {
      return ''
    }
  }
})
