import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, View, Image } from 'react-native'
import { SvgXml } from 'react-native-svg'
import {
  CustomStyle,
  Justify,
  Alignment,
  Background,
  Border,
  Padding,
  Fonts,
  Colors,
  Margin,
  Flex,
  ImageSize,
} from 'theme'

export default function CardButtonSkeleton({ style }) {
  return (
    <View
      style={{
        ...CustomStyle.shadow,
        ...Justify.justify_center,
        ...Alignment.align_center,
        ...Background.bg_white,
        ...Border.border_rad_8,
        ...Padding.pv_16,
        ...Padding.ph_16,
        ...Alignment.align_center,
        ...style,
      }}
    >
      <View style={{ ...Flex.f_10, ...Border.border_rad_8 }}>
        <View
          style={{
            ...Flex.f_5,
            ...Flex.flex_column,
            ...Justify.justify_end,
            ...Alignment.align_center,
            ...Margin.mt_12,
          }}
        >
          <View style={{ ...ImageSize.img_40 }} />
        </View>
        <View
          style={{
            ...Flex.f_5,
            ...Flex.flex_column,
            ...Alignment.align_center,
            ...Margin.mt_12,
          }}
        />
      </View>
    </View>
  )
}

CardButtonSkeleton.defaultProps = {
  style: {},
}

CardButtonSkeleton.propTypes = {
  style: PropTypes.shape({}),
}
