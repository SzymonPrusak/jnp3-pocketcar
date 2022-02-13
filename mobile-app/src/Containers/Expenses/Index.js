import { Chip, FAB } from 'react-native-paper'
import { ExpenseRow, NewExpenseModal } from '@/Components'
import { GetExpensesService, NewExpenseService } from '@/Services/Expenses'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { carSelector, expensesSelector, fetchExpenses } from '../../Store/Cars'
import { useDispatch, useSelector } from 'react-redux'

import Expenses from '@/Store/User/Expenses'
import { FlatList } from 'react-native-gesture-handler'
import { useTheme } from '@/Theme'

const ExpensesContainer = () => {
  const { Gutters, Layout } = useTheme()

  const [modalVisible, setModalVisible] = useState(false)

  const dispatch = useDispatch()
  const expenses = useSelector(expensesSelector)
  const carId = useSelector((state) => state.cars.currentCarId)

  const [type, setType] = useState('all')

  useEffect(() => {
    dispatch(fetchExpenses())
  }, [dispatch])

  const renderItem = ({ item }) => (
    <ExpenseRow
      date={item.timestamp}
      title={item.name}
      value={item.cost}
      // type={item.name}
    />
  )

  const onExpenseAdd = (expense) => {
    if (carId == null || expense == null) {
      return
    }

    NewExpenseService(carId, expense)
      .then(() => {
        dispatch(fetchExpenses())
        console.log('Added new expense')
      })
      .catch(() => {
        console.log('Error while adding new expense')
      })
  }

  return (
    <View style={[Layout.fill, Layout.column, Gutters.smallHPadding]}>
      <View
        style={{ width: '100%', marginTop: 20, marginBottom: 20, height: 35 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <Chip
            onPress={() => setType('all')}
            selected={type === 'all'}
            icon={null}
          >
            all
          </Chip>
          <Chip
            onPress={() => setType('fuel')}
            selected={type === 'fuel'}
            icon="gas-station"
          >
            Fuel
          </Chip>
          <Chip
            onPress={() => setType('service')}
            selected={type === 'service'}
            icon="wrench"
          >
            Service
          </Chip>
          <Chip
            onPress={() => setType('insurance')}
            selected={type === 'insurance'}
            icon="credit-card"
          >
            Insurance
          </Chip>
          <Chip
            onPress={() => setType('other')}
            selected={type === 'other'}
            icon="cash"
          >
            Other
          </Chip>
        </ScrollView>
      </View>
      <FlatList
        data={expenses.filter((expense) => {
          if (type === 'all') {
            return true
          }

          return type === expense.name
        })}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <FAB
        style={styles.fab}
        icon={'plus'}
        onPress={() => setModalVisible(true)}
      />
      <NewExpenseModal
        visible={modalVisible}
        setVisible={setModalVisible}
        onExpenseAdd={onExpenseAdd}
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

export default ExpensesContainer
