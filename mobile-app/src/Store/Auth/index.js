import { LoginUserService, RegisterUserService } from '../../Services/User'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { reset } from '../Cars'

export const loginUser = createAsyncThunk(
  'authSlice/loginUser',
  async ({ login, password }, thunkApi) => {
    try {
      const result = await LoginUserService(login, password)

      console.log('success', result)

      if (result.token) {
        await AsyncStorage.setItem('sessionToken', result.token)
      }
      return null
    } catch (e) {
      return thunkApi.rejectWithValue(null)
    }
  },
)

export const registerUser = createAsyncThunk(
  'authSlice/registerUser',
  async ({ login, email, password }, thunkApi) => {
    try {
      const result = await RegisterUserService(login, email, password)

      if (result.token) {
        await AsyncStorage.setItem('sessionToken', result.token)
      }
      return null
    } catch (e) {
      return thunkApi.rejectWithValue(null)
    }
  },
)

export const logout = createAsyncThunk(
  'authSlice/logout',
  async (_, thunkApi) => {
    await AsyncStorage.removeItem('sessionToken')

    thunkApi.dispatch(reset())
  },
)

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    setIsAuthenticated: (state, payload) => {
      state.isAuthenticated = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state) => {
      state.isAuthenticated = true
    })
    builder.addCase(loginUser.rejected, (state) => {
      state.isAuthenticated = false
    })
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isAuthenticated = true
    })
    builder.addCase(registerUser.rejected, (state) => {
      state.isAuthenticated = false
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false
    })
  },
})

export const { setIsAuthenticated } = authSlice.actions

export const authSliceReducer = authSlice.reducer
