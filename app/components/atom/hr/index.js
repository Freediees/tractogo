import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Margin, Fonts, Background, Colors } from 'theme'
import { responsiveWidth as wp } from 'react-native-responsive-dimensions'

export default function Hr(style) {
  return (
    <View
      style={{
        ...Margin.ml_12,
        ...Margin.mr_12,
        height: 1,
        backgroundColor: '#ecf0f1',
        width: wp(100),
        style,
      }}
    />
  )
}

Hr.defaultProps = {
  style: {},
}

Hr.propTypes = {
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.shape({})]),
}
