import React, { useState, Fragment } from 'react'

import { View, Text, TextInput } from 'react-native'
import PropTypes from 'prop-types'

import { Fonts, Colors, Padding, Margin } from 'theme'
import IconButton from 'components/atom/iconButton'
import Separator from 'components/atom/separator'

import iconChecklistActive from 'icons/ic-checklist.svg'
import iconChecklistInactive from 'icons/ic-borderchecklist.svg'

export default function PersonInfoPanel({
  title,
  checklistLabel,
  personName,
  personEmail,
  onCheckedAddition,
  additionPersonName,
  placeholderAdditionPersonName,
  additionPersonPhone,
  placeholderAdditionPersonPhone,
  onChangeAdditionPersonName,
  onChangeAdditionPersonPhone,
  style,
}) {
  const [checked, changeChecked] = useState(false)

  return (
    <Fragment>
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
        }}
      >
        <Text style={{ ...Fonts.f_12, ...Padding.pv_4, ...style }}>{personName}</Text>
        <Text style={{ ...Fonts.f_12, ...Padding.pv_4, ...style }}>{personEmail}</Text>
      </View>
      <Separator style={{ width: '100%', ...Margin.mt_12 }} />
      <View
        style={{
          width: '100%',
          flexDirection: 'column',
          ...Padding.ph_16,
          ...Padding.pv_12,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            ...style,
          }}
        >
          <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
            <IconButton
              height={20}
              width={20}
              svg={checked ? iconChecklistActive : iconChecklistInactive}
              onPress={() => {
                changeChecked(!checked)
                onCheckedAddition()
              }}
            />
          </View>
          <View
            style={{ flex: 11, alignItems: 'flex-start', justifyContent: 'center', ...Margin.ml_8 }}
          >
            <Text onPress={() => changeChecked(!checked)} style={{ ...Fonts.f_12 }}>
              {checklistLabel}
            </Text>
          </View>
        </View>
        {checked && (
          <View style={{ ...Margin.mt_20, ...Padding.pb_12, ...style }}>
            <TextInput
              style={{
                ...Fonts.f_12,
                borderBottomColor: Colors.light_grey,
                borderBottomWidth: 1,
                ...Padding.pb_8,
                ...Margin.mb_12,
              }}
              placeholderTextColor={Colors.grey}
              placeholder={placeholderAdditionPersonName}
              value={additionPersonName}
              onChangeText={(val) => onChangeAdditionPersonName(val)}
            />
            <TextInput
              style={{
                ...Fonts.f_12,
                borderBottomColor: Colors.light_grey,
                borderBottomWidth: 1,
                ...Padding.pb_8,
                ...Margin.mt_12,
                ...Margin.mb_12,
              }}
              placeholderTextColor={Colors.grey}
              placeholder={placeholderAdditionPersonPhone}
              value={additionPersonPhone}
              keyboardType={'numeric'}
              onChangeText={(val) => onChangeAdditionPersonPhone(val)}
            />
          </View>
        )}
      </View>
    </Fragment>
  )
}

PersonInfoPanel.defaultProps = {
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

PersonInfoPanel.propTypes = {
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
