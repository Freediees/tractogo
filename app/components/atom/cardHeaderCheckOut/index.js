import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { Fonts, Margin, Flex } from 'theme'

export default function CardHeaderCheckOut({ carRentalLabel, rentalDriverLabel, placeLabel, dateLabel }) {
  return (
    <View
      style={{
        ...Flex.flex_row,
      }}
    >
      <Text style={{...Fonts.f_12, ...Fonts.semibold}}>
        {carRentalLabel} - {rentalDriverLabel}
      </Text>
    </View>
  )
}

CardHeaderCheckOut.defaultProps = {
  carRentalLabel: 'Car Rental', 
  rentalDriverLabel: 'Self Drive', 
  placeLabel: 'Bandung', 
  dateLabel: '26 - 27 April 2020'
}

CardHeaderCheckOut.propTypes = {
  carRentalLabel: PropTypes.string, 
  rentalDriverLabel: PropTypes.string, 
  placeLabel: PropTypes.string, 
  dateLabel: PropTypes.string
}
