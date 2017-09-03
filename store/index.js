import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import admin from './modules/admin'
import * as types from './mutation-types'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules: {
    admin
  },

  state: {
    categories: []
  },
  mutations: {
    [types.GET_DOCUMENTS_NAMES] (state, {payload}) {
      state.categories = payload
    },
    [types.UPDATE_CATEGORY] (state, {payload}) {
      state.categories = state.categories.map((item) => {
        if (item.name !== payload.name) {
          return item
        } else {
          return {
            name: payload.name,
            articles: payload.data
          }
        }
      })
    }
  }
})

export default store
