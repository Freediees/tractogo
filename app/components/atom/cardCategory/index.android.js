import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, View, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { CustomStyle, Justify, Flex, Border, Padding, Alignment, Fonts, Colors } from 'theme'

export default function CardCategory({ onPress, image, text, children, style }) {
  return (
    <TouchableHighlight
      underlayColor={Colors.transparent}
      style={{
        ...CustomStyle.shadow,
        ...style,
      }}
      onPress={onPress}
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
        >
          <Text style={{ ...Fonts.text_white, ...Fonts.f_10 }}>{text}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

CardCategory.defaultProps = {
  children: null,
  onPress: () => {},
  text: '',
  image: '',
  style: {},
}

CardCategory.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  text: PropTypes.string,
  image: '',
  style: PropTypes.shape({}),
}
