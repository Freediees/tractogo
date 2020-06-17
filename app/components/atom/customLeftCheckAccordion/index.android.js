import React, { useState } from 'react'

import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

import { Fonts, Border, Padding, Margin, Background } from 'theme'
import IconButton from 'components/atom/iconButton'
import CardHeaderPrice from 'components/atom/cardHeaderPrice'
import Separator from 'components/atom/separator'

import iconChecklistActive from 'icons/ic-checklist.svg'
import iconChecklistInactive from 'icons/ic-borderchecklist.svg'

export default function CustomLeftCheckAccordion({
  renderHeader,
  onChecklistPress,
  children,
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
          <View style={{ flex: 11, alignItems: 'flex-start', justifyContent: 'center' }}>
            {renderHeader()}
          </View>
        </View>
        {checked && children}
      </View>
    </View>
  )
}

CustomLeftCheckAccordion.defaultProps = {
  renderHeader: () => {
    return <CardHeaderPrice />
  },
  onChecklistPress: () => {},
  children: null,
}

CustomLeftCheckAccordion.propTypes = {
  renderHeader: PropTypes.func,
  onChecklistPress: PropTypes.func,
  children: PropTypes.node,
}
