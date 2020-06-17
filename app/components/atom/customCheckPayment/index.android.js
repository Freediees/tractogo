import React, { useState } from 'react'

import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'

import { Fonts, Border, Padding, Margin, CustomStyle, Background } from 'theme'
import IconButton from 'components/atom/iconButton'
import Separator from 'components/atom/separator'

import iconChecklistActive from 'icons/ic-checklist.svg'
import iconChecklistInactive from 'icons/ic-borderchecklist.svg'

export default function CustomCheckPayment({ checked, paymentLabel, renderContent, onChecklistPress }) {
  return (
    <View
      style={{
        ...Padding.ph_16,
        flexDirection: 'column',
      }}
    >
      <View style={[checked ? styles.border : styles.noBorder]}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <View style={{ flex: 11, alignItems: 'flex-start', justifyContent: 'center', ...Padding.ph_16, ...Padding.pv_12 }}>
            <Text style={{ ...Fonts.f_12 }}>{paymentLabel}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
            <IconButton
              height={20}
              width={20}
              svg={checked ? iconChecklistActive : iconChecklistInactive}
              onPress={() => {
                onChecklistPress()
              }}
            />
          </View>
        </View>
        <Separator style={{ ...Margin.mt_12 }} />
        {checked && (
          <View
            style={{
              ...Padding.ph_16,
            }}
          >
            {renderContent()}
          </View>
        )}
      </View>
    </View>
  )
}

CustomCheckPayment.defaultProps = {
  paymentLabel: 'Credit Card or Debit',
  renderContent: () => {
    return <Text style={{ ...Fonts.f_12 }}>Credit Card or Debit</Text>
  },
  onChecklistPress: () => {},
}

CustomCheckPayment.propTypes = {
  paymentLabel: PropTypes.string,
  renderContent: PropTypes.func,
  onChecklistPress: PropTypes.func,
}

const styles = StyleSheet.create({
  border: {
    width: '100%',
    flexDirection: 'column',
    ...Background.bg_white,
    ...CustomStyle.light_shadow,
    ...Border.border_rad_4,
    ...Margin.mb_8,
  },
  noBorder: {
    width: '100%',
    flexDirection: 'column',
    ...Background.bg_white,
  },
})
