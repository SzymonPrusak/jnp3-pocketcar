import { Appbar, Button, Card } from 'react-native-paper'
import { Modal, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { fetchExpenses, fetchInsurances, setCurrentCarId } from '../Store/Cars'
import { useDispatch, useSelector } from 'react-redux'

import { CarRow } from '.'
import { useTheme } from '@/Theme'

const CarSelectModal = ({ visible, setVisible, onAddNewCarPress }) => {
  const dispatch = useDispatch()
  const { Layout, Gutters } = useTheme()
  const cars = useSelector((state) => state.cars.all)
  const currentCarId = useSelector((state) => state.cars.currentCarId)

  const onCarSelect = React.useCallback(
    (car) => {
      dispatch(setCurrentCarId(car._id))
      dispatch(fetchExpenses())
      dispatch(fetchInsurances())
      setVisible(false)
    },
    [dispatch, setVisible],
  )

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
    >
      <Appbar.Header>
        <Appbar.BackAction onPress={() => setVisible(false)} />
      </Appbar.Header>
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
            {cars.map((car) => (
              <CarRow
                key={car._id}
                title={car.book.licensePlate}
                onPress={() => onCarSelect(car)}
                selected={car._id === currentCarId}
              />
            ))}
            <Button mode="contained" onPress={onAddNewCarPress}>
              Add new car
            </Button>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({})

export default CarSelectModal
