import { GetCarsService, NewCarService } from '../../Services/Cars'
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

import GetExpenses from '../../Services/Expenses/GetExpenses'
import { GetInsurancesService } from '../../Services/Insurances'

const initialState = {
  currentCarId: null,
  loadingFulfilled: false,
  all: [],
  expenses: {},
  insurances: {},
}

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (_, thunkApi) => {
    try {
      const cars = await GetCarsService()
      return cars
    } catch (e) {
      thunkApi.rejectWithValue([])
    }
  },
)

export const fetchExpenses = createAsyncThunk(
  'cars/fetchExpenses',
  async (_, thunkApi) => {
    try {
      const carId = thunkApi.getState().cars.currentCarId

      if (!carId) {
        return thunkApi.rejectWithValue([])
      }

      const expenses = await GetExpenses(carId)
      return expenses
    } catch (e) {
      return thunkApi.rejectWithValue([])
    }
  },
)

export const fetchInsurances = createAsyncThunk(
  'cars/fetchInsurances',
  async (_, thunkApi) => {
    try {
      const carId = thunkApi.getState().cars.currentCarId

      if (!carId) {
        return thunkApi.rejectWithValue(null)
      }

      const insurance = await GetInsurancesService(carId)
      return insurance
    } catch (e) {
      return thunkApi.rejectWithValue(null)
    }
  },
)

export const createNewCar = createAsyncThunk(
  'cars/createNewCar',
  async (car, thunkApi) => {
    try {
      const newCar = await NewCarService(car)
      return newCar
    } catch (e) {
      return thunkApi.rejectWithValue(null)
    }
  },
)

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCurrentCarId: (state, action) => {
      state.currentCarId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.all = action.payload
      state.loadingFulfilled = true

      if (!state.all.map((car) => car._id).includes(state.currentCarId)) {
        state.currentCarId = null
      }

      if (state.currentCarId == null && action.payload.length > 0) {
        state.currentCarId = action.payload[0]._id
      }
    })
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.expenses[state.currentCarId] = action.payload
    })
    builder.addCase(createNewCar.fulfilled, (state, action) => {
      state.all.push(action.payload)
      state.currentCarId = action.payload._id
    })
    builder.addCase(fetchInsurances.fulfilled, (state, action) => {
      state.insurances[state.currentCarId] = action.payload
    })
  },
})

export default carsSlice.reducer

export const carsSelector = (state) => state.cars

export const { setCurrentCarId } = carsSlice.actions

export const carSelector = createSelector(
  carsSelector,
  (cars) => cars.all.filter((car) => car._id === cars.currentCarId)[0],
)

export const expensesSelector = createSelector(
  carsSelector,
  (cars) => cars.expenses[cars.currentCarId] ?? [],
)

export const insuranceSelector = createSelector(
  carsSelector,
  (cars) => cars.insurances[cars.currentCarId],
)
