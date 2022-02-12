import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, ScrollView, Text } from 'react-native'
import { useTheme } from '@/Theme'
import { TextInput, Button } from 'react-native-paper'
import SessionToken from '@/Store/User/SessionToken'

const CarDetailsContainer = ({ navigation }) => {
  const { Layout, Gutters, Common } = useTheme()

  const [editingMode, setEditingMode] = useState(false)

  const car = useSelector(state => state.user.car)

  const [license, setLicense] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [kilometrage, setKilometrage] = useState('')
  const [yearOfProduction, setYearOfProduction] = useState('2009')
  const [engine, setEngine] = useState('1.4 v')

  useEffect(() => {
    setLicense(car?.name || '')
    setBrand(car?.generation?.model?.make?.name)
    setModel(car?.generation?.model?.name)
    setKilometrage(`${car?.stateBook?.mileage} km`)
  }, [car])

  const dispatch = useDispatch()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          color={'red'}
          mode={'text'}
          onPress={() => setEditingMode(!editingMode)}
        >
          {editingMode ? 'Save' : 'Edit'}
        </Button>
      ),
    })
  }, [navigation, editingMode])

  return (
    <ScrollView
      style={[
        Layout.fill,
        Layout.column,
        Gutters.tinyHPadding,
        Gutters.tinyVPadding,
      ]}
    >
      <TextInput
        style={Common.textInput}
        disabled={!editingMode}
        label={'License plate'}
        value={license}
        onChangeText={setLicense}
      />
      <TextInput
        style={Common.textInput}
        disabled={!editingMode}
        label={'Brand'}
        value={brand}
        onChangeText={setBrand}
      />
      <TextInput
        style={Common.textInput}
        disabled={!editingMode}
        label={'Model'}
        value={model}
        onChangeText={setModel}
      />
      <TextInput
        style={Common.textInput}
        disabled={!editingMode}
        label={'Kilometrage'}
        value={kilometrage}
        onChangeText={setKilometrage}
      />
      {/* <TextInput
        style={Common.textInput}
        disabled={!editingMode}
        label={'Year of production'}
        value={yearOfProduction}
        onChangeText={setYearOfProduction}
      />
      <TextInput
        style={Common.textInput}
        disabled={!editingMode}
        label={'Engine'}
        value={engine}
        onChangeText={setEngine}
      /> */}

      <Button
        onPress={() => dispatch(SessionToken.action({ sessionToken: null }))}
      >
        Logout
      </Button>
    </ScrollView>
  )
}

export default CarDetailsContainer
