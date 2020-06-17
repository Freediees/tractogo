import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { TextField } from 'react-native-material-textfield'
import { Fonts, Colors } from 'theme'

export default function TextInputFloat({ style, onSubmit, onChange, placeholder, value, error, disabled }) {
  return (
    <View style={{ ...style, width: '100%' }}>
      <TextField
        label={placeholder}
        baseColor={Colors.grey}
        disabled={disabled}
        error={error}
        errorColor={Colors.red}
        tintColor={Colors.amber}
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        style={{ ...Fonts.f_10, ...Fonts.text_black }}
      />
    </View>
  )
}

TextInputFloat.defaultProps = {
  onChange: () => {},
  style: {},
  placeholder: '',
  value: '',
  error: null,
  disabled: false,
  onSubmit: () => {},
}

TextInputFloat.propTypes = {
  style: PropTypes.shape({}),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
}
