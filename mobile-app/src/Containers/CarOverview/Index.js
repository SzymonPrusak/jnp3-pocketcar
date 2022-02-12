import { Alert, Dimensions, ScrollView, Text, View } from 'react-native'
import { GetCarsService, UpdateCarService } from '@/Services/Cars'
import { Modal, Portal } from 'react-native-paper'
import { OnboardingModal, SingleTile } from '@/Components'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Car from '@/Store/User/Car'
import dayjs from 'dayjs'
import { useTheme } from '@/Theme'

const window = Dimensions.get('window')

const CarOverviewContainer = ({ navigation }) => {
  const { Gutters, Layout, MetricsSizes } = useTheme()

  const sessionToken = useSelector((state) => state.user.sessionToken)
  const car = useSelector((state) => state.user.car)
  const expenses = useSelector((state) => state.user.expenses)

  const dispatch = useDispatch()

  const totalExpensesIn = (expenses_, year) => {
    const start = year
      ? dayjs().startOf('year').format('YYYY-MM-DD')
      : dayjs().startOf('month').format('YYYY-MM-DD')

    return expenses_.reduce(
      (prev, curr) =>
        curr.timestamp >= start ? prev + curr.items[0].price : prev,
      0,
    )
  }

  const [onboardingModalVisible, setOnboardingModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)

  useEffect(() => {
    if (sessionToken == null) {
      console.log('User is not logged in')
    }

    fetchCars()
  }, [sessionToken, fetchCars])

  const fetchCars = useCallback(() => {
    GetCarsService(sessionToken).then((cars) => {
      if (cars.length === 0) {
        setOnboardingModalVisible(true)
      } else {
        dispatch(Car.action({ car: cars[0] }))
      }
    })
  }, [dispatch, sessionToken])

  const updateCar = (carObj) => {
    UpdateCarService(sessionToken, carObj).then(fetchCars)
  }

  const onKilometrageTilePress = () => {
    Alert.prompt('Kilometrage', 'Update kilometrage of your car', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Update',
        onPress: (newKilometrage) => {
          const carCopy = JSON.parse(JSON.stringify(car))

          carCopy.engine.id = null
          carCopy.engine.make.id = null
          carCopy.generation.id = null
          carCopy.generation.model.id = null
          carCopy.generation.model.make.id = null
          carCopy.stateBook.mileage = newKilometrage
          updateCar(carCopy)
        },
      },
    ])
  }

  const onInsuranceTilePress = () => {
    Alert.prompt('Insurance', 'Update insurance expiry date', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Update',
        onPress: (newDate) => {
          const carCopy = JSON.parse(JSON.stringify(car))

          carCopy.engine.id = null
          carCopy.engine.make.id = null
          carCopy.generation.id = null
          carCopy.generation.model.id = null
          carCopy.generation.model.make.id = null
          carCopy.insurance.expires = newDate
          updateCar(carCopy)
        },
      },
    ])
  }
  const onServiceTilePress = () => {
    Alert.prompt('Service checkup', 'Update date of next service checkup', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Update',
        onPress: (newDate) => {
          const carCopy = JSON.parse(JSON.stringify(car))

          carCopy.engine.id = null
          carCopy.engine.make.id = null
          carCopy.generation.id = null
          carCopy.generation.model.id = null
          carCopy.generation.model.make.id = null
          carCopy.stateBook.nextServiceDate = newDate
          updateCar(carCopy)
        },
      },
    ])
  }

  const onOilTilePress = () => {
    Alert.prompt('Oil change', 'Update kilometrage of last oil change', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Update',
        onPress: (newKilometrage) => {
          const carCopy = JSON.parse(JSON.stringify(car))

          carCopy.engine.id = null
          carCopy.engine.make.id = null
          carCopy.generation.id = null
          carCopy.generation.model.id = null
          carCopy.generation.model.make.id = null
          carCopy.stateBook.lastServiceMileage = parseInt(newKilometrage)
          updateCar(carCopy)
        },
      },
    ])
  }

  const colorForDate = (date) => {
    if (date == null) {
      return 'black'
    }

    const dayObj = dayjs(date)

    const diffDays = dayObj.diff(dayjs(), 'day')

    if (diffDays <= 2) {
      return 'red'
    } else if (diffDays <= 7) {
      return 'orange'
    } else {
      return 'black'
    }
  }

  const colorForOilKilometrage = (kilometrage) => {
    if (kilometrage == null || car == null) {
      return 'black'
    }

    const diff = car?.stateBook?.mileage - kilometrage

    if (diff >= 15000) {
      return 'red'
    } else if (diff >= 10000) {
      return 'orange'
    } else {
      return 'black'
    }
  }

  // const tileBorderWidth = useMemo(() => window.width / 2 - MetricsSizes.tiny, [MetricsSizes.tiny])
  const tileBorderWidth = window.width / 2 - MetricsSizes.tiny

  return (
    <ScrollView>
      <View
        style={[
          Layout.fill,
          Layout.row,
          Gutters.tinyHPadding,
          Gutters.tinyVPadding,
          Layout.wrap,
        ]}
      >
        {car && (
          <SingleTile
            width={tileBorderWidth}
            height={tileBorderWidth}
            topTitle={car?.generation?.model?.name}
            topSubtitle={car?.generation?.model?.make?.name}
            bottomSubtitle={'Kilometrage'}
            bottomTitle={`${car?.stateBook?.mileage} km`}
            onPress={() => navigation.navigate('CarDetails')}
            onLongPress={onKilometrageTilePress}
          />
        )}

        {car?.insurance && (
          <SingleTile
            width={tileBorderWidth}
            height={tileBorderWidth}
            topTitle={'Insurance'}
            topSubtitle={car?.insurance?.company}
            bottomSubtitle={'Valid until'}
            bottomTitle={car?.insurance?.expires?.substring(0, 10)}
            bottomTitleColor={colorForDate(car?.insurance?.expires)}
            onPress={() => navigation.navigate('InsuranceDetails')}
            onLongPress={onInsuranceTilePress}
          />
        )}

        {car?.stateBook && (
          <SingleTile
            width={tileBorderWidth}
            height={tileBorderWidth}
            topTitle={'Next Service checkup'}
            bottomTitle={car?.stateBook?.nextServiceDate?.substring(0, 10)}
            bottomTitleColor={colorForDate(car?.stateBook?.nextServiceDate)}
            onLongPress={onServiceTilePress}
          />
        )}

        {car?.stateBook && (
          <SingleTile
            width={tileBorderWidth}
            height={tileBorderWidth}
            topTitle={'Last oil change'}
            bottomSubtitle={'At kilometrage'}
            bottomTitle={`${car?.stateBook?.lastServiceMileage} km`}
            bottomTitleColor={colorForOilKilometrage(
              car?.stateBook?.lastServiceMileage,
            )}
            onLongPress={onOilTilePress}
          />
        )}

        <SingleTile
          width={tileBorderWidth}
          height={tileBorderWidth}
          topTitle={'Expenses'}
          middleSubtitle={'This month'}
          middleTitle={`${totalExpensesIn(expenses, false)} €`}
          bottomSubtitle={'This year'}
          bottomTitle={`${totalExpensesIn(expenses, true)} €`}
        />

        <SingleTile
          width={tileBorderWidth}
          height={tileBorderWidth}
          topTitle={'Driving license expiry date'}
          bottomTitle={'2022-03-04'}
        />
      </View>
      <OnboardingModal
        visible={onboardingModalVisible}
        setVisible={setOnboardingModalVisible}
        sessionToken={sessionToken}
        onSuccess={fetchCars}
      />
      <Portal>
        <Modal
          visible={editModalVisible}
          onDismiss={() => setEditModalVisible(false)}
          contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}
        >
          <Text>Dupa</Text>
        </Modal>
      </Portal>
    </ScrollView>
  )
}

export default CarOverviewContainer
