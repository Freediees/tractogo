import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import PrimaryButton from 'components/atom/primaryButton'
import { Padding, Row, Margin, Background } from 'theme'

export default function DefaultFooter({ children, buttonIcon, buttonText, onButtonPress }) {
  return (
    <View
      style={{
        flex: 1,
        ...Padding.pv_8,
        justifyContent: 'center',
        ...Padding.ph_20,
        flexDirection: 'column',
        width: '100%',
        ...Background.bg_white,
      }}
    >
      {children && (
        <View
          style={{ ...Padding.ph_8, ...Padding.pv_16, ...Margin.mr_8, justifyContent: 'center' }}
        >
          {children}
        </View>
      )}
      {buttonText && (
        <PrimaryButton
          style={{ height: 48, ...Margin.mt_20, ...Padding.pv_12, ...Padding.ph_16 }}
          text={buttonText}
          svg={buttonIcon}
          onPress={onButtonPress}
        />
      )}
    </View>
  )
}

DefaultFooter.defaultProps = {
  children: null,
  buttonIcon: null,
  buttonText: '',
  onButtonPress: null,
}

DefaultFooter.propTypes = {
  children: PropTypes.node,
  buttonIcon: PropTypes.string,
  buttonText: PropTypes.string,
  onButtonPress: PropTypes.func,
}
