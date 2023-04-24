import axios from 'axios'
import Config from 'react-native-config'

const baseService = axios.create({
  baseURL: `${Config.API_URL}`,
  headers: {
    accept: 'application/json',
  },
})

export default baseService
