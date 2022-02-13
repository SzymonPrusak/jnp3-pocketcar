import { Button, TextInput } from 'react-native-paper'
import { Linking, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { carSelector, insuranceSelector } from '../../Store/Cars'

import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { useTheme } from '@/Theme'

const InsuranceDetailsContainer = ({ navigation }) => {
  const { Layout, Gutters, Common } = useTheme()

  const car = useSelector(carSelector)
  const insurance = useSelector(insuranceSelector)

  const [editingMode, setEditingMode] = useState(false)

  const [company, setCompany] = useState('')
  const [coverage, setCoverage] = useState('')
  const [validUntil, setValidUntil] = useState('')
  const [insuranceNumber, setInsuranceNumber] = useState('')
  const [contactNumber, setContactNumber] = useState('')

  useEffect(() => {
    if (insurance) {
      setCompany(insurance.company)
      setCoverage(insurance.scope)
      setInsuranceNumber(insurance.insuranceNumber)
      setContactNumber(insurance.contactNumber.toString())
      setValidUntil(dayjs(insurance.validUntil).format('DD.MM.YYYY'))
    }
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
        mode="contained"
        onPress={() => Linking.openURL(`tel:${contactNumber}`)}
      >
        Call insurer
      </Button>
    </View>
  )
}

export default InsuranceDetailsContainer
