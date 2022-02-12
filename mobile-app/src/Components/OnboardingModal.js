import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Keyboard,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native'
import { useTheme } from '@/Theme'
import { TextInput, Card, Button } from 'react-native-paper'
import TextInputMask from 'react-native-text-input-mask'
import DatePicker from 'react-native-date-picker'

import { NewCarService } from '@/Services/Cars'

const TextField = (props) => (
  <TextInput mode={'outlined'} style={{ marginBottom: 5 }} {...props} />
)

const OnboardingModal = ({ sessionToken, visible, setVisible, onSuccess }) => {
  const { Layout, Gutters, Fonts, Colors } = useTheme()

  const [licensePlate, setLicensePlate] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [model, setModel] = useState('')

  const [insuranceProvider, setInsuranceProvider] = useState('')
  const [insuranceDeadline, setInsuranceDeadline] = useState(new Date())
  const [insuranceNumber, setInsuranceNumber] = useState('')
  const [insurancePhoneNumber, setInsurancePhoneNumber] = useState('')

  const [kilometrage, setKilometrage] = useState('')
  const [kilometrageAtLastOilChange, setKilometrageAtLastOilChange] = useState(
    '',
  )
  const [nextServiceCheckupDate, setNextServiceCheckupDate] = useState(
    new Date(),
  )

  const addNewCar = () => {
    let carObject = {
      name: licensePlate,
      prodYear: 2010,
      engine: {
        name: 'B47',
        power: 190,
        torque: 400,
        capacity: 2.0,
        fuelType: 0,
        make: {
          name: 'BMW',
        },
      },
      generation: {
        name: model,
        prodFrom: '2019-01-01T00:00:00',
        prodTo: '2022-12-31T00:00:00',
        model: {
          name: model,
          make: {
            name: manufacturer,
          },
        },
      },
      insurance: {
        company: insuranceProvider,
        expires: insuranceDeadline.toISOString(),
        scope: 'OC, AC, NNW',
        number: insuranceNumber,
        contactNumber: insurancePhoneNumber,
      },
      stateBook: {
        licensePlate,
        mileage: parseInt(kilometrage),
        nextServiceDate: nextServiceCheckupDate.toISOString(),
        lastServiceMileage: parseInt(kilometrageAtLastOilChange),
      },
    }

    console.log(carObject)

    NewCarService(sessionToken, carObject)
      .then((res) => {
        console.log('Success', res)
        setVisible(false)
        onSuccess()
      })
      .catch((error) => {
        console.log('Error', error)
      })
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
            // { backgroundColor: 'white' },
          ]}
        >
          <ScrollView style={[Layout.fill]}>
            <Text style={[Fonts.titleRegular, Gutters.regularBMargin]}>
              {'Add your Car'}
            </Text>

            <Card>
              <Card.Title title="Basic information" />
              <Card.Content>
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
              </Card.Content>
            </Card>

            <Card style={[Gutters.regularTMargin]}>
              <Card.Title title="Service" />
              <Card.Content>
                <TextField
                  label="Kilometrage"
                  value={kilometrage}
                  onChangeText={setKilometrage}
                  keyboardType="numeric"
                  right={'km'}
                  // render={(props) => (
                  //   <TextInputMask {...props} mask="[9999999] km" />
                  // )}
                />
                <TextField
                  label="Kilometrage at last oil change"
                  value={kilometrageAtLastOilChange}
                  onChangeText={setKilometrageAtLastOilChange}
                  keyboardType="numeric"
                  right={<Text>km</Text>}
                  // render={(props) => (
                  //   <TextInputMask {...props} mask="[9999999] km" />
                  // )}
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
                  <DatePicker date={nextServiceCheckupDate} onDateChange={setNextServiceCheckupDate} style={{ alignSelf: 'center' }} mode="date" />
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

                <View style={styles.datepickerContainer}>
                  <Text
                    style={[
                      Fonts.textSmall,
                      Gutters.smallTMargin,
                      { marginLeft: 12 },
                    ]}
                  >
                    Insurance expiry date:
                  </Text>
                  <DatePicker date={insuranceDeadline} onDateChange={setInsuranceDeadline} style={{ alignSelf: 'center' }} mode="date" />
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
