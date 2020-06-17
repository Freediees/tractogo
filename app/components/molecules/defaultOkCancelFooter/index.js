import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import OkCancelButton from 'components/molecules/okCancelButton'
import { Padding, Row, Margin } from 'theme'

export default function DefaultOkCancelFooter({
  children,
  isOrange,
  style,
  okLabel,
  cancelLabel,
  onOkPress,
  onCancelPress,
}) {
  return (
    <View
      style={{
        ...style,
        ...Padding.pb_20,
        flex: 1,
        bottom: 0,
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      {children && (
        <View style={{ flex: 1, ...Padding.pv_16, justifyContent: 'center' }}>{children}</View>
      )}
      <View style={{ flex: 1, width: '100%' }}>
        <OkCancelButton
          isOrange={isOrange}
          style={{ padding: 0 }}
          okLabel={okLabel}
          cancelLabel={cancelLabel}
          onOkPress={onOkPress}
          onCancelPress={onCancelPress}
        />
      </View>
    </View>
  )
}

DefaultOkCancelFooter.defaultProps = {
  children: null,
  okLabel: 'Simpan',
  cancelLabel: 'Batal',
  onOkPress: () => {},
  onCancelPress: () => {},
  style: {},
  isOrange: true,
}

DefaultOkCancelFooter.propTypes = {
  children: PropTypes.node,
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onOkPress: PropTypes.func,
  onCancelPress: PropTypes.func,
  style: PropTypes.shape({}),
  isOrange: PropTypes.bool,
}
