import api, { handleError } from '@/Services'

export default async (login, email, password) => {
  if (!login || !password || !email) {
    return handleError({ message: 'Login, email and password are required' })
  }

  const response = await api.post('Auth/Register', null, { params: { login, email, password }})
  return response.data
}
