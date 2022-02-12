import api, { handleError } from '@/Services'

import { Config } from '@/Config'

export default async (sessionToken, car) => {
  if (car == null) {
    handleError({ message: 'No car specified' })
  }

  const response = await api.post(`${Config.CARS_API_URL}/car`, car, {
    headers: { 'x-auth-token': sessionToken },
  })

  console.log(response)
  return response.data
}
