import api, { handleError } from '@/Services'

import { Config } from '@/Config'

export default async (login, email, password) => {
  console.log('dupa0')
  if (!login || !password || !email) {
    return handleError({ message: 'Login, email and password are required' })
  }

  try {
    const response = await api.post(`${Config.AUTH_API_URL}/register`, {
      username: login,
      email,
      password,
    })

    console.log('response', response)

    return response.data
  } catch (e) {
    return null
  }
}
