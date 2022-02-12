import api, { handleError } from '@/Services'

import { Config } from '@/Config'

export default async (sessionToken) => {
  if (!sessionToken) {
    return handleError({ message: 'Session token is required' })
  }

  const response = await api.get(`${Config.CARS_API_URL}/car`, {
    headers: { 'x-auth-token': sessionToken },
  })

  console.log(response)

  return response.data
}
