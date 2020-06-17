import React, { useState, Fragment } from 'react'

import { View, Text, TextInput } from 'react-native'
import PropTypes from 'prop-types'

import { Fonts, Colors, Padding, Margin } from 'theme'
import Separator from 'components/atom/separator'

export default function PersonInfoView({ title, personName, personEmail, style }) {
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
          flexDirection: 'column',
          ...Padding.ph_16,
          ...Padding.pb_16,
        }}
      >
        <Text style={{ ...Fonts.f_12, ...Padding.pv_4, ...style }}>{personName}</Text>
        <Text style={{ ...Fonts.f_12, ...Padding.pv_4, ...style }}>{personEmail}</Text>
      </View>
    </View>
  )
}

PersonInfoView.defaultProps = {
  title: 'Data Pemesan',
  personName: 'Yoga Perdana',
  personEmail: 'yogaperdana@gmail.com',
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

PersonInfoView.propTypes = {
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
