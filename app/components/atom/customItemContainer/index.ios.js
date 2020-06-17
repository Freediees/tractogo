/* eslint-disable react/display-name */
import React from 'react'

import { View } from 'react-native'
import PropTypes from 'prop-types'

import { Padding, Margin } from 'theme'
import CardHeaderPrice from 'components/atom/cardHeaderPrice'
import NumberIncrement from 'components/atom/numberIncrement'
import Separator from 'components/atom/separator'

export default function CustomItemContainer({ renderHeader, renderRightItem }) {

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
          <View style={{ flex: 5, alignItems: 'flex-start', justifyContent: 'center' }}>
            {renderHeader()}
          </View>
          <View style={{ flex: 5, alignItems: 'flex-end', justifyContent: 'center' }}>
            {renderRightItem()}
          </View>
        </View>
        <Separator style={{ ...Margin.mt_20 }} />
      </View>
    </View>
  )
}
CustomItemContainer.defaultProps = {
  renderHeader: () => {
    return <CardHeaderPrice title={'Baby Seat Car'} value={50000} unit={'Seat'} />
  },
  renderRightItem: () => {
    return <NumberIncrement />
  },
}

CustomItemContainer.propTypes = {
  renderHeader: PropTypes.func,
  renderRightItem: PropTypes.func,
  notesTitleLabel: PropTypes.string,
  notes: PropTypes.string,
  onChecklistPress: PropTypes.func,
}
