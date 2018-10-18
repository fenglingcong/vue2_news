import Vue from 'vue'
import Vuex from 'vuex'
import indexModule from './modules/index'
import detailModule from './modules/detail'

Vue.use(Vuex)

// 本项目是vuex的modules，旨在练习vuex
// 这里的全局状态可以用来管理类似：登录等状态
const state = {}
const getters = {}
const mutations = {}
const actions = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    index: indexModule,
    detail: detailModule
  }
})
