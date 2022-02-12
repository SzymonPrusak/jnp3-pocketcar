import Car from './Car'
import Expenses from './Expenses'
import FetchOne from './FetchOne'
import SessionToken from './SessionToken'
import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  item: {},
  sessionToken: null,
  car: null,
  expenses: [],
}

export default buildSlice(
  'user',
  [FetchOne, SessionToken, Car, Expenses],
  sliceInitialState,
).reducer
