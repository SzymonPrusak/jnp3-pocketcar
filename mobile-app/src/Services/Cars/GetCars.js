import api from '@/Services'

export default async () => {
  const response = await api.get('/car')
  return response.data
}
