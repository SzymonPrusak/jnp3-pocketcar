import api, { handleError } from '@/Services'

export default async (login, email, password) => {
  if (!login || !password || !email) {
    return handleError({ message: 'Login, email and password are required' })
  }

  try {
    const response = await api.post('/auth/register', {
      username: login,
      email,
      password,
    })

    return response.data
  } catch (e) {
    return null
  }
}
