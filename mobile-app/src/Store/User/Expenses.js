import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: [],
  action: createAction('user/setExpenses'),
  reducers(state, { payload }) {
    state.expenses = payload.expenses
  },
}
