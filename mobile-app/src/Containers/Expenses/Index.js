import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useTheme } from '@/Theme'
import { FAB, Chip } from 'react-native-paper'
import { ExpenseRow, NewExpenseModal } from '@/Components'
import { FlatList } from 'react-native-gesture-handler'
import { GetExpensesService, NewExpenseService } from '@/Services/Expenses'
import { useSelector, useDispatch } from 'react-redux'
import Expenses from '@/Store/User/Expenses'

const ExpensesContainer = () => {
  const { Gutters, Layout } = useTheme()

  const sessionToken = useSelector((state) => state.user.sessionToken)

  const [modalVisible, setModalVisible] = useState(false)

  const dispatch = useDispatch()
  const expenses = useSelector((state) => state.user.expenses)
  const car = useSelector((state) => state.user.car)

  const [type, setType] = useState('all')

  useEffect(() => {
    fetchExpenses()
  }, [sessionToken, car])

  const fetchExpenses = () => {
    if (sessionToken == null || car == null) {
      return
    }

    GetExpensesService(sessionToken, car.id).then((expenses) => {
      dispatch(Expenses.action({ expenses }))
    })
  }

  const renderItem = ({ item }) => (
    <ExpenseRow
      date={item.timestamp}
      title={item.items[0].name}
      value={item.items[0].price}
      type={item.name}
    />
  )

  const onExpenseAdd = (expense) => {
    if (sessionToken == null || car == null || expense == null) {
      return
    }

    NewExpenseService(sessionToken, car.id, expense)
      .then(() => {
        fetchExpenses()
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
