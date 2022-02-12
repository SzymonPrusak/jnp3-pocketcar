import api, { handleError } from '@/Services'

export default async (sessionToken, car) => {
  if (car == null) {
    handleError({ message: 'No car specified' })
  }

  const response = await api.post('Car/New', car, {
    headers: { Authorization: `Bearer ${sessionToken}` },
  })

  console.log(response)
  return response.data
}
