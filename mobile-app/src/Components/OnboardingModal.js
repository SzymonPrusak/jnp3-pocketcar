import { Button, Card, TextInput } from 'react-native-paper'
import {
  Keyboard,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import DatePicker from 'react-native-date-picker'
import { NewInsuranceService } from '../Services/Insurances'
import { createNewCar } from '../Store/Cars'
import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { useTheme } from '@/Theme'

const TextField = (props) => (
  <TextInput mode={'outlined'} style={{ marginBottom: 5 }} {...props} />
)

const OnboardingModal = ({ visible, setVisible, onSuccess }) => {
  const dispatch = useDispatch()
  const { Layout, Gutters, Fonts } = useTheme()

  const [name, setName] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [model, setModel] = useState('')
  const [vinNumber, setVinNumber] = useState('')
  const [productionYear, setProductionYear] = useState('')
  const [engine, setEngine] = useState('')
  const [generation, setGeneration] = useState('')

  const [insuranceProvider, setInsuranceProvider] = useState('')
  const [insuranceNumber, setInsuranceNumber] = useState('')
  const [insurancePhoneNumber, setInsurancePhoneNumber] = useState('')
  const [insuranceScope, setInsuranceScope] = useState('')
  const [insuranceCost, setInsuranceCost] = useState('')
  const [insuranceValidFrom, setInsuranceValidFrom] = useState(new Date())
  const [insuranceValidUntil, setInsuranceValidUntil] = useState(new Date())

  const [mileage, setMileage] = useState('')
  const [lastServiceMileage, setLastServiceMileage] = useState('')
  const [nextServiceDate, setNextServiceDate] = useState(new Date())

  useEffect(() => {
    if (visible) {
      setName('')
      setLicensePlate('')
      setManufacturer('')
      setModel('')
      setVinNumber('')
      setProductionYear('')
      setEngine('')
      setGeneration('')
      setInsuranceProvider('')
      setInsuranceNumber('')
      setInsurancePhoneNumber('')
      setInsuranceValidFrom(new Date())
      setInsuranceValidUntil(new Date())
      setInsuranceScope('')
      setMileage('')
      setLastServiceMileage('')
      setNextServiceDate(new Date())
    }
  }, [visible])

  const addNewCar = async () => {
    let newCar = {
      name,
      productionYear: parseInt(productionYear, 10),
      generation,
      engine,
      carModelName: model,
      makeName: manufacturer,
      vinNumber,
      book: {
        licensePlate,
        mileage: parseInt(mileage, 10),
        nextServiceDate,
        lastServiceMileage: parseInt(lastServiceMileage, 10),
      },
    }

    const result = await dispatch(createNewCar(newCar))

    const carUnwrapped = unwrapResult(result)

    console.log('car unwrapped', carUnwrapped)

    if (carUnwrapped) {
      console.log('herehere')
      let insurance = {
        insuranceNumber,
        cost: parseInt(insuranceCost, 10),
        company: insuranceProvider,
        scope: insuranceScope,
        contactNumber: parseInt(insurancePhoneNumber, 10),
        validFrom: insuranceValidFrom,
        validUntil: insuranceValidUntil,
        carId: carUnwrapped._id,
      }
      await NewInsuranceService(carUnwrapped._id, insurance)
    }

    setVisible(false)
    onSuccess()
  }

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
    >
      <SafeAreaView style={Layout.fill}>
        <View
          style={[
            Layout.fill,
            Layout.column,
            Gutters.smallHPadding,
            Gutters.smallVPadding,
          ]}
        >
          <ScrollView style={[Layout.fill]}>
            <Text style={[Fonts.titleRegular, Gutters.regularBMargin]}>
              {'Add your Car'}
            </Text>

            <Card>
              <Card.Title title="Basic information" />
              <Card.Content>
                <TextField label={'Name'} value={name} onChangeText={setName} />
                <TextField
                  label="License plate"
                  value={licensePlate}
                  onChangeText={setLicensePlate}
                />

                <TextField
                  label="Manufacturer"
                  value={manufacturer}
                  onChangeText={setManufacturer}
                />

                <TextField
                  label="Model"
                  value={model}
                  onChangeText={setModel}
                />

                <TextField
                  label="Generation"
                  value={generation}
                  onChangeText={setGeneration}
                />

                <TextField
                  label="Production Year"
                  value={productionYear}
                  onChangeText={setProductionYear}
                />

                <TextField
                  label="Engine"
                  value={engine}
                  onChangeText={setEngine}
                />

                <TextField
                  label="Vin number"
                  value={vinNumber}
                  onChangeText={setVinNumber}
                />
              </Card.Content>
            </Card>

            <Card style={[Gutters.regularTMargin]}>
              <Card.Title title="Service" />
              <Card.Content>
                <TextField
                  label="Kilometrage"
                  value={mileage}
                  onChangeText={setMileage}
                  keyboardType="numeric"
                  right={'km'}
                />
                <TextField
                  label="Kilometrage at last oil change"
                  value={lastServiceMileage}
                  onChangeText={setLastServiceMileage}
                  keyboardType="numeric"
                  right={<Text>km</Text>}
                />

                <View style={styles.datepickerContainer}>
                  <Text
                    style={[
                      Fonts.textSmall,
                      Gutters.smallTMargin,
                      { marginLeft: 12 },
                    ]}
                  >
                    Next service checkup date:
                  </Text>
                  <DatePicker
                    date={nextServiceDate}
                    onDateChange={setNextServiceDate}
                    style={{ alignSelf: 'center' }}
                    mode="date"
                  />
                </View>
              </Card.Content>
            </Card>

            <Card style={[Gutters.regularTMargin]}>
              <Card.Title title="Insurance" />
              <Card.Content>
                <TextField
                  label="Insurance provider"
                  value={insuranceProvider}
                  onChangeText={setInsuranceProvider}
                />

                <TextField
                  label="Insurance number"
                  value={insuranceNumber}
                  onChangeText={setInsuranceNumber}
                />

                <TextField
                  label="Insurance contact number"
                  value={insurancePhoneNumber}
                  onChangeText={setInsurancePhoneNumber}
                />

                <TextField
                  label="Insurance cost"
                  value={insuranceCost}
                  onChangeText={setInsuranceCost}
                />

                <TextField
                  label="Insurance scope"
                  value={insuranceScope}
                  onChangeText={setInsuranceScope}
                />

                <View style={styles.datepickerContainer}>
                  <Text
                    style={[
                      Fonts.textSmall,
                      Gutters.smallTMargin,
                      { marginLeft: 12 },
                    ]}
                  >
                    Insurance valid from:
                  </Text>
                  <DatePicker
                    date={insuranceValidFrom}
                    onDateChange={setInsuranceValidFrom}
                    style={{ alignSelf: 'center' }}
                    mode="date"
                  />
                  <Text
                    style={[
                      Fonts.textSmall,
                      Gutters.smallTMargin,
                      { marginLeft: 12 },
                    ]}
                  >
                    Insurance valid until:
                  </Text>
                  <DatePicker
                    date={insuranceValidUntil}
                    onDateChange={setInsuranceValidUntil}
                    style={{ alignSelf: 'center' }}
                    mode="date"
                  />
                </View>
              </Card.Content>
            </Card>

            <Button
              style={{ marginTop: 20, marginBottom: 20 }}
              mode="contained"
              onPress={addNewCar}
            >
              Add new car
            </Button>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  datepickerContainer: {
    backgroundColor: '#f4f4f4',
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    flex: 1,
  },
})

export default OnboardingModal
