import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { Fonts, Margin, Flex } from 'theme'

export default function CardHeaderCart({ carRentalLabel, rentalDriverLabel, placeLabel, dateLabel }) {
  return (
    <View
      style={{
        ...Flex.flex_column,
      }}
    >
      <Text style={{...Fonts.f_12, ...Fonts.semibold}}>
        {carRentalLabel} - {rentalDriverLabel}
      </Text>
      <Text style={{...Fonts.f_10}}>
        {placeLabel} | {dateLabel}
      </Text>
    </View>
  )
}

CardHeaderCart.defaultProps = {
  carRentalLabel: 'Sewa Mobil', 
  rentalDriverLabel: 'Tanpa Sopir', 
  placeLabel: 'Bandung', 
  dateLabel: '26 - 27 April 2020'
}

CardHeaderCart.propTypes = {
  carRentalLabel: PropTypes.string, 
  rentalDriverLabel: PropTypes.string, 
  placeLabel: PropTypes.string, 
  dateLabel: PropTypes.string
}
