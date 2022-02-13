import AsyncStorage from '@react-native-async-storage/async-storage'
import { Config } from '../Config'
import axios from 'axios'

const instance = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

export const handleError = ({ message, data, status }) => {
  return Promise.reject({ message, data, status })
}

instance.interceptors.response.use(
  (response) => response,
  ({ message, response: { status, data }, response }) => {
    console.log('rejected response', JSON.stringify(response))
    return handleError({ message, data, status })
  },
)

instance.interceptors.request.use(async (request) => {
  const token = await AsyncStorage.getItem('sessionToken')
  console.log('loading token')
  if (token) {
    console.log('loaded token', token)
    request.headers['x-auth-token'] = token
  }
  return request
})

export default instance
