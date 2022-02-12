import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@/Theme'

const DamageDetailsScreen = ({ route, navigation }) => {
  const { Gutters, Layout, MetricsSizes, Fonts } = useTheme()

  const { damage } = route.params

  return (
    <View
      style={[
        Layout.fill,
        Layout.column,
        Gutters.smallHPadding,
        Gutters.smallVPadding,
      ]}
    >
      <View
        style={{
          flexDirection: 'column',
          padding: 10,
          backgroundColor: 'white',
        }}
      >
        <Text style={Fonts.textSmall}>Name:</Text>
        <Text style={Fonts.textRegular}>{damage.name}</Text>
      </View>

      <View
        style={{
          flexDirection: 'column',
          marginTop: 10,
          padding: 10,
          backgroundColor: 'white',
        }}
      >
        <Text style={Fonts.textSmall}>Location:</Text>
        <Text style={Fonts.textRegular}>{damage.location}</Text>
      </View>

      <View
        style={{
          flexDirection: 'column',
          marginTop: 10,
          padding: 10,
          backgroundColor: 'white',
        }}
      >
        <Text style={Fonts.textSmall}>Description:</Text>
        <Text style={Fonts.textRegular}>{damage.description}</Text>
      </View>
    </View>
  )
}

export default DamageDetailsScreen
