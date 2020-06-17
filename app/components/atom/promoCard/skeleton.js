import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, View, Image } from 'react-native'
import { SvgXml } from 'react-native-svg'
import {
  Background,
  Column,
  Row,
  Border,
  Padding,
  Alignment,
  Fonts,
  Colors,
  Margin,
  CustomStyle,
} from 'theme'

export default function PromoCardSkeleton({ style }) {
  return (
    <View
      style={{
        ...CustomStyle.shadow,
        ...Border.border_rad_8,
        ...style,
      }}
    >
      <View
        style={{
          ...Border.border_rad_8,
          ...CustomStyle.h_100,
          ...CustomStyle.w_100,
        }}
      />
    </View>
  )
}

PromoCardSkeleton.defaultProps = {
  style: {},
}

PromoCardSkeleton.propTypes = {
  style: PropTypes.shape({}),
}
