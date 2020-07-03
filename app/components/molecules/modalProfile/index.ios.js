import React from 'react'
import { View, Modal, Text } from 'react-native'
import PropTypes, { bool } from 'prop-types'
import DefaultHeader from 'components/molecules/defaultHeader'
import { Column, Padding, Fonts, Colors, Margin } from 'theme'
import backIcon from 'icons/ic-back.svg'

const ModalProfile = ({ visible, children, toggleModal }) => {
  return (
    <Modal visible={visible} animationType={'slide'}>
      <View style={{ flex: 1 }}>
        <DefaultHeader
          border={true}
          title={'Setting'}
          iconLeft={backIcon}
          onIconLeftPress={toggleModal}
        />
        <View style={{ flex: 9, backgroundColor: Colors.light_grey }}>{children}</View>
      </View>
    </Modal>
  )
}

ModalProfile.defaultProps = {
  visible: false,
  children: null,
  toggleModal: () => {},
}

ModalProfile.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node,
  toggleModal: PropTypes.func,
}
export default ModalProfile
