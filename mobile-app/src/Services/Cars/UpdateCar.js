import api, { handleError } from '@/Services'

export default async (car) => {
  console.log('args', car)
  if (car == null) {
    return handleError({ message: 'No car specified' })
  }

  const response = await api.put('/car', car)

  return response.data
}
