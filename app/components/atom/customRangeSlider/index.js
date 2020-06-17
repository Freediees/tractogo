import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Fonts, Colors } from 'theme'
import { LabelNumberFormat } from 'function/numberFormat'

import RangeSlider from 'rn-range-slider'

export default function CustomRangeSlider({
  minRange,
  maxRange,
  selectedMin,
  selectedMax,
  changeSelectedMin,
  changeSelectedMax,
}) {
  return (
    <View style={{ width: '100%', flexDirection: 'column' }}>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <LabelNumberFormat number={selectedMin} style={{ ...Fonts.f_16 }} />
        <LabelNumberFormat number={selectedMax} style={{ ...Fonts.f_16 }} />
      </View>
      <View style={{ width: '100%' }}>
        <RangeSlider
          style={{ width: '100%', height: 60 }}
          gravity={'center'}
          min={minRange}
          max={maxRange}
          initialLowValue={selectedMin}
          initialHighValue={selectedMax}
          step={10000}
          thumbColor={Colors.light_grey}
          thumbBorderColor={Colors.light_grey}
          labelStyle={'none'}
          valueType={'number'}
          selectionColor={Colors.blue}
          blankColor={Colors.grey}
          onValueChanged={(low, high, fromUser) => {
            changeSelectedMin(low)
            changeSelectedMax(high)
          }}
        />
      </View>
    </View>
  )
}

CustomRangeSlider.defaultProps = {
  minRange: 0,
  maxRange: 10000000,
  selectedMin: 1000000,
  selectedMax: 4000000,
  changeSelectedMin: () => {},
  changeSelectedMax: () => {},
}

CustomRangeSlider.propTypes = {
  minRange: PropTypes.number,
  maxRange: PropTypes.number,
  selectedMin: PropTypes.number,
  selectedMax: PropTypes.number,
  changeSelectedMin: PropTypes.func,
  changeSelectedMax: PropTypes.func,
}
