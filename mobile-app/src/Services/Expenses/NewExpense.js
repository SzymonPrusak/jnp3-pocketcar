import api, { handleError } from '@/Services'

export default async (sessionToken, carId, expense) => {
  if (!sessionToken) {
    return handleError({ message: 'Session token is required' })
  }

  if (!carId) {
    return handleError({ message: 'CarId is required' })
  }

  const response = await api.post(`Expense/${carId}/New`, expense, {
    headers: { 'x-auth-token': sessionToken },
  })

  return response.data
}
