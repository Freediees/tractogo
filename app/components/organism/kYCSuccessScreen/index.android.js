import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text } from 'react-native'
import DefaultFooter from 'components/molecules/defaultFooter'

import { Margin, Fonts, ImageSize } from 'theme'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function KYCSuccessScreen({ onButtonPress, title, label1, label2, buttonLabel }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        paddingTop: getStatusBarHeight(true),
        width: '100%',
      }}
    >
      <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('images/illustration-trac-11.png')}
            style={{ ...ImageSize.img_l, ...Margin.mt_20, ...Margin.mb_20 }}
          />
          <Text style={{ ...Fonts.f_12, ...Fonts.bold, textAlign: 'center' }}>{title}</Text>
          <Text
            style={{ ...Fonts.f_12, ...Margin.mt_16, textAlign: 'center', ...Fonts.text_dark_grey }}
          >
            {label1}
          </Text>
          <Text
            style={{ ...Fonts.f_12, ...Fonts.bold, textAlign: 'center', ...Fonts.text_dark_grey }}
          >
            {label2}
          </Text>
        </View>
      </View>
      <View style={{ flex: 2, width: '100%' }}>
        <DefaultFooter buttonText={buttonLabel} onButtonPress={onButtonPress} />
      </View>
    </View>
  )
}

KYCSuccessScreen.defaultProps = {
  onButtonPress: null,
  title: 'Yeay! pendaftaran kamu telah terkirim',
  label1: 'Kami sedang mengecek kelengkapan',
  label2: 'data yang telah kamu kirim, tunggu 1 x 24 Hour',
  buttonLabel: 'Home',
}

KYCSuccessScreen.propTypes = {
  onButtonPress: PropTypes.func,
  title: PropTypes.string,
  label1: PropTypes.string,
  label2: PropTypes.string,
  buttonLabel: PropTypes.string,
}
