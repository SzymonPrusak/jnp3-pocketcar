import api, { handleError } from '@/Services'

export default async (carId, expense) => {
  if (!carId) {
    return handleError({ message: 'CarId is required' })
  }

  const response = await api.post(`/spendings/${carId}`, {
    ...expense,
    carId,
  })

  return response.data
}
