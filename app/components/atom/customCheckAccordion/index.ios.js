import React, { useState } from 'react'

import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

import { Fonts, Border, Padding, Margin, Background } from 'theme'
import IconButton from 'components/atom/iconButton'
import CardHeaderPrice from 'components/atom/cardHeaderPrice'
import Separator from 'components/atom/separator'

import iconChecklistActive from 'icons/ic-checklist.svg'
import iconChecklistInactive from 'icons/ic-borderchecklist.svg'

export default function CustomCheckAccordion({
  renderHeader,
  notesTitleLabel,
  notes,
  onChecklistPress,
}) {
  const [checked, changeChecked] = useState(false)

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
          }}
        >
          <View style={{ flex: 11, alignItems: 'flex-start', justifyContent: 'center' }}>
            {renderHeader()}
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
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
        </View>
        {checked && (
          <View
            style={{
              ...Background.bg_ice_blue,
              ...Margin.mt_20,
              ...Border.border_rad_8,
              ...Padding.pv_12,
              ...Padding.ph_16,
            }}
          >
            <Text style={{ ...Fonts.f_10, ...Fonts.semibold, ...Fonts.text_smoky_grey }}>
              {notesTitleLabel}
            </Text>
            <Text style={{ ...Fonts.f_10, ...Margin.mt_8 }}>{notes}</Text>
          </View>
        )}
        <Separator style={{ ...Margin.mt_20 }} />
      </View>
    </View>
  )
}

CustomCheckAccordion.defaultProps = {
  renderHeader: () => {
    return <CardHeaderPrice />
  },
  notesTitleLabel: 'Keterangan',
  notes: 'Penambahan Biaya diperuntukan akomodasi dan penginapan sopir',
  onChecklistPress: () => {},
}

CustomCheckAccordion.propTypes = {
  renderHeader: PropTypes.func,
  notesTitleLabel: PropTypes.string,
  notes: PropTypes.string,
  onChecklistPress: PropTypes.func,
}
