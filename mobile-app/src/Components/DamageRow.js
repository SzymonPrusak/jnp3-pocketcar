import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { useTheme } from '@/Theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const DamageRow = ({ title, onPress }) => {
  const { Common, Gutters, Fonts } = useTheme()

  return (
    <TouchableOpacity style={[Common.damageRow]} onPress={onPress}>
      <Icon name={'wrench'} size={24} />

      <Text style={[Fonts.textRegularMedium, Gutters.regularLMargin]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default DamageRow
