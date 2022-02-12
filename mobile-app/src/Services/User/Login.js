import api, { handleError } from '@/Services'

import { Config } from '@/Config'

export default async (login, password) => {
  console.log('here')
  if (!login || !password) {
    return handleError({ message: 'Login and password are required' })
  }

  try {
    const response = await api.post(`${Config.AUTH_API_URL}/login`, {
      username: login,
      password,
    })
    return response.data
  } catch (e) {
    console.log(e.message)
    return handleError({ message: e.message })
  }
}
