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

export default function CardButton({ onPress, icon, text, svg, url, children, style }) {
  return (
    <TouchableHighlight
      underlayColor={Colors.underlayGrey}
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
      onPress={onPress}
    >
      <View style={{ ...Flex.f_10 }}>
        <View
          style={{
            ...Flex.f_5,
            ...Flex.flex_column,
            ...Justify.justify_end,
            ...Alignment.align_center,
            ...Margin.mt_12,
          }}
        >
          {svg && <SvgXml xml={svg} width={40} height={40} />}
          {url && <Image source={{ uri: url }} style={{ ...ImageSize.img_40 }} />}
          {icon && <Image source={icon} style={{ ...ImageSize.img_40 }} />}
        </View>
        <View
          style={{
            ...Flex.f_5,
            ...Flex.flex_column,
            ...Alignment.align_center,
            ...Margin.mt_12,
          }}
        >
          <Text style={{ ...Fonts.f_10, ...Fonts.semibold, ...Fonts.text_blue, ...Fonts.center }}>
            {text}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

CardButton.defaultProps = {
  children: null,
  onPress: () => {},
  text: '',
  svg: null,
  url: null,
  icon: null,
  style: {},
}

CardButton.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  text: PropTypes.string,
  url: PropTypes.string,
  svg: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.shape({}),
}
