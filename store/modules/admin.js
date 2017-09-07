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
    return new Promise((resolve) => {
      const repeat = state.categories.some((item) => item.name === payload.name)
      if (!repeat && payload.name && (typeof payload.name === 'string')) {
        http.post('/add-category', {title: payload})
          .then(() => {
            resolve('success')
            http.get('/get-documents-names')
              .then((res) => {
                commit(types.GET_DOCUMENTS_NAMES, {payload: res.data})
              })
          })
      } else {
        throw new Error('неверное название категории')
      }
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
