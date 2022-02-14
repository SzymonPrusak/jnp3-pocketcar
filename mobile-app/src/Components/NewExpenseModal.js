import { Appbar, Chip, TextInput } from 'react-native-paper'
import { Modal, ScrollView, View } from 'react-native'
import React, { useState } from 'react'

import dayjs from 'dayjs'
import { useTheme } from '@/Theme'

const NewExpenseModal = ({ visible, setVisible, onExpenseAdd }) => {
  const { Layout, Gutters, Common } = useTheme()

  const [name, setName] = useState('')
  const [cost, setCost] = useState('')
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [type, setType] = useState('fuel')

  const onAddPress = () => {
    const expenseObj = {
      name,
      cost,
      date,
      type,
    }

    console.log(expenseObj)

    onExpenseAdd(expenseObj)
    setVisible(false)

    setName('')
    setCost('')
    setDate(dayjs().format('YYYY-MM-DD'))
  }

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType={'slide'}
    >
      <View style={[Layout.fill]}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => setVisible(false)} />
          <Appbar.Content title={'Add new expense'} />
          <Appbar.Action icon={'plus'} onPress={onAddPress} />
        </Appbar.Header>
        <View
          style={[Layout.column, Gutters.smallHPadding, Gutters.tinyTPadding]}
        >
          <ScrollView style={{ marginTop: 20 }} horizontal>
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
          <TextInput
            style={Common.textInput}
            label={'Display Name'}
            value={name}
            placeholder={'e.g. Fuel'}
            onChangeText={setName}
          />
          <TextInput
            style={Common.textInput}
            label={'Cost'}
            value={cost}
            placeholder={'e.g. 20 €'}
            onChangeText={setCost}
          />
          <TextInput
            style={Common.textInput}
            label={'Date'}
            value={date}
            onChangeText={setDate}
          />
        </View>
      </View>
    </Modal>
  )
}

export default NewExpenseModal
