import { Button, TextInput } from 'react-native-paper'
import { Dimensions, LayoutAnimation, Text, View } from 'react-native'
import { LoginUserService, RegisterUserService } from '@/Services/User'
import React, { useState } from 'react'
import { loginUser, registerUser } from '../../Store/Auth'

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

    try {
      if (signInMode) {
        dispatch(loginUser({ login, password }))
      } else {
        dispatch(registerUser({ login, email, password }))
      }
    } catch (e) {
      setError(true)
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
