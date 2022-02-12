import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchOne from './FetchOne'
import SessionToken from './SessionToken'
import Car from './Car'
import Expenses from './Expenses'
import Damages from './Damages'

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  item: {},
  sessionToken: null,
  car: null,
  expenses: [],
  damages: [],
}

export default buildSlice(
  'user',
  [FetchOne, SessionToken, Car, Expenses, Damages],
  sliceInitialState,
).reducer
