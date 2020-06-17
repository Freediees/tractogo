import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Image, Alert, TouchableHighlight } from 'react-native'
import { Colors, CustomStyle, Flex, Border, Padding, Fonts, Margin, Background } from 'theme'
import { SvgXml } from 'react-native-svg'
import { LabelNumberFormat } from 'function/numberFormat'
import Moment from 'moment'
import CountDown from 'react-native-countdown-component'

import Separator from 'components/atom/separator'

import icCarRental from 'icons/ic-carrental.svg'

export default function CardSimpleOrder({
  style,
  isHeader,
  cardTitle,
  city,
  startDate,
  endDate,
  rentHour,
  rentHourSuffix,
  totalAmount,
  carName,
  noReservasiLabel,
  showMoreLabel,
  orderCount,
  orderLabel,
  paymentStatusLabel,
  paymentStatusId,
  countDown,
  icOptions,
  isMultiOrder,
  onPress,
}) {
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [timerID, setTimerID] = useState('1')

  return (
    <TouchableHighlight underlayColor={Colors.light_grey} onPress={onPress}>
      <View
        style={{
          ...Flex.flex_column,
          ...CustomStyle.w_100,
          ...Border.border_rad_8,
          ...Background.bg_white,
          ...CustomStyle.light_shadow,
          ...style,
        }}
      >
        {isHeader && (
          <View style={{ ...Margin.mt_20, ...Padding.ph_20, flexDirection: 'row' }}>
            <View
              style={{
                flex: 4,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Text style={{ ...Fonts.f_10 }}>{noReservasiLabel}</Text>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
            >
              <LabelNumberFormat
                number={totalAmount}
                style={{ ...Fonts.f_10, ...Fonts.semibold }}
              />
            </View>
          </View>
        )}
        {isHeader && <Separator style={{ ...Margin.mt_8 }} />}
        <View
          style={{
            alignItems: 'center',
            ...CustomStyle.w_100,
            ...Flex.flex_row,
            ...Padding.ph_20,
            ...Padding.pt_8,
          }}
        >
          <SvgXml xml={icCarRental} height={30} width={30} />
          <Text style={{ ...Fonts.f_12, ...Fonts.semibold, ...Margin.ml_12 }}>{cardTitle}</Text>
        </View>
        <View style={{ ...Flex.flex_column, ...Padding.ph_20, ...Padding.pb_16 }}>
          <Text style={{ ...Fonts.f_10, ...Fonts.semibold, ...Margin.mt_8 }}>{carName}</Text>
          <Text style={{ ...Fonts.f_10, ...Margin.mt_8 }}>{city}</Text>
          <Text style={{ ...Fonts.f_10, ...Margin.mv_8 }}>
          {endDate
            ? `${Moment(startDate).format('ddd, DD MMM')}` +
              `- ${Moment(endDate).format('ddd, DD MMM YYYY')}` +
              ` | ${rentHour} ${rentHourSuffix}`
            : `${Moment(startDate).format('ddd, DD MMM')}` + ` | ${rentHour} ${rentHourSuffix}`}
          </Text>
          {isMultiOrder && (
            <View>
              <Separator style={{ ...Margin.mv_4 }} />
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ ...Fonts.f_10, ...Margin.mt_8 }}>
                  {showMoreLabel} {orderCount} {orderLabel}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableHighlight>
  )
}

CardSimpleOrder.defaultProps = {
  style: {},
  isHeader: true,
  cardTitle: 'Sewa Mobil - Dengan Sopir',
  city: 'Bandung',
  startDate: new Date(),
  endDate: new Date().getTime() + 86400000,
  rentHour: 12,
  rentHourSuffix: 'Jam',
  noReservasiLabel: 'No Reservasi 1234567',
  totalAmount: 500000,
  carName: 'TOYOTA ALPHARD',
  showMoreLabel: 'Show More',
  orderCount: 3,
  orderLabel: 'Orders',
  paymentStatusLabel: 'Menunggu Pembayaran',
  countDown: 60,
  icOptions: require('icons/ic-options.png'),
  paymentStatusId: 0,
  isMultiOrder: true,
  onPress: () => {},
}

CardSimpleOrder.propTypes = {
  style: PropTypes.shape({}),
  isHeader: PropTypes.bool,
  cardTitle: PropTypes.string,
  city: PropTypes.string,
  startDate: PropTypes.Date,
  endDate: PropTypes.Date,
  rentHour: PropTypes.number,
  rentHourSuffix: PropTypes.string,
  noReservasiLabel: PropTypes.string,
  totalAmount: PropTypes.number,
  carName: PropTypes.string,
  showMoreLabel: PropTypes.string,
  orderCount: PropTypes.number,
  orderLabel: PropTypes.string,
  paymentStatusLabel: PropTypes.string,
  countDown: PropTypes.number,
  icOptions: PropTypes.string,
  paymentStatusId: PropTypes.number,
  isMultiOrder: PropTypes.bool,
  onPress: PropTypes.func,
}
