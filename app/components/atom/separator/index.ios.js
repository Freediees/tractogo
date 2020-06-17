import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Background, Border, Padding, Alignment, Fonts, Colors, Margin } from 'theme'

export default function Separator({ children, style }) {
  return (
    <View
      style={[
        {
          height: 1,
          backgroundColor: Colors.light_grey,
          ...style,
        },
      ]}
    />
  )
}

Separator.defaultProps = {
  children: null,
  style: {},
}

Separator.propTypes = {
  children: PropTypes.node,
  style: PropTypes.shape({}),
}
