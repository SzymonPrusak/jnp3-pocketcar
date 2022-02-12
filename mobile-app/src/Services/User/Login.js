import api, { handleError } from '@/Services'

export default async (login, password) => {
  if (!login || !password) {
    return handleError({ message: 'Login and password are required' })
  }

  const response = await api.post('Auth/Login', null, {
    params: { login, password },
  })
  return response.data
}
