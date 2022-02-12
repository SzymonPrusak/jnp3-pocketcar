import { Button, TextInput } from 'react-native-paper'
import { Dimensions, LayoutAnimation, Text, View } from 'react-native'
import { LoginUserService, RegisterUserService } from '@/Services/User'
import React, { useState } from 'react'

import SessionToken from '@/Store/User/SessionToken'
import { SingleTile } from '@/Components'
import { useDispatch } from 'react-redux'
import { useTheme } from '@/Theme'

const AuthenticationContainer = () => {
  const [signInMode, setSignInMode] = useState(true)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)

  const { Layout } = useTheme()

  const dispatch = useDispatch()

  const changeAuthenticationMethod = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setSignInMode(!signInMode)
  }

  const onContinueButtonPress = async () => {
    console.log(login, email, password)

    let res

    try {
      if (signInMode) {
        res = await LoginUserService(login, password)
      } else {
        res = await RegisterUserService(login, email, password)
      }
    } catch (e) {
      setError(true)
    }

    if (res != null && res.token) {
      dispatch(SessionToken.action({ sessionToken: res.token }))
    }
  }

  return (
    <View style={[Layout.fill, Layout.column]}>
      <TextInput
        autoCapitalize={false}
        label="Login"
        value={login}
        onChangeText={setLogin}
      />
      {!signInMode && (
        <TextInput
          autoCapitalize={false}
          label="Email"
          value={email}
          onChangeText={setEmail}
        />
      )}
      <TextInput
        style={{ marginBottom: 20 }}
        autoCapitalize={false}
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
      />

      <Button mode="text" onPress={changeAuthenticationMethod}>
        {signInMode
          ? "Don't have an account? Sign up"
          : 'Already have an account? Sign in'}
      </Button>
      <Button onPress={onContinueButtonPress} mode="contained">
        {signInMode ? 'Sign in' : 'Sign up'}
      </Button>
      {error && (
        <Text style={{ color: 'red', alignSelf: 'center', marginTop: 10 }}>
          Authentication error
        </Text>
      )}
    </View>
  )
}

export default AuthenticationContainer
