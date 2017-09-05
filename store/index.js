import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import admin from './modules/admin'
// import * as types from './mutation-types'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules: {
    admin
  },

  state: {},
  mutations: {}
})

export default store
