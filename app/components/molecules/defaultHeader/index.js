import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import IconButton from 'components/atom/iconButton'
import { Padding, Row, Fonts, Background, Margin, Colors } from 'theme'

import { getStatusBarHeight } from 'react-native-status-bar-height'

const borderStyle = {
  backgroundColor: Colors.white,
  borderBottomWidth: 1,
  borderBottomColor: Colors.light_grey,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 1,
}

export default function DefaultHeader({
  children,
  isBlack,
  border,
  title,
  subtitle,
  iconLeft,
  onIconLeftPress,
  iconRight,
  onIconRightPress,
  isLeftAligned,
}) {
  return (
    <View
      style={[
        {
          flex: 1,
          ...Padding.pv_4,
          justifyContent: 'center',
          alignItems: 'center',
          ...Row.row_1,
          flexDirection: 'row',
          paddingTop: getStatusBarHeight(true),
          width: '100%',
        },
        border ? borderStyle : {},
      ]}
    >
      <View style={{ flex: 1, ...Padding.ph_12, ...Margin.mr_8, justifyContent: 'center' }}>
        {iconLeft && <IconButton onPress={onIconLeftPress} svg={iconLeft} fill={'#000'} />}
      </View>
      <View
        style={
          isLeftAligned
            ? { flex: 10, flexDirection: 'column', justifyContent: 'center' }
            : { flex: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }
        }
      >
        <Text style={{ ...Fonts.text_black, ...Fonts.f_16, ...Fonts.semibold }}>{title}</Text>
        {subtitle && (
          <Text
            style={
              ([{ ...Fonts.f_10, ...Margin.mt_4 }],
              isBlack ? { ...Fonts.text_black } : { ...Fonts.text_smoky_grey })
            }
          >
            {subtitle}
          </Text>
        )}
      </View>
      <View style={{ flex: 1, ...Padding.ph_12 }}>
        {iconRight && <IconButton onPress={onIconRightPress} svg={iconRight} fill={'#000'} />}
      </View>
    </View>
  )
}

DefaultHeader.defaultProps = {
  children: null,
  isLeftAligned: true,
  title: '',
  subtitle: null,
  iconLeft: null,
  onIconLeftPress: null,
  iconRight: null,
  onIconRightPress: null,
  border: false,
  isBlack: false,
}

DefaultHeader.propTypes = {
  children: PropTypes.node,
  isLeftAligned: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  iconLeft: PropTypes.string,
  onIconLeftPress: PropTypes.func,
  iconRight: PropTypes.string,
  onIconRightPress: PropTypes.func,
  border: PropTypes.bool,
  isBlack: PropTypes.bool,
}
