import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, View, Image } from 'react-native'
import { Column, Border, Padding, Fonts, Colors, Margin, ImageSize } from 'theme'

export default function BorderlessDefaultCardView({ onPress, icon, title, description, style }) {
  return (
    <TouchableHighlight
      underlayColor={Colors.underlayGrey}
      style={{
        ...Padding.pv_20,
        ...Padding.ph_20,
        ...style,
      }}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          flex: 13,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ flex: 3, ...Margin.mr_16 }}>
          {icon && <Image source={icon} style={{ ...ImageSize.img_xs }} />}
        </View>
        <View style={{ flex: 10, flexDirection: 'column' }}>
          <Text style={{ ...Fonts.f_12, ...Fonts.text_black, ...Fonts.semibold }}>{title}</Text>
          <Text style={{ ...Fonts.f_10, ...Fonts.text_black, ...Margin.mt_4 }}>{description}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

BorderlessDefaultCardView.defaultProps = {
  children: null,
  onPress: () => {},
  title: '',
  description: '',
  icon: null,
  style: {},
}

BorderlessDefaultCardView.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.shape({}),
}
