import React from 'react'
import { View, Text } from 'react-native'
import { Column, Margin, Fonts, Colors, Padding, Row, Alignment, ImageSize, Flex, CustomStyle } from 'theme'

const SummaryCard = () => {
  return (
    <View style={{ margin: 16, padding: 16 }}>
      <Text style={{ ...Fonts.f_12}}>Summary Card</Text>
    </View>
  )
}

export default SummaryCard
