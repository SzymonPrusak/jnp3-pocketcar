import { Alert, Dimensions, ScrollView, Text, View } from 'react-native'
import { Button, Modal, Portal } from 'react-native-paper'
import { OnboardingModal, SingleTile } from '@/Components'
import React, { useEffect, useState } from 'react'
import {
  carSelector,
  expensesSelector,
  fetchCars,
  fetchExpenses,
  fetchInsurances,
  insuranceSelector,
} from '../../Store/Cars'
import { useDispatch, useSelector } from 'react-redux'

import { CarSelectModal } from '../../Components'
import { UpdateCarService } from '@/Services/Cars'
import dayjs from 'dayjs'
import { logout } from '../../Store/Auth'
import { useTheme } from '@/Theme'

const window = Dimensions.get('window')

const CarOverviewContainer = ({ navigation }) => {
  const { Gutters, Layout, MetricsSizes } = useTheme()

  const loadedCars = useSelector((state) => state.cars.loadingFulfilled)
  const car = useSelector(carSelector)
  const expenses = useSelector(expensesSelector)

  const insurance = useSelector(insuranceSelector)

  const dispatch = useDispatch()

  const totalExpensesIn = (expenses_, year) => {
    const start = year
      ? dayjs().startOf('year').toDate()
      : dayjs().startOf('month').toDate()

    return expenses_.reduce(
      (prev, curr) => (new Date(curr.date) >= start ? prev + curr.cost : prev),
      0,
    )
  }

  const [onboardingModalVisible, setOnboardingModalVisible] = useState(false)
  const [carSelectModalVisible, setCarSelectModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)

  useEffect(() => {
    dispatch(fetchCars())
    dispatch(fetchExpenses())
    dispatch(fetchInsurances())
  }, [dispatch])

  useEffect(() => {
    if (loadedCars && !car) {
      setOnboardingModalVisible(true)
    }
  }, [loadedCars, car])

  const updateCar = (carObj) => {
    UpdateCarService(carObj).then(() => dispatch(fetchCars()))
  }

  const onKilometrageTilePress = () => {
    Alert.prompt('Kilometrage', 'Update kilometrage of your car', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Update',
        onPress: (newMileage) => {
          const updates = {
            _id: car._id,
            book: {
              _id: car.book._id,
              mileage: parseInt(newMileage),
            },
          }

          updateCar(updates)
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
          const updates = {
            _id: car._id,
            book: {
              _id: car.book._id,
              nextServiceDate: new Date(newDate),
            },
          }

          updateCar(updates)
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
        onPress: (newMileage) => {
          const updates = {
            _id: car._id,
            book: {
              _id: car.book._id,
              lastServiceMileage: parseInt(newMileage),
            },
          }

          updateCar(updates)
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

  const colorForOilKilometrage = (mileage) => {
    if (mileage == null || car == null) {
      return 'black'
    }

    const diff = car?.book.mileage - mileage

    if (diff >= 15000) {
      return 'red'
    } else if (diff >= 10000) {
      return 'orange'
    } else {
      return 'black'
    }
  }

  const tileBorderWidth = window.width / 2 - MetricsSizes.tiny

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button color={'red'} mode={'text'} onPress={() => dispatch(logout())}>
          Log out
        </Button>
      ),
      headerRight: () => (
        <Button
          color={'blue'}
          mode={'text'}
          onPress={() => setCarSelectModalVisible(true)}
        >
          my cars
        </Button>
      ),
    })
  }, [navigation, dispatch])

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
            topTitle={car.carModelName}
            topSubtitle={car.makeName}
            bottomSubtitle={'Kilometrage'}
            bottomTitle={`${car?.book.mileage.toString()} km`}
            onPress={() => navigation.navigate('CarDetails')}
            onLongPress={onKilometrageTilePress}
          />
        )}

        {insurance && (
          <SingleTile
            width={tileBorderWidth}
            height={tileBorderWidth}
            topTitle={'Insurance'}
            topSubtitle={insurance.company}
            bottomSubtitle={'Valid until'}
            bottomTitle={dayjs(insurance.validUntil).format('DD.MM.YYYY')}
            bottomTitleColor={colorForDate(insurance.validUntil)}
            onPress={() => navigation.navigate('InsuranceDetails')}
            onLongPress={onInsuranceTilePress}
          />
        )}

        {car?.book && (
          <SingleTile
            width={tileBorderWidth}
            height={tileBorderWidth}
            topTitle={'Next Service checkup'}
            bottomTitle={dayjs(car.book.nextServiceDate).format('DD.MM.YYYY')}
            bottomTitleColor={colorForDate(car?.book.nextServiceDate)}
            onLongPress={onServiceTilePress}
          />
        )}

        {car?.book && (
          <SingleTile
            width={tileBorderWidth}
            height={tileBorderWidth}
            topTitle={'Last oil change'}
            bottomSubtitle={'At kilometrage'}
            bottomTitle={`${car?.book?.lastServiceMileage.toString()} km`}
            bottomTitleColor={colorForOilKilometrage(
              car?.book.lastServiceMileage,
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
      </View>
      <OnboardingModal
        visible={onboardingModalVisible}
        setVisible={setOnboardingModalVisible}
        onSuccess={() => dispatch(fetchInsurances())}
      />
      <CarSelectModal
        visible={carSelectModalVisible}
        setVisible={setCarSelectModalVisible}
        onAddNewCarPress={() => {
          setCarSelectModalVisible(false)
          setOnboardingModalVisible(true)
        }}
      />
      <Portal>
        <Modal
          visible={editModalVisible}
          onDismiss={() => setEditModalVisible(false)}
          contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}
        >
          <Text>test</Text>
        </Modal>
      </Portal>
    </ScrollView>
  )
}

export default CarOverviewContainer
