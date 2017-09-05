import * as types from '../mutation-types'
import {http} from '~/plugins/axios'

const state = {
  categories: []
}

const getters = {
  categories: (state) => state.categories
}

const actions = {
  addCategory ({commit, state}, payload) {
    return http.post('/add-category', {title: payload})
      .then(() => {
        console.log('1')
        http.get('/get-documents-names')
          .then((res) => {
            commit(types.GET_DOCUMENTS_NAMES, {payload: res.data})
          })
      })
      .catch((error) => {
        throw new Error(error)
      })
  },
  getDocumentsNames ({commit}) {
    http.get('/get-documents-names')
      .then((res) => {
        commit(types.GET_DOCUMENTS_NAMES, {payload: res.data})
      })
  },
  updateCategories ({commit}, payload) {
    commit(types.UPDATE_CATEGORY, payload)
  }
}

const mutations = {
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

export default {
  state,
  getters,
  actions,
  mutations
}
