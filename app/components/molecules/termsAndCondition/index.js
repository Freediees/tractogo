import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { Fonts, Flex, Margin } from 'theme'

import TextButton from 'components/atom/textButton'

export default function TermsAndCondition({
  notesLabel,
  termsLabel,
  onPress,
  style,
}) {
  return (
    <View
      style={{
        ...Flex.flex_row,
        alignItems: 'center',
        ...style,
      }}
    >
      <Text style={{ ...Fonts.f_10, ...Margin.mr_4 }}>{notesLabel}</Text>
      <TextButton text={termsLabel} onPress={onPress} />
    </View>
  )
}

TermsAndCondition.defaultProps = {
  notesLabel: 'I accept and agree with',
  termsLabel: 'Terms & Condition',
}

TermsAndCondition.propTypes = {
  notesLabel: PropTypes.string,
  termsLabel: PropTypes.string,
  onPress: PropTypes.func,
}
