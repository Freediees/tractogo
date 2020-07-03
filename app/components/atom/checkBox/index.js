import React, { useState } from 'react'

import { View } from 'react-native'
import PropTypes from 'prop-types'

import { Padding } from 'theme'
import IconButton from 'components/atom/iconButton'

import iconChecklistActive from 'icons/ic-checklist.svg'
import iconChecklistInactive from 'icons/ic-borderchecklist.svg'

export default function CheckBox({
  renderHeader,
  onCheck,
  checked,

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
          }}
        >
          <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
            <IconButton
              height={20}
              width={20}
              svg={checked ? iconChecklistActive : iconChecklistInactive}
              onPress={() => {
                console.log(checked)
                onCheck(!checked)
              }}
            />
          </View>
          <View style={{ flex: 11, alignItems: 'flex-start', justifyContent: 'center' }}>
            {renderHeader()}
          </View>
        </View>
      </View>
    </View>
  )
}

CheckBox.defaultProps = {
  renderHeader: () => {},
  titleLabel: 'All',
  onCheck: () => {},
  checked: false,
}

CheckBox.propTypes = {
  renderHeader: PropTypes.func,
  titleLabel: PropTypes.string,
  onCheck: PropTypes.func,
  checked: PropTypes.bool,
}
