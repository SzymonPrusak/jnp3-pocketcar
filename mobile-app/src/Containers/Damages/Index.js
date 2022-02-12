import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '@/Theme'
import { FAB } from 'react-native-paper'
import { DamageRow, NewDamageModal } from '@/Components'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { GetDamagesService, NewDamageService } from '@/Services/Damages'

const mockUpData = [
  {
    id: '1',
    name: 'uszkodzenie 1',
    description: 'opis',
    location: 'Warszawa',
    isRepaired: false,
  },
]

const DamagesContainer = ({ navigation }) => {
  const { Gutters, Layout } = useTheme()

  const sessionToken = useSelector((state) => state.user.sessionToken)
  const car = useSelector((state) => state.user.car)

  const [modalVisible, setModalVisible] = useState(false)
  const [damages, setDamages] = useState([])

  const renderItem = ({ item }) => (
    <DamageRow title={item.name} onPress={() => navigation.navigate('DamageDetails', { damage: item })} />
  )

  const onDamageAdd = (damage) => {
    if (sessionToken == null || car == null || damage == null) {
      return
    }

    NewDamageService(sessionToken, car.id, damage)
      .then(() => {
        fetchDamages()
      })
      .catch((error) => console.log('Error while adding new damage', error))
  }

  useEffect(() => {
    fetchDamages()
  }, [sessionToken, car])

  const fetchDamages = () => {
    if (sessionToken == null || car == null) {
      return
    }

    GetDamagesService(sessionToken, car.id)
      .then(setDamages)
      .catch(() => console.log('Error while fetching damages'))
  }

  return (
    <View style={[Layout.fill, Layout.column, Gutters.smallHPadding]}>
      <FlatList
        data={damages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <FAB
        style={styles.fab}
        icon={'plus'}
        onPress={() => setModalVisible(true)}
      />
      <NewDamageModal
        visible={modalVisible}
        setVisible={setModalVisible}
        onDamageAdd={onDamageAdd}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
})

export default DamagesContainer
