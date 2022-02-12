import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('user/setSessionToken'),
  reducers(state, { payload }) {
    state.sessionToken = payload.sessionToken
  },
}
