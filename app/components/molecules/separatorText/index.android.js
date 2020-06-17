import React from 'react'
import PropTypes from 'prop-types'
import { TouchableNativeFeedback, Text, View } from 'react-native'
import Separator from 'components/atom/separator'
import { Background, Border, Padding, Alignment, Fonts, Column } from 'theme'

export default function SeparatorText({ onPress, text, children, style }) {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Separator
        style={{
          ...Column.col_4,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      />
      <Text
        style={{
          ...Column.col_4,
          ...Fonts.f_12,
          ...Fonts.text_smoky_grey,
          alignSelf: 'center',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {text}
      </Text>
      <Separator
        style={{
          ...Column.col_4,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      />
    </View>
  )
}

SeparatorText.defaultProps = {
  children: null,
  onPress: () => {},
  text: '',
  style: {},
}

SeparatorText.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.shape({}),
}
