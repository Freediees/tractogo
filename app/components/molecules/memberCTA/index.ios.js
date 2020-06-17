import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, View, Image } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Column, Border, Padding, Fonts, Colors, Margin } from 'theme'

import iconCTA from 'icons/ic-tinyCTA.svg'

export default function MemberCTA({ onPress, icon, title, description, style }) {
  return (
    <TouchableHighlight
      underlayColor={Colors.underlayGrey}
      style={{
        ...Border.border_w_1,
        ...Border.border_rad_8,
        ...Border.border_grey,
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
        <View style={{ flex: 3, marginRight: 8 }}>
          {icon && <Image source={icon} style={{ height: 70, width: 70 }} />}
        </View>
        <View style={{ flex: 9, flexDirection: 'column' }}>
          <Text style={{ ...Fonts.f_12, ...Fonts.semibold, ...Fonts.text_blue }}>{title}</Text>
          <Text style={{ ...Fonts.f_10, ...Fonts.text_black, ...Margin.mt_4 }}>{description}</Text>
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
          <SvgXml xml={iconCTA} height={25} width={25} />
        </View>
      </View>
    </TouchableHighlight>
  )
}

MemberCTA.defaultProps = {
  children: null,
  onPress: () => {},
  title: '',
  description: '',
  icon: null,
  style: {},
}

MemberCTA.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.shape({}),
}
