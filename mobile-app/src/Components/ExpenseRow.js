import React, { useMemo } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { useTheme } from '@/Theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import dayjs from 'dayjs'

const ExpenseRow = ({ date, type, value, title }) => {
  const { Layout, Common, Gutters, Fonts, Colors } = useTheme()

  const iconName = useMemo(() => {
    if (type === 'fuel') {
      return 'gas-station'
    } else if (type === 'service') {
      return 'wrench'
    } else if (type === 'insurance') {
      return 'credit-card'
    } else {
      return 'cash'
    }
  }, [type])

  return (
    <TouchableOpacity style={[Common.expenseRow]}>
      <Icon name={iconName} size={24} />

      <View style={[Layout.rowSpaceBetween, Layout.fill, Gutters.smallLMargin]}>
        <View style={[Layout.column, Layout.justifyContentBetween]}>
          <Text style={Fonts.textRegularMedium}>{title}</Text>
          {date && (
            <Text style={[Fonts.textSmall, { color: Colors.gray }]}>
              {dayjs(date).format('DD.MM.YYYY')}
            </Text>
          )}
        </View>
        <Text
          style={[Fonts.textSmall, { fontWeight: 'bold' }]}
        >{`${value}  €`}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ExpenseRow
