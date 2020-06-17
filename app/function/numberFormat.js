import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

import NumberFormat from 'react-number-format'

const LabelNumberFormat = ({ number, style }) => (
  <NumberFormat
    value={number}
    displayType={'text'}
    thousandSeparator={'.'}
    decimalSeparator={','}
    prefix={'Rp '}
    renderText={(value) => <Text style={style}>{value}</Text>}
  />
)

LabelNumberFormat.defaultProps = {
  number: 0,
  style: {},
}

LabelNumberFormat.propTypes = {
  number: PropTypes.number,
  style: PropTypes.shape({}),
}

export { LabelNumberFormat }
