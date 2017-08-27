import axios from 'axios'
import config from '../config'

const instance = axios.create({
  baseUrl: config.apiUrl
})

export default instance
