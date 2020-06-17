import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, View, Image } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Background, Column, Row, Border, Padding, Alignment, Fonts, Colors, Margin, CustomStyle } from 'theme'

export default function PromoCard({ onPress, image, children, style }) {
  return (
    <TouchableHighlight
      underlayColor={Colors.transparent}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        ...style,
      }}
      onPress={onPress}
    >
      <Image source={{ uri: image }} style={{ 
          ...Border.border_rad_8,
          ...CustomStyle.h_100,
          ...CustomStyle.w_100,
          ...CustomStyle.resize_contain, }} />
    </TouchableHighlight>
  )
}

PromoCard.defaultProps = {
  children: null,
  onPress: () => {},
  image: '',
  style: {},
}

PromoCard.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  image: '',
  style: PropTypes.shape({}),
}
