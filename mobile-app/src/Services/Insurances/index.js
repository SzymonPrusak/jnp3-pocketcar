import api, { handleError } from '@/Services'

export const GetInsurancesService = async (carId) => {
  if (!carId) {
    return handleError({ message: 'CarId is required' })
  }

  const response = await api.get(`/insurance/${carId}`)

  return response.data
}

export const NewInsuranceService = async (carId, insurance) => {
  console.log('here', carId, insurance)
  if (!carId) {
    return handleError({ message: 'CarId is required' })
  }

  const response = await api.post(`/insurance/${carId}`, {
    ...insurance,
    carId,
  })

  console.log('new insurance response', response)

  return response.data
}
