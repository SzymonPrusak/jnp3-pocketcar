import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('user/setCar'),
  reducers(state, { payload }) {
    state.car = payload.car
  },
}
