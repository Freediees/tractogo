import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { Fonts, Margin, Flex } from 'theme'
import { LabelNumberFormat } from 'function/numberFormat'

export default function CardHeaderPrice({ title, value, unit, isPositif }) {
  return (
    <View
      style={{
        ...Flex.flex_column,
      }}
    >
      <Text style={{ ...Fonts.f_12 }}>{title}</Text>
        <View style={{ ...Margin.mt_4 }}>
          <Text>
            <Text style={{ ...Fonts.f_10, ...Fonts.text_green }}>{isPositif ? '+ ' : '- '}</Text>
            <LabelNumberFormat number={value} style={{ ...Fonts.f_10, ...Fonts.text_green }} />
            <Text style={{ ...Fonts.text_smoky_grey, ...Fonts.f_10 }}>{`/ ${unit}`}</Text>
          </Text>
        </View>
      
    </View>
  )
}

CardHeaderPrice.defaultProps = {
  title: 'Penggunaan Luar Kota',
  value: 200000,
  unit: 'Hari',
  isPositif: true,
}

CardHeaderPrice.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
  unit: PropTypes.string,
  isPositif: PropTypes.bool,
}
