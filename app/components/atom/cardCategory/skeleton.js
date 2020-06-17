import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, View, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { CustomStyle, Justify, Flex, Border, Padding, Alignment, Fonts, Colors } from 'theme'

export default function CardCategorySkeleton({ style }) {
  return (
    <View
      style={{
        ...CustomStyle.shadow,
        ...Border.border_rad_8,
        ...style,
      }}
    >
      <View style={{ ...Flex.f_1, ...Border.border_rad_8 }}>
        <Image
          source={{ uri: image }}
          imageStyle={{}}
          style={{
            ...CustomStyle.h_100,
            ...CustomStyle.w_100,
            resizeMode: 'cover',
            ...CustomStyle.opacity_1,
            ...Border.border_rad_8,
            ...Flex.f_1,
          }}
        />
        <LinearGradient
          colors={['#ffffff', '#000000']}
          style={{
            ...CustomStyle.opacity_03,
            ...CustomStyle.w_100,
            ...CustomStyle.position_absolute,
            ...CustomStyle.h_100,
            ...Border.border_rad_8,
            ...Flex.f_1,
            ...Flex.flex_column,
          }}
        />
        <View
          style={{
            ...CustomStyle.h_100,
            ...Alignment.align_end,
            ...Justify.justify_end,
            ...Flex.f_1,
            ...CustomStyle.position_absolute,
            ...Padding.ph_8,
            ...Padding.pv_16,
          }}
        />
      </View>
    </View>
  )
}

CardCategorySkeleton.defaultProps = {
  style: {},
}

CardCategorySkeleton.propTypes = {
  style: PropTypes.shape({}),
}
