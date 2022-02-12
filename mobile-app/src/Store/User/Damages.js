import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: [],
  action: createAction('user/setDamages'),
  reducers(state, { payload }) {
    state.damages = payload.damages
  },
}
