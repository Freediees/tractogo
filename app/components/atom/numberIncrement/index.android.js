import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Fonts, Background, Padding, Margin, Border } from 'theme'
import IconButton from 'components/atom/iconButton'

import iconPlus from 'icons/ic-plus.svg'
import iconPlusInactive from 'icons/ic-plus-inactive.svg'
import iconMinus from 'icons/ic-minus.svg'
import iconMinusInactive from 'icons/ic-minus-inactive.svg'

export default function NumberIncrement({ number, changeNumber, max, callback }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <IconButton
        svg={number === 0 ? iconMinusInactive : iconMinus}
        height={20}
        width={20}
        onPress={() => {
          if (number > 0) {
            const newVal = number - 1
            changeNumber(newVal)
            callback()
          }
        }}
      />
      <View style={{ width: 20, ...Margin.mh_4, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ ...Fonts.f_10, ...Fonts.text_orange }}>{number}</Text>
      </View>
      <IconButton
        style={{ ...Margin.mh_4 }}
        svg={number === max ? iconPlusInactive : iconPlus}
        height={20}
        width={20}
        disabled={number === max}
        onPress={() => {
          const newVal = number + 1
          changeNumber(newVal)
          callback()
        }}
      />
    </View>
  )
}

NumberIncrement.defaultProps = {
  number: 0,
  changeNumber: () => {},
  callback: () => {},
  max: 1,
}

NumberIncrement.propTypes = {
  number: PropTypes.number,
  changeNumber: PropTypes.func,
  callback: PropTypes.func,
  max: PropTypes.number,
}
