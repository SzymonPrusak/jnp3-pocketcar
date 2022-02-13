import { Button, TextInput } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { carSelector } from '../../Store/Cars'
import { useTheme } from '@/Theme'

const CarDetailsContainer = ({ navigation }) => {
  const { Layout, Gutters, Common } = useTheme()
  const dispatch = useDispatch()

  const [editingMode, setEditingMode] = useState(false)

  const car = useSelector(carSelector)

  const [localCar, setLocalCar] = useState(car)

  useEffect(() => {
    if (car) {
      setLocalCar({
        ...car,
        productionYear: car.productionYear.toString(),
        book: {
          ...car.book,
          mileage: car.book.mileage.toString(),
        },
      })
    } else {
      setLocalCar(null)
    }
  }, [car])

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
        label={'Name'}
        value={localCar?.name}
        onChangeText={(text) => setLocalCar({ ...localCar, name: text })}
      />
      <TextInput
        style={Common.textInput}
        disabled={!editingMode}
        label={'License plate'}
        value={localCar?.book.licensePlate}
        onChangeText={(text) =>
          setLocalCar({
            ...localCar,
            book: { ...localCar.book, licensePlate: text },
          })
        }
      />
      <TextInput
        style={Common.textInput}
        disabled={!editingMode}
        label={'Brand'}
        value={localCar?.makeName}
        onChangeText={(text) => setLocalCar({ ...localCar, makeName: text })}
      />
      <TextInput
        style={Common.textInput}
        disabled={!editingMode}
        label={'Model'}
        value={localCar?.carModelName}
        onChangeText={(text) =>
          setLocalCar({ ...localCar, carModelName: text })
        }
      />
      <TextInput
        style={Common.textInput}
        disabled={!editingMode}
        label={'Engine'}
        value={localCar?.engine}
        onChangeText={(text) => setLocalCar({ ...localCar, engine: text })}
      />
      <TextInput
        style={Common.textInput}
        disabled={!editingMode}
        label={'Kilometrage'}
        value={localCar?.book.mileage.toString()}
        onChangeText={(text) =>
          setLocalCar({
            ...localCar,
            book: { ...localCar.book, mileage: text },
          })
        }
      />
    </ScrollView>
  )
}

export default CarDetailsContainer
