import React from 'react'
import OTPInputView from '@twotalltotems/react-native-otp-input'

import { Border } from 'theme'

import PropTypes from 'prop-types'

export default function OTPInput({ onCodeFilled }) {
  return (
    <OTPInputView
      style={{ width: '80%', height: 200 }}
      pinCount={4}
      autoFocusOnLoad
      codeInputFieldStyle={{
        width: 45,
        height: 45,
        borderWidth: 1,
        color: '#000000',
        ...Border.border_smoky_grey,
      }}
      codeInputHighlightStyle={{ ...Border.border_amber }}
      onCodeFilled={onCodeFilled}
    />
  )
}

OTPInput.defaultProps = {
  onCodeFilled: () => {},
}

OTPInput.propTypes = {
  onCodeFilled: PropTypes.func,
}
