import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import PasswordInputText from 'react-native-hide-show-password-input'
import { Background, Border, Padding, Alignment, Fonts, Colors } from 'theme'

export default function PasswordInput({ onChange, placeholder, value, error, disabled }) {
  return (
    <View style={{ width: '100%' }}>
      <PasswordInputText
        iconColor={Colors.grey}
        label={placeholder}
        baseColor={Colors.grey}
        disabled={disabled}
        error={error}
        errorColor={Colors.red}
        tintColor={Colors.amber}
        value={value}
        onChangeText={onChange}
        style={{ ...Fonts.f_12, ...Fonts.text_black }}
      />
    </View>
  )
}

PasswordInput.defaultProps = {
  onChange: () => {},
  placeholder: 'Password',
  value: '',
  error: null,
  disabled: false,
}

PasswordInput.propTypes = {
  onPress: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
}
