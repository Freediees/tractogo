/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import IconButton from 'components/atom/iconButton'
import { View, Text, Image, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Fonts, Padding, Margin, Border, Background } from 'theme'
import PrimaryButton from 'components/atom/primaryButton'
import CountDown from 'react-native-countdown-component'

// create a component
export default function WaitPaymentSection({
  paymentStatusLabel,
  checkVoucherPress,
  countDown,
  onPaymentPress,
  isExpired,
}) {
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [timerID, setTimerID] = useState('1')

  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          ...Flex.flex_2,
        }}
      >
        <Text style={{ ...Fonts.f_12, ...Padding.pl_16, ...Flex.flex_1 }}>
          {paymentStatusLabel}
        </Text>
        {isTimerRunning && isExpired ? (
          <View style={{ alignItems: 'flex-start', ...Padding.pv_8, ...Margin.mr_8 }}>
            <CountDown
              id={timerID}
              until={countDown}
              style={{ ...Margin.ml_4 }}
              onFinish={() => {
                setIsTimerRunning(false)
              }}
              size={10}
              digitStyle={{ ...Background.bg_ice_blue }}
              digitTxtStyle={{ ...Fonts.text_red }}
              separatorStyle={{ color: '#000000' }}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{ m: null, s: null }}
              showSeparator
              running={isTimerRunning}
            />
          </View>
        ) : (
          <Text style={{ ...Fonts.f_12, ...Padding.ph_8, ...Fonts.text_red }}>Expired</Text>
        )}
      </View>

      {isExpired && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            ...Flex.flex_1,
          }}
        >
          <View style={{ justifyContent: 'flex-end', ...Padding.pr_8, ...Flex.flex_1 }}>
            <PrimaryButton
              style={{ ...Margin.mv_8, alignItems: 'center' }}
              text={'Pay Now'}
              onPress={onPaymentPress}
            />
          </View>
        </View>
      )}
    </View>
  )
}

WaitPaymentSection.defaultProps = {
  placeholder: 'Masukan Kode Voucher',
  paymentStatusLabel: 'Waiting for Payment',
  isTimerRunning: true,
  isExpired: false,
  voucherValue: '',
  checkVoucherPress: () => {},
  voucherError: 'Error di sini',
  countDown: 60,
  onPaymentPress: () => {},
}

WaitPaymentSection.proptypes = {
  placeholder: PropTypes.string,
  voucherValue: PropTypes.string,
  paymentStatusLabel: PropTypes.string,
  isTimerRunning: PropTypes.bool,
  isExpired: PropTypes.bool,
  onVoucherChange: PropTypes.func,
  checkVoucherPress: () => {},
  voucherError: PropTypes.string,
  countDown: PropTypes.number,
  onPaymentPress: PropTypes.func,
}
