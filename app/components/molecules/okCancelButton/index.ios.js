import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import PrimaryButton from 'components/atom/primaryButton'
import SecondaryButton from 'components/atom/secondaryButton'
import { Padding, Margin } from 'theme'

export default function OkCancelButton({
  children,
  isOrange,
  okLabel,
  cancelLabel,
  onOkPress,
  onCancelPress,
}) {
  return (
    <View
      style={{
        ...Padding.pv_8,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
      }}
    >
      <SecondaryButton
        isOrange={isOrange}
        style={{ flex: 1, justifyContent: 'center', ...Margin.mr_20 }}
        text={cancelLabel}
        onPress={onCancelPress}
      />
      <PrimaryButton
        style={{ flex: 1, justifyContent: 'center' }}
        text={okLabel}
        onPress={onOkPress}
      />
    </View>
  )
}

OkCancelButton.defaultProps = {
  children: null,
  cancelLabel: 'Batal',
  okLabel: 'Simpan',
  onOkPress: () => {},
  onCancelPress: () => {},
  isOrange: false,
}

OkCancelButton.propTypes = {
  children: PropTypes.node,
  cancelLabel: PropTypes.string,
  okLabel: PropTypes.string,
  onOkPress: PropTypes.func,
  onCancelPress: PropTypes.func,
  isOrange: false,
}
