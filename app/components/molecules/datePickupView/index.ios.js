import React, { useState, Fragment } from 'react'

import { View, Text, TextInput } from 'react-native'
import PropTypes from 'prop-types'

import { Fonts, Colors, Padding, Margin } from 'theme'
import Separator from 'components/atom/separator'

export default function DatePickupView({
  title,
  startDateLabel,
  endDateLabel,
  startDateValue,
  endDatevalue,
  packageStartValue,
  packageEndValue,
  style,
}) {
  const [checked, changeChecked] = useState(false)

  return (
    <View>
      <View
        style={{
          width: '100%',
          ...Padding.ph_16,
          ...Padding.pv_16,
        }}
      >
        <Text style={{ ...Fonts.f_12, ...Fonts.semibold, ...style }}>{title}</Text>
      </View>
      <Separator style={{ width: '100%', ...Margin.mb_12 }} />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          ...Padding.ph_16,
          ...Padding.pb_16,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ ...Fonts.f_12, ...Padding.pv_4, ...Fonts.semibold }}>
            {startDateLabel}
          </Text>
          <Text style={{ ...Fonts.f_12, ...Padding.pv_4, ...style }}>{startDateValue}</Text>
          {packageStartValue !== null && (
            <Text style={{ ...Fonts.f_12, ...Padding.pv_4, ...style }}>
              {packageStartValue} Jam
            </Text>
          )}
        </View>
        {endDatevalue !== null && (
          <View style={{ flex: 1 }}>
            <Text style={{ ...Fonts.f_12, ...Padding.pv_4, ...Fonts.semibold }}>
              {endDateLabel}
            </Text>
            <Text style={{ ...Fonts.f_12, ...Padding.pv_4, ...style }}>{endDatevalue}</Text>
            {packageEndValue !== null && (
              <Text style={{ ...Fonts.f_12, ...Padding.pv_4, ...style }}>
                {packageEndValue} Jam
              </Text>
            )}
          </View>
        )}
        <View />
      </View>
    </View>
  )
}

DatePickupView.defaultProps = {
  title: 'Tanggal Mulai dan selesai',
  startDateLabel: 'Tanggal Mulai',
  endDateLabel: 'Tanggal Selesai',
  startDateValue: 'Jumat, 16 Des 2020',
  endDatevalue: null,
  packageStartValue: '12 Jam',
  packageEndValue: '12 Jam',
  checklistLabel: 'Pesan untuk orang lain',
  onCheckedAddition: () => {},
  additionPersonName: null,
  additionPersonPhone: null,
  onChangeAdditionPersonName: () => {},
  onChangeAdditionPersonPhone: () => {},
  placeholderAdditionPersonName: 'Nama Pemesan',
  placeholderAdditionPersonPhone: 'Nomor Handphone',
  style: {},
}

DatePickupView.propTypes = {
  title: PropTypes.string,
  personName: PropTypes.string,
  personEmail: PropTypes.string,
  checklistLabel: PropTypes.string,
  onCheckedAddition: PropTypes.func,
  additionPersonName: PropTypes.string,
  additionPersonPhone: PropTypes.string,
  placeholderAdditionPersonName: PropTypes.string,
  placeholderAdditionPersonPhone: PropTypes.string,
  onChangeAdditionPersonName: PropTypes.func,
  onChangeAdditionPersonPhone: PropTypes.func,
  style: PropTypes.shape,
}
