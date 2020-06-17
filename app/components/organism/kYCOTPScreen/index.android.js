import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, ScrollView, Text } from 'react-native'
import OTPInput from 'components/atom/oTPInput'
import DefaultHeader from 'components/molecules/defaultHeader'
import DefaultFooter from 'components/molecules/defaultFooter'

import { Column, Margin, Fonts } from 'theme'

import backIcon from 'icons/ic-back.svg'

export default function KYCOTPScreen({
  onIconLeftPress,
  onButtonPress,
  phoneNumber,
  onCodeFilled,
  title,
  label1,
  label2,
  buttonLabel,
}) {
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <DefaultHeader title={title} iconLeft={backIcon} onIconLeftPress={onIconLeftPress} />
      <View style={{ flex: 9 }}>
        <ScrollView style={{ ...Column.col_12, flexDirection: 'column', paddingHorizontal: '10%' }}>
          <View>
            <Text style={{ ...Fonts.f_12, ...Fonts.semibold, textAlign: 'left' }}>{label1}</Text>
            <Text
              style={{ ...Fonts.f_12, ...Margin.mt_16, textAlign: 'left', ...Fonts.text_dark_grey }}
            >
              {label2}
            </Text>
            <Text
              style={{
                ...Fonts.f_12,
                ...Fonts.semibold,
                ...Margin.mt_8,
                textAlign: 'left',
                ...Fonts.text_dark_grey,
              }}
            >
              {phoneNumber}
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <OTPInput onCodeFilled={onCodeFilled} />
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 2 }}>
        <DefaultFooter buttonText={buttonLabel} onButtonPress={onButtonPress} />
      </View>
    </View>
  )
}

KYCOTPScreen.defaultProps = {
  onIconLeftPress: null,
  onButtonPress: null,
  phoneNumber: '62xxxxxx8008',
  title: 'Verifikasi',
  label1: 'Masukkan Kode',
  label2: 'Masukan Kode Verifikasi yang telah dikirim via sms ke ',
  buttonLabel: 'Verifikasi',
}

KYCOTPScreen.propTypes = {
  onIconLeftPress: PropTypes.func,
  onButtonPress: PropTypes.func,
  phoneNumber: PropTypes.string,
  title: PropTypes.string,
  label1: PropTypes.string,
  label2: PropTypes.string,
  buttonLabel: PropTypes.string,
}
