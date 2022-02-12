import React, { useState } from 'react'
import { Modal, View } from 'react-native'
import { useTheme } from '@/Theme'
import { Appbar, TextInput } from 'react-native-paper'
import dayjs from 'dayjs'

const NewDamageModal = ({ visible, setVisible, onDamageAdd }) => {
  const { Layout, Gutters, Common } = useTheme()

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')

  const onAddPress = () => {
    const damageObj = {
      name,
      location,
      description,
      isRepaired: false,
      service: null,
      expense: null,
    }

    onDamageAdd(damageObj)
    setVisible(false)

    setName('')
    setLocation('')
    setDescription('')
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
          <Appbar.Content title={'Add new damage'} />
          <Appbar.Action icon={'plus'} onPress={onAddPress} />
        </Appbar.Header>
        <View
          style={[Layout.column, Gutters.smallHPadding, Gutters.tinyTPadding]}
        >
          <TextInput
            style={Common.textInput}
            label={'Name'}
            value={name}
            placeholder={'e.g. broken mirror'}
            onChangeText={setName}
          />
          <TextInput
            style={Common.textInput}
            label={'Location'}
            value={location}
            placeholder={'e.g. Banacha St. Warsaw'}
            onChangeText={setLocation}
          />
          <TextInput
            style={Common.textInput}
            label={'Description'}
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>
    </Modal>
  )
}

export default NewDamageModal
