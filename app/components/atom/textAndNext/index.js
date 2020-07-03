import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Column, Padding, Fonts, Colors, Margin } from 'theme'

import iconCTA from 'icons/ic-tinyCTA.svg'

export default function DefaultCTA({ onPress, icon, title, description, superscript, style }) {
  return (
    <TouchableHighlight underlayColor={Colors.underlayGrey} onPress={() => onPress()}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          ...Padding.ph_20,
          ...Padding.pv_16,
          ...Margin.mt_8,
          backgroundColor: Colors.white,
        }}
      >
        <Text style={{ ...Fonts.f_12 }}>{title}</Text>
        <SvgXml xml={iconCTA} height={40} width={40} />
      </View>
    </TouchableHighlight>
  )
}

DefaultCTA.defaultProps = {
  onPress: () => {},
  title: 'Pick-up location',
}

DefaultCTA.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
}
