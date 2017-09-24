import * as types from '../mutation-types'
import {http} from '~/plugins/axios'

const state = {
  categories: [],
  view: 'main'
}

const getters = {
  pureCategories: (state) => {
    return state.categories.map((item) => {
      return item.name
    })
  }
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
  sendForm ({commit}, data) {
    http.post('/add-article', data)
  },
  updateCategories ({commit}, payload) {
    commit(types.UPDATE_CATEGORY, payload)
  },
  changeView ({commit}, article) {
    commit(types.CHANGE_VIEW, {payload: article})
  }
}

const mutations = {
  [types.GET_DOCUMENTS_NAMES] (state, {payload}) {
    state.categories = payload
  },
  [types.DELETE_ARTICLE] (state, payload) {
    state.categories[payload.catIndex].articles.splice(payload.artIndex, 1)
    return state.categories
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
  },
  [types.CHANGE_VIEW] (state, {payload}) {
    state.view = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
