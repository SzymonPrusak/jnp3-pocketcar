import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '@/Theme'

const Title = ({ text, color = null }) => {
  const { Fonts, Colors } = useTheme()

  return (
    <Text
      style={[Fonts.textRegular, { fontWeight: 'bold', color: color || Colors.text }]}
    >
      {text}
    </Text>
  )
}

const Subtitle = ({ text }) => {
  const { Fonts, Colors } = useTheme()

  return (
    <Text style={[Fonts.textSmall, { color: Colors.textSecondary }]}>
      {text}
    </Text>
  )
}

const SingleTile = ({
  width = 200,
  height = 200,
  topTitle,
  topSubtitle,
  bottomTitle,
  bottomSubtitle,
  middleSubtitle,
  middleTitle,
  bottomTitleColor = 'black',
  onPress,
  onLongPress = () => {},
}) => {
  const { Layout, Common, Colors } = useTheme()

  return (
    <View style={{ width, height }}>
      <TouchableOpacity
        style={[
          Common.tileView,
          Layout.fill,
          Layout.column,
          Layout.justifyContentBetween,
          { backgroundColor: Colors.inputBackground },
        ]}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <View>
          {topTitle && <Title text={topTitle} />}
          {topSubtitle && <Subtitle text={topSubtitle} />}
        </View>
        <View>
          {middleSubtitle && <Subtitle text={middleSubtitle} />}
          {middleTitle && <Title text={middleTitle} />}
          {bottomSubtitle && <Subtitle text={bottomSubtitle} />}
          {bottomTitle && <Title text={bottomTitle} color={bottomTitleColor} />}
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default SingleTile
