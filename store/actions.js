import * as types from './mutation-types'
import {http} from '~/plugins/axios'

// export const getCategories = ({commit}, categories) => {
//   if (Array.isArray(categories) && categories.length) {
//     commit(types.GET_CATEGORIES, categories)
//   }
// }

export const getDocumentsNames = ({commit}) => {
  http.get('/get-documents-names')
    .then((res) => {
      console.log('res', res.data)
      commit(types.GET_DOCUMENTS_NAMES, {payload: res.data})
    })
}

export const updateCategories = ({commit}, payload) => {
  commit(types.UPDATE_CATEGORY, payload)
}
