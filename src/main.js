// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// css
import '@/assets/css/reset.css'
import '@/assets/css/icon.css'

// 第三方库
import MintUI, { MessageBox, Toast, Indicator } from 'mint-ui' // 饿了么移动端组件
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper' // swiper
import 'swiper/dist/css/swiper.css'

// 自定义组件
import myLoading from '@/components/loading' // loading组件
import listInfo from '@/components/info' // 文章列表信息组件
import listItem from '@/components/listItem' // 文章列表组件

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(MintUI)
Vue.prototype.$toast = Toast
Vue.prototype.$indicator = Indicator
Vue.prototype.$msgBox = MessageBox

// 全局注册组件
Vue.component('myLoading', myLoading)
Vue.component('listInfo', listInfo)
Vue.component('listItem', listItem)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
