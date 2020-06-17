import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { CustomStyle, Flex, Border, Padding, Fonts, Margin, Background } from 'theme'
import { SvgXml } from 'react-native-svg'
import { LabelNumberFormat } from 'function/numberFormat'
import Moment from 'moment'

import Separator from 'components/atom/separator'

import icCarRental from 'icons/ic-carrental.svg'

export default function CartItem({
  style,
  cardTitle,
  city,
  startDate,
  endDate,
  rentHour,
  rentHourSuffix,
  totalAmount,
  carName,
}) {
  return (
    <View
      style={{
        ...Flex.flex_column,
        ...CustomStyle.w_100,
        ...Border.border_rad_8,
        ...Background.bg_white,
        ...CustomStyle.shadow,
        ...style,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          ...CustomStyle.w_100,
          ...Flex.flex_row,
          ...Padding.ph_20,
          ...Padding.pt_16,
        }}
      >
        <SvgXml xml={icCarRental} height={30} width={30} />
        <Text style={{ ...Fonts.f_12, ...Fonts.semibold, ...Margin.ml_12 }}>{cardTitle}</Text>
      </View>
      <Separator style={{ ...Margin.mv_8 }} />
      <View style={{ ...Flex.flex_column, ...Padding.ph_20, ...Padding.pb_16 }}>
        <Text style={{ ...Fonts.f_10, ...Fonts.semibold, ...Margin.mt_8 }}>{carName}</Text>
        <Text style={{ ...Fonts.f_10, ...Margin.mt_8 }}>{city}</Text>
        <Text style={{ ...Fonts.f_10, ...Margin.mt_8 }}>
          {endDate
            ? `${Moment(startDate).format('ddd, DD MMM')}` +
              `- ${Moment(endDate).format('ddd, DD MMM YYYY')}`
            : `${Moment(startDate).format('ddd, DD MMM')}`}
          {rentHour && ` | ${rentHour} ${rentHourSuffix}`}
        </Text>
        <Text style={{ ...CustomStyle.w_100, ...Fonts.f_8, ...Fonts.semibold, ...Margin.mt_8 }}>
          {'Total'}
        </Text>
        <LabelNumberFormat
          number={totalAmount}
          style={{ ...Fonts.f_8, ...Fonts.text_amber, ...Margin.mt_8 }}
        />
      </View>
    </View>
  )
}

CartItem.defaultProps = {
  style: {},
  cardTitle: 'Sewa Mobil - Dengan Sopir',
  city: 'Bandung',
  startDate: new Date(),
  endDate: new Date().getTime() + 86400000,
  rentHour: 12,
  rentHourSuffix: 'Jam',
  totalAmount: 500000,
  carName: 'TOYOTA ALPHARD',
}

CartItem.propTypes = {
  style: PropTypes.shape({}),
  cardTitle: PropTypes.string,
  city: PropTypes.string,
  startDate: PropTypes.Date,
  endDate: PropTypes.Date,
  rentHour: PropTypes.number,
  rentHourSuffix: PropTypes.string,
  totalAmount: PropTypes.number,
  carName: PropTypes.string,
}
