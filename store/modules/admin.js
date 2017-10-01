import * as types from '../mutation-types'
import {http} from '~/plugins/axios'

const state = {
  categories: [],
  view: 'main',
  editedArticle: null
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
  getArticle ({state}) {
    return http.post('/get-article', state.editedArticle)
      .then((res) => {
        if (res.data.error) {
          throw new Error(res.data.error || res.data.err.errmsg)
        }
        return res
      })
  },
  addArticle ({commit}, data) {
    return http.post('/add-article', data)
  },
  editArticle ({commit}, data) {
    return http.post('/edit-article', data)
  },
  deleteArticle ({commit}, payload) {
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
  [types.SET_EDITED_ARTICLE] (state, payload) {
    if (payload) {
      state.editedArticle = {
        category: state.categories[payload.catIndex].name,
        article: state.categories[payload.catIndex].articles[payload.artIndex].name
      }
    } else {
      state.editedArticle = null
    }
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
  [types.CHANGE_VIEW] (state, payload) {
    state.view = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
