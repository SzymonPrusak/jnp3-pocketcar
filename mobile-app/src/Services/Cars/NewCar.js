import api, { handleError } from '@/Services'

export default async (car) => {
  if (car == null) {
    handleError({ message: 'No car specified' })
  }

  const response = await api.post('/car', car)

  return response.data
}
