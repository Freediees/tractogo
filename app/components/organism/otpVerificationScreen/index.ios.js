/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text } from 'react-native'
import OTPInput from 'components/atom/oTPInput'
import TextButton from 'components/atom/textButton'
import DefaultHeader from 'components/molecules/defaultHeader'
import DefaultFooter from 'components/molecules/defaultFooter'

import CountDown from 'react-native-countdown-component'

import { Column, Margin, Fonts } from 'theme'

import backIcon from 'icons/ic-back.svg'

export default function OTPVerificationScreen({
  onIconLeftPress,
  onButtonPress,
  phoneNumber,
  title,
  label1,
  label2,
  buttonLabel,
  onCodeFilled,
  timer,
  errorMessage,
}) {
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [timerID, setTimerID] = useState('1')

  const _len = phoneNumber.length - 4
  const _phoneNo = `${phoneNumber.substring(0, 4)}xxxx${phoneNumber.substring(
    _len,
    phoneNumber.length
  )}`

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
              {_phoneNo}
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <OTPInput onCodeFilled={onCodeFilled} />
            <Text style={{ ...Fonts.f_10, ...Fonts.text_red, ...Margin.mb_8 }}>
              {errorMessage ? JSON.stringify(errorMessage) : ''}
            </Text>
            {isTimerRunning ? (
              <CountDown
                id={timerID}
                until={timer}
                onFinish={() => {
                  setIsTimerRunning(false)
                }}
                size={12}
                digitStyle={{ backgroundColor: '#FFF' }}
                separatorStyle={{ color: '#000000' }}
                timeToShow={['M', 'S']}
                timeLabels={{ m: null, s: null }}
                showSeparator
                running={isTimerRunning}
              />
            ) : (
              <TextButton
                onPress={() => {
                  setTimerID(
                    Math.random()
                      .toString(36)
                      .replace(/[^a-z]+/g, '')
                      .substr(0, 5)
                  )
                  setIsTimerRunning(true)
                }}
                text={'resend code'}
              />
            )}
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 2 }}>
        <DefaultFooter buttonText={buttonLabel} onButtonPress={onButtonPress} />
      </View>
    </View>
  )
}

OTPVerificationScreen.defaultProps = {
  onIconLeftPress: null,
  onButtonPress: null,
  phoneNumber: '628123456789',
  title: 'Verifikasi Akun',
  label1: 'Masukkan Kode',
  label2: 'Masukan Kode Verifikasi yang telah dikirim via sms ke ',
  buttonLabel: 'Verifikasi',
  isTimerRunning: true,
  onCodeFilled: (a) => {
    console.log(a)
  },
  timer: 60,
  errorMessage: '',
}

OTPVerificationScreen.propTypes = {
  onIconLeftPress: PropTypes.func,
  onButtonPress: PropTypes.func,
  phoneNumber: PropTypes.string,
  title: PropTypes.string,
  label1: PropTypes.string,
  label2: PropTypes.string,
  buttonLabel: PropTypes.string,
  isTimerRunning: PropTypes.bool,
  onCodeFilled: PropTypes.func,
  timer: PropTypes.number,
  errorMessage: PropTypes.string,
}
