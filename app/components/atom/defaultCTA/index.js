import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Column, Padding, Fonts, Colors, Margin } from 'theme'

import iconCTA from 'icons/ic-tinyCTA.svg'

export default function DefaultCTA({ onPress, icon, title, description, superscript, style }) {
  return (
    <TouchableHighlight
      underlayColor={Colors.underlayGrey}
      style={{
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
          ...Padding.ph_20,
          ...Padding.pv_20,
        }}
      >
        <View style={{ flex: 9, flexDirection: 'column' }}>
          <Text style={{ ...Fonts.f_12, ...Fonts.semibold, ...Fonts.text_black }}>{title}</Text>
          <Text style={{ ...Fonts.f_10, ...Fonts.text_black, ...Margin.mt_4 }}>
            {description}
            {` `}
            <Text
              style={{ ...Fonts.f_14, ...Fonts.text_red, lineHeight: 22, textAlignVertical: 'top' }}
            >
              {superscript}
            </Text>
          </Text>
        </View>
        <View
          style={{
            height: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            ...Column.col_1,
          }}
        >
          <SvgXml xml={iconCTA} height={40} width={40} />
        </View>
      </View>
    </TouchableHighlight>
  )
}

DefaultCTA.defaultProps = {
  children: null,
  onPress: () => {},
  title: 'Pick-up location',
  description: 'Masukkan detail lokasi penjemputan',
  superscript: '*',
  style: {},
}

DefaultCTA.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  superscript: PropTypes.string,
  style: PropTypes.shape({}),
}
