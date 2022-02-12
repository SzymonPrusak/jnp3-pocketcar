import api, { handleError } from '@/Services'

export default async (sessionToken) => {
  if (!sessionToken) {
    return handleError({ message: 'Session token is required' })
  }

  const response = await api.get('Car/List', {
    headers: { Authorization: `Bearer ${sessionToken}` },
  })

  return response.data
}
