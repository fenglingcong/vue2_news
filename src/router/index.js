import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由懒加载
const Index = () => import('@/page/index/index')

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    }
  ]
})
