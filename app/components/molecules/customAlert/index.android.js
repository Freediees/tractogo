import React from 'react'
import { View, Text, TouchableOpacity, Modal, ScrollView, Image } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import PrimaryButton from 'components/atom/primaryButton'
import { SvgXml } from 'react-native-svg'
import { Fonts, Margin, Padding, Border, Row, Column, Colors, Background, Alignment } from 'theme'
import PropTypes from 'prop-types'

export default function CustomAlert({
  visible,
  onPress,
  imageSource,
  title,
  information,
  buttonLabel,
}) {
  return (
    <Modal
      animationType="fade" // fade
      visible={visible}
      transparent={true}
    >
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.2)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            ...Column.col_10,
            alignSelf: 'center',
            backgroundColor: Colors.white,
            ...Padding.ph_16,
            ...Padding.pv_16,
            justifyContent: 'center',
            alignItems: 'center',
            ...Border.border_rad_8,
          }}
        >
          <Text style={{ ...Fonts.f_14, ...Fonts.semibold, ...Margin.mv_8 }}>{title}</Text>
          <Text style={{ ...Fonts.f_12, ...Margin.mv_8 }}>{information}</Text>
          {imageSource && (
            <Image
              style={{ width: '100%', aspectRatio: 1.5 }}
              resizeMode={'contain'}
              source={imageSource}
            />
          )}
          <View style={{ width: '100%', ...Margin.mt_16, height: 48 }}>
            <PrimaryButton text={buttonLabel} onPress={onPress} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

CustomAlert.defaultProps = {
  visible: false,
  onPress: () => {},
  imageSource: null,
  title: 'Alert',
  information: '',
  buttonLabel: '',
}

CustomAlert.propTypes = {
  visible: PropTypes.bool,
  onPress: PropTypes.func,
  imageSource: PropTypes.string,
  title: PropTypes.string,
  information: PropTypes.string,
  buttonLabel: PropTypes.string,
}
