import api, { handleError } from '@/Services'

export default async (sessionToken, carId) => {
  if (!sessionToken) {
    return handleError({ message: 'Session token is required' })
  }

  if (!carId) {
    return handleError({ message: 'CarId is required' })
  }

  const response = await api.get(`Expense/${carId}`, {
    headers: { 'x-auth-token': sessionToken },
  })

  return response.data
}
