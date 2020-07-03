/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import IconButton from 'components/atom/iconButton'
import { View, Text, Image, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import { Fonts, Padding, Margin, Border, Background } from 'theme'

// create a component
export default function VoucherFooter({
  placeholder,
  voucherLabel,
  voucherValue,
  onVoucherChange,
  voucherError,
  checkVoucherPress,
}) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Image
          source={require('icons/ic_coupon.png')}
          resizeMode="contain"
          style={{ height: 20, width: 24 }}
        />
        <Text style={{ ...Fonts.f_12, ...Padding.ph_8 }}>{voucherLabel}</Text>
      </View>

      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <TextInput
            placeholder={placeholder}
            style={{
              ...Background.bg_light_grey,
              height: 40,
              ...Padding.pl_8,
              ...Margin.mr_16,
              flex: 9,
              ...Fonts.text_black,
              ...Border.border_rad_4,
            }}
            value={voucherValue}
            onChangeText={onVoucherChange}
            autoCapitalize="none"
          />
          {voucherError && <Text style={{ ...Fonts.f_8, ...Fonts.text_red }}>{voucherError}</Text>}
        </View>
        <IconButton
          icon={require('icons/ic_back.png')}
          fill={'black'}
          height={24}
          width={24}
          onPress={async () => checkVoucherPress()}
        />
      </View>
    </View>
  )
}

VoucherFooter.defaultProps = {
  placeholder: 'Masukan Kode Voucher',
  voucherLabel: 'Voucher',
  voucherValue: '',
  checkVoucherPress: () => {},
  voucherError: 'Error di sini',
}

VoucherFooter.proptypes = {
  placeholder: PropTypes.string,
  voucherValue: PropTypes.string,
  voucherLabel: PropTypes.string,
  onVoucherChange: PropTypes.func,
  checkVoucherPress: () => {},
  voucherError: PropTypes.string,
}
