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
      return http.post('/category', {title: payload})
        .then((res) => {
          if (res.data.error) {
            throw new Error(res.data.error)
          }
          http.get('/category/all', { params: { onlyNames: true } })
            .then((res) => {
              commit(types.GET_ARTICLES_NAMES, {payload: res.data})
            })
        })
    } else {
      return Promise.reject(new Error('Категория уже существует'))
    }
  },
  deleteCategory ({commit}, payload) {
    console.log('payload', payload)
    commit(types.DELETE_CATEGORY, payload)
    return http.delete('/category', {
      params: {
        category: payload.category
      }
    }).then((res) => {
      if (res.data.error) {
        throw new Error(res.data.error.message || res.data.err.errmsg)
      }
      return res
    })
  },
  getArticlesNames ({commit}) {
    return http.get('/category/all', { params: { onlyNames: true } })
      .then((res) => {
        if (res.data.error) {
          throw new Error(res.data.error || res.data.err.errmsg)
        }
        commit(types.GET_ARTICLES_NAMES, {payload: res.data})
      })
  },
  getArticle ({state}) {
    return http.get('/article', {
      params: {
        category: state.editedArticle.category,
        id: state.editedArticle._id
      }})
      .then((res) => {
        if (res.data.error) {
          throw new Error(res.data.error)
        }
        return res
      })
  },
  addArticle ({commit}, data) {
    return http.post('/article', data, { headers: {
      'Content-Type': 'multipart/form-data'
    }}).then((res) => {
      return res
    })
  },
  editArticle ({commit}, data) {
    console.log('data', data)
    return http.put('/article', data)
  },
  deleteArticle ({commit}, payload) {
    commit(types.DELETE_ARTICLE, payload)
    return http.delete('/article', {
      params: {
        category: payload.category,
        article: payload.article
      }
    })
  }
}

const mutations = {
  [types.GET_ARTICLES_NAMES] (state, {payload}) {
    state.categories = payload
  },
  [types.DELETE_ARTICLE] (state, payload) {
    state.categories[payload.catIndex].articles.splice(payload.artIndex, 1)
    return state.categories
  },
  [types.SET_EDITED_ARTICLE] (state, payload) {
    if (payload) {
      console.log('pay', payload)
      state.editedArticle = {
        category: state.categories[payload.catIndex].name,
        _id: state.categories[payload.catIndex].articles[payload.artIndex]._id
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
