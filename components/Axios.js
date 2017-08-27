import axios from 'axios'
import config from '../config'

export const xhr = axios.create({
  baseUrl: config.apiUrl
})
