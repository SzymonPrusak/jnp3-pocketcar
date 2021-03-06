import {
  buildAsyncActions,
  buildAsyncReducers,
  buildAsyncState,
} from '@thecodingmachine/redux-toolkit-wrapper'

import AsyncStorage from '@react-native-async-storage/async-storage'
import DefaultTheme from '@/Store/Theme/DefaultTheme'
import { navigateAndSimpleReset } from '@/Navigators/Root'
import { setIsAuthenticated } from '../Auth'

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('startup/init', async (args, { dispatch }) => {
    // Timeout to fake waiting some process
    // Remove it, or keep it if you want display a beautiful splash screen ;)
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    // Here we load the user 1 for example, but you can for example load the connected user
    // await dispatch(FetchOne.action(1))
    try {
      const token = await AsyncStorage.getItem('sessionToken')
      if (token) {
        await dispatch(setIsAuthenticated(true))
      }
    } catch (e) {
      console.log('no session token found')
    }

    await dispatch(DefaultTheme.action({ theme: 'default', darkMode: null }))
    // Navigate and reset to the main navigator
    navigateAndSimpleReset('Main')
  }),
  reducers: buildAsyncReducers({ itemKey: null }), // We do not want to modify some item by default
}
