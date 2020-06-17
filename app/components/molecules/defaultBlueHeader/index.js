import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import IconButton from 'components/atom/iconButton'
import { Padding, Row, Fonts, Background, Margin } from 'theme'

import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function DefaultBlueHeader({
  children,
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
      style={{
        ...Background.bg_blue,
        ...Padding.pv_8,
        justifyContent: 'center',
        alignItems: 'center',
        ...Row.row_1_5,
        flexDirection: 'row',
        paddingTop: getStatusBarHeight(true),
        width: '100%',
      }}
    >
      <View style={{ flex: 1, ...Padding.ph_20, ...Margin.mr_8, justifyContent: 'center' }}>
        {iconLeft && <IconButton onPress={onIconLeftPress} svg={iconLeft} />}
      </View>
      <View
        style={
          isLeftAligned
            ? { flex: 10, flexDirection: 'column', justifyContent: 'center' }
            : { flex: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }
        }
      >
        <Text style={{ ...Fonts.text_white, ...Fonts.f_16, ...Fonts.semibold }}>{title}</Text>
        {subtitle && <Text style={{ ...Fonts.text_white, ...Fonts.f_14 }}>{subtitle}</Text>}
      </View>
      <View style={{ flex: 1, ...Padding.ph_8 }}>
        {iconRight && <IconButton onPress={onIconRightPress} svg={iconRight} />}
      </View>
    </View>
  )
}

DefaultBlueHeader.defaultProps = {
  children: null,
  isLeftAligned: true,
  title: '',
  subtitle: null,
  iconLeft: null,
  onIconLeftPress: null,
  iconRight: null,
  onIconRightPress: null,
}

DefaultBlueHeader.propTypes = {
  children: PropTypes.node,
  isLeftAligned: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  iconLeft: PropTypes.string,
  onIconLeftPress: PropTypes.func,
  iconRight: PropTypes.string,
  onIconRightPress: PropTypes.func,
}
