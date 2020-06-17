import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text } from 'react-native'
import { Background, Alignment, Fonts, Colors } from 'theme'

export default function TextButton({ onPress, text, children, style }) {
  return (
    <TouchableHighlight
      underlayColor={Colors.transparent}
      style={{ ...Background.bg_transparent, ...Alignment.align_center, ...style }}
      onPress={onPress}
    >
      <Text style={{ ...Fonts.f_12, ...Fonts.text_amber }}>{text}</Text>
    </TouchableHighlight>
  )
}

TextButton.defaultProps = {
  children: null,
  onPress: () => {},
  text: '',
  style: {},
}

TextButton.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.shape({}),
}
