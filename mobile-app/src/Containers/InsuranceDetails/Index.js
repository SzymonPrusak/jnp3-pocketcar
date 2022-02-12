import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Dimensions, Text, Linking } from 'react-native'
import { useTheme } from '@/Theme'
import { TextInput, Button } from 'react-native-paper'
import SessionToken from '@/Store/User/SessionToken'

const InsuranceDetailsContainer = ({ navigation }) => {
  const { Layout, Gutters, Common } = useTheme()

  const car = useSelector((state) => state.user.car)

  const [editingMode, setEditingMode] = useState(false)

  const [company, setCompany] = useState('')
  const [coverage, setCoverage] = useState('')
  const [validUntil, setValidUntil] = useState('')
  const [insuranceNumber, setInsuranceNumber] = useState('')
  const [contactNumber, setContactNumber] = useState('')

  useEffect(() => {
    setCompany(car?.insurance?.company)
    setCoverage(car?.insurance?.scope)
    setInsuranceNumber(car?.insurance?.number)
    setContactNumber(car?.insurance?.contactNumber)
    setValidUntil(car?.insurance?.expires?.substring(0, 10))
  }, [])

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
    <View
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
        label={'Company'}
        value={company}
        onChangeText={setCompany}
      />
      <TextInput
        style={Common.textInput}
        disabled={!editingMode}
        label={'Coverage'}
        value={coverage}
        onChangeText={setCoverage}
      />
      <TextInput
        style={Common.textInput}
        disabled={!editingMode}
        label={'Valid until'}
        value={validUntil}
        onChangeText={setValidUntil}
      />
      <TextInput
        style={Common.textInput}
        disabled={!editingMode}
        label={'Insurance number'}
        value={insuranceNumber}
        onChangeText={setInsuranceNumber}
      />
      <TextInput
        style={Common.textInput}
        disabled={!editingMode}
        label={'Contact number'}
        value={contactNumber}
        onChangeText={setContactNumber}
      />
      <Button
        mode='contained'
        onPress={() => Linking.openURL(`tel:${contactNumber}`)}
      >
        Call insurer
      </Button>
    </View>
  )
}

export default InsuranceDetailsContainer
