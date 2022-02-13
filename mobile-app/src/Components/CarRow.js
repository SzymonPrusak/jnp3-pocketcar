import { Text, TouchableOpacity, View } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'
import { useTheme } from '@/Theme'

const CarRow = ({ title, selected, onPress }) => {
  const { Common, Gutters, Fonts, Colors } = useTheme()

  return (
    <TouchableOpacity
      style={[
        Common.damageRow,
        selected && { borderWidth: 1, borderColor: 'purple' },
      ]}
      onPress={onPress}
    >
      <Icon name={'car'} size={24} />

      <Text style={[Fonts.textRegularMedium, Gutters.regularLMargin]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CarRow
