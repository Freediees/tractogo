import React, { useState, Fragment } from 'react'

import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

import { Fonts, Border, Padding, Margin, Background } from 'theme'
import IconButton from 'components/atom/iconButton'
import CardHeaderPrice from 'components/atom/cardHeaderPrice'
import Separator from 'components/atom/separator'

import iconChecklistActive from 'icons/ic-checklist.svg'
import iconChecklistInactive from 'icons/ic-borderchecklist.svg'

export default function CustomLeftCheckAccordion2({
  renderHeader,
  onChecklistPress,
  checked,
  changeChecked,
  children,
}) {
  return (
    <View
      style={{
        ...Padding.ph_16,
        ...Padding.pv_12,
      }}
    >
      <View style={{ width: '100%', flexDirection: 'column' }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            ...Margin.mb_12,
          }}
        >
          <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
            <IconButton
              height={20}
              width={20}
              svg={checked ? iconChecklistActive : iconChecklistInactive}
              onPress={() => {
                changeChecked(!checked)
                onChecklistPress()
              }}
            />
          </View>
          <View style={{ flex: 11, alignItems: 'flex-end', justifyContent: 'center' }}>
            {renderHeader()}
          </View>
        </View>
        {checked && <View>{children}</View>}
        <Separator style={{ ...Margin.mt_20 }} />
      </View>
    </View>
  )
}

CustomLeftCheckAccordion2.defaultProps = {
  renderHeader: () => {
    return <Text style={{ ...Fonts.f_12 }}>{'Jumlah Bensin yang akan diisi'}</Text>
  },
  onChecklistPress: () => {},
  children: null,
  checked: false,
  changeChecked: () => {},
}

CustomLeftCheckAccordion2.propTypes = {
  renderHeader: PropTypes.func,
  onChecklistPress: PropTypes.func,
  children: PropTypes.node,
  checked: PropTypes.bool,
  changeChecked: PropTypes.func,
}
