import api, { handleError } from '@/Services'

export default async (carId) => {
  if (!carId) {
    return handleError({ message: 'CarId is required' })
  }

  const response = await api.get(`/spendings/${carId}`)

  console.log('ex response', response)

  return response.data
}
