import React from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'

import IconButton from 'components/atom/iconButton'
import { Padding, Row } from 'theme'

import iconChat from 'icons/ic-chat.svg'
import iconNotif from 'icons/ic-notif.svg'

import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function BlueHeader({ children, onChatPress, onNotifPress }) {
  return (
    <View
      style={{
        ...Padding.pv_8,
        justifyContent: 'center',
        alignItems: 'center',
        ...Row.row_1,
        ...Padding.ph_20,
        flexDirection: 'row',
        paddingTop: getStatusBarHeight(true),
        backgroundColor: '#5f7bcf',
        width: '100%',
      }}
    >
      <View style={{ flex: 10 }}>
        <Image source={require('images/logo-negatif.png')} style={{ height: 25, width: 100 }} />
      </View>
      {/* <View style={{ flex: 1, ...Padding.ph_8 }}>
        <IconButton onPress={onChatPress} svg={iconChat} />
      </View> */}
      <View style={{ flex: 1, ...Padding.ph_8 }}>
        <IconButton onPress={onNotifPress} svg={iconNotif} />
      </View>
    </View>
  )
}

BlueHeader.defaultProps = {
  children: null,
  onChatPress: null,
  onNotifPress: null,
}

BlueHeader.propTypes = {
  children: PropTypes.node,
  onChatPress: PropTypes.func,
  onNotifPress: PropTypes.func,
}
