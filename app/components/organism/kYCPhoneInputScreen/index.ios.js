import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, ScrollView, Text } from 'react-native'
import PhoneFieldInput from 'components/atom/phoneFieldInput'
import DefaultHeader from 'components/molecules/defaultHeader'
import DefaultFooter from 'components/molecules/defaultFooter'

import { Column, Margin, Fonts } from 'theme'

import backIcon from 'icons/ic-back.svg'

export default function KYCPhoneInputScreen({
  onIconLeftPress,
  onButtonPress,
  flag,
  placeholder,
  phoneNumber,
  onChangeText,
  getCountry,
  countryCode,
  title,
  subtitle,
  label1,
  label2,
  buttonLabel,
}) {
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <DefaultHeader
        isLeftAligned={false}
        title={title}
        iconLeft={backIcon}
        onIconLeftPress={onIconLeftPress}
      />
      <View style={{ flex: 9 }}>
        <ScrollView style={{ ...Column.col_12, flexDirection: 'column', paddingHorizontal: '5%' }}>
          <View style={{ ...Margin.mt_20, ...Margin.mb_20 }}>
            <Text style={{ ...Fonts.f_12, ...Fonts.semibold, textAlign: 'left' }}>{subtitle}</Text>
            <Text
              style={{ ...Fonts.f_12, ...Margin.mt_16, textAlign: 'left', ...Fonts.text_dark_grey }}
            >
              {label1}
            </Text>
            <Text style={{ ...Fonts.f_12, textAlign: 'left', ...Fonts.text_dark_grey }}>
              {label2}
            </Text>
          </View>
          <View style={{ alignItems: 'center', ...Margin.mt_20 }}>
            <PhoneFieldInput />
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 2 }}>
        <DefaultFooter buttonText={buttonLabel} onButtonPress={onButtonPress} />
      </View>
    </View>
  )
}

KYCPhoneInputScreen.defaultProps = {
  onIconLeftPress: null,
  onButtonPress: null,
  phoneNumber: '62xxxxxx8008',
  title: 'No. Handphone',
  subtitle: 'Masukkan No Handphone Kamu',
  label1: 'Kode verifikasi akan dikirimkan ke No handphone',
  label2: 'yang kamu isi',
  buttonLabel: 'Lanjut',
  flag: null,
  placeholder: 'Masukkan nomor telepon',
  phoneNumber: '',
  onChangeText: () => {},
  getCountry: () => {},
  countryCode: '+62',
}

KYCPhoneInputScreen.propTypes = {
  onIconLeftPress: PropTypes.func,
  onButtonPress: PropTypes.func,
  phoneNumber: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  label1: PropTypes.string,
  label2: PropTypes.string,
  buttonLabel: PropTypes.string,
  flag: PropTypes.shape({}),
  placeholder: PropTypes.string,
  phoneNumber: PropTypes.string,
  onChangeText: PropTypes.func,
  getCountry: PropTypes.func,
  countryCode: PropTypes.string,
}
