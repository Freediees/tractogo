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
import icAirportTransfer from 'icons/ic-airporttransport.svg'

export default function CardOrder({
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
  isAirport,
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
          <SvgXml xml={isAirport ? icAirportTransfer : icCarRental} height={30} width={30} />
          <Text style={{ ...Fonts.f_12, ...Fonts.semibold, ...Margin.ml_12 }}>{cardTitle}</Text>
        </View>
        <View style={{ ...Flex.flex_column, ...Padding.ph_20, ...Padding.pb_16 }}>
          <Text style={{ ...Fonts.f_10, ...Fonts.semibold, ...Margin.mt_8 }}>{carName}</Text>
          <Text style={{ ...Fonts.f_10, ...Margin.mt_8 }}>{city}</Text>
          <Text style={{ ...Fonts.f_10, ...Margin.mv_8 }}>
          {endDate
            ? `${Moment(startDate).format('ddd, DD MMM')}` +
              `- ${Moment(endDate).format('ddd, DD MMM YYYY')}`
            : `${Moment(startDate).format('ddd, DD MMM')}`}
          {rentHour && ` | ${rentHour} ${rentHourSuffix}`}
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
        {paymentStatusId === 0 ? (
          <View
            style={{
              ...CustomStyle.w_100,
              ...Background.bg_ice_blue,
              ...Border.border_rad_8,
              ...Padding.pv_8,
              ...Padding.ph_16,
              ...Flex.flex_row,
              alignContent: 'center', 
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ ...Flex.flex_row, alignContent: 'center', alignItems: 'center' }}>
              <Text style={{ ...Fonts.f_10 }}>{paymentStatusLabel}</Text>
              {/* oDown
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
                timeToShow={['M', 'S']}
                timeLabels={{ m: null, s: null }}
                showSeparator
                running={isTimerRunning}
              /> */}
              {/* <Text style={{ ...Margin.ml_4, ...Fonts.f_10, ...Fonts.text_red }}>
                {countDown}
              </Text> */}
            </View>
            {/* <View>
              <Image style={{ resizeMode: 'contain' }} source={icOptions} width={12} height={14} />
            </View> */}
          </View>
        ) : (
          <View
            style={{
              ...CustomStyle.w_100,
              ...Background.bg_ice_blue,
              ...Border.border_rad_8,
              ...Padding.pv_12,
              ...Padding.ph_16,
              ...Flex.flex_row,
              justifyContent: 'space-between',
            }}
          >
            <View style={{ ...Flex.flex_row }}>
              <Text style={{ ...Fonts.f_10 }}>{paymentStatusLabel}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableHighlight>
  )
}

CardOrder.defaultProps = {
  style: {},
  isHeader: true,
  cardTitle: 'Car Rental - With Driver',
  city: 'Bandung',
  startDate: new Date(),
  endDate: new Date().getTime() + 86400000,
  rentHour: 12,
  rentHourSuffix: 'Hour',
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
  isAirport: false,
}

CardOrder.propTypes = {
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
  isAirport: PropTypes.bool,
}
