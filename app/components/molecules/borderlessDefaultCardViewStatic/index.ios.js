import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, Image } from 'react-native'
import { Fonts, Margin, ImageSize } from 'theme'

export default function BorderlessDefaultCardViewStatic({ icon, title, description, style }) {
  return (
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
  )
}

BorderlessDefaultCardViewStatic.defaultProps = {
  children: null,
  title: '',
  description: '',
  icon: null,
  style: {},
}

BorderlessDefaultCardViewStatic.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.shape({}),
}
