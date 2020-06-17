/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Fonts, Padding, Margin } from 'theme'

// create a component
export default function PaymentSelect({
  placeholder,
  paymentLabel,
  paymentValue,
  paymentSelectLabel,
  onVoucherChange,
  onPress,
  paymentType,
  uriImagePaymentType,
}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        ...Margin.mh_4,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Text style={{ ...Fonts.f_12, ...Padding.pl_12 }}>{paymentLabel}</Text>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <TouchableOpacity
          style={{
            shadowColor: '#000',
            width: '100%',
          }}
          onPress={onPress}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
            <View style={{ flexDirection: 'column', flex: 4 }}>
              {!paymentType && !uriImagePaymentType && (
                <View
                  style={{
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    ...Padding.pr_16,
                  }}
                >
                  <Text style={{ ...Fonts.f_12, ...Fonts.text_amber }}>{paymentSelectLabel}</Text>
                </View>
              )}
              {paymentType && (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    ...Padding.pr_16,
                  }}
                >
                  <Text style={{ ...Fonts.f_12, ...Fonts.text_grey }}>{paymentType}</Text>
                </View>
              )}
              {uriImagePaymentType && (
                <View
                  style={{
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    ...Padding.pr_16,
                  }}
                >
                  <Image
                    source={{ uri: uriImagePaymentType }}
                    resizeMode="contain"
                    style={{ flex: 1, height: 20, width: 60, ...Margin.mr_8 }}
                  />
                </View>
              )}
            </View>
            <Image
              source={require('icons/ic_back.png')}
              resizeMode="contain"
              style={{ alignSelf: 'flex-end', flex: 1, height: 20, width: 20, ...Margin.mr_8 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

PaymentSelect.defaultProps = {
  placeholder: 'Input Voucher Code / Choose Voucher',
  paymentLabel: 'Payment Method',
  paymentValue: '',
  paymentSelectLabel: 'Choose Payment Method',
  paymentType: 'Bank Transfer',
  uriImagePaymentType: require('icons/ic_BNI.png'),
}

PaymentSelect.proptypes = {
  placeholder: PropTypes.string,
  paymentValue: PropTypes.string,
  paymentLabel: PropTypes.string,
  paymentSelectLabel: PropTypes.string,
  onVoucherChange: PropTypes.func,
  onPress: PropTypes.func,
  paymentType: PropTypes.string,
  uriImagePaymentType: PropTypes.string,
}