import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

Router.prototype.go = function () {
  this.isBack = true
  window.history.go(-1)
}

// 路由懒加载
const Index = () => import('@/page/index/index')
const detail = () => import('@/page/detail/detail')
const animation = () => import('@/page/animation')

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/index',
      component: App,
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index
        },
        {
          path: '/detail',
          name: 'detail',
          component: detail
        },
        {
          path: '/animation',
          name: 'animation',
          component: animation
        }
      ]
    }

  ]
})
