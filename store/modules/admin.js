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
    const repeat = state.categories.some((item) => item.name === payload)
    if (!repeat && payload && (typeof payload === 'string')) {
      return http.post('/add-category', {title: payload})
        .then((res) => {
          if (res.data.error) {
            throw new Error(res.data.error)
          }
          console.log('ew', res)
          http.get('/get-documents-names')
            .then((res) => {
              commit(types.GET_DOCUMENTS_NAMES, {payload: res.data})
            })
        })
    } else {
      return Promise.reject(new Error('Категория уже существует'))
    }
  },
  getDocumentsNames ({commit}) {
    return http.get('/get-documents-names')
      .then((res) => {
        if (res.data.error) {
          throw new Error(res.data.error || res.data.err.errmsg)
        }
        commit(types.GET_DOCUMENTS_NAMES, {payload: res.data})
      })
  },
  addArticle ({commit}, data) {
    return http.post('/add-article', data)
  },
  changeView ({commit}, article) {
    commit(types.CHANGE_VIEW, {payload: article})
  },
  deleteArticle ({commit}, payload) {
    console.log('pa', payload)
    commit(types.DELETE_ARTICLE, payload)
    return http.post('/delete-article', {
      category: payload.category,
      article: payload.article
    })
  },
  deleteCategory ({commit}, payload) {
    commit(types.DELETE_CATEGORY, payload)
    return http.post('/delete-category', {
      category: payload.category
    }).then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error.message || res.data.err.errmsg)
      }
      return res
    })
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
  [types.DELETE_CATEGORY] (state, payload) {
    state.categories.splice(payload.catIndex, 1)
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
