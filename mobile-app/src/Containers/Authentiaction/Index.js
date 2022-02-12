import React, { useState } from 'react'
import { View, Dimensions, LayoutAnimation, Text } from 'react-native'
import { useTheme } from '@/Theme'
import { SingleTile } from '@/Components'
import { TextInput, Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { LoginUserService, RegisterUserService } from '@/Services/User'
import SessionToken from '@/Store/User/SessionToken'

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

    console.log(res)

    if (res != null) {
      dispatch(SessionToken.action({ sessionToken: res }))
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
