import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Image, TouchableOpacity, Text, TextInput } from 'react-native'
import Svg, { Ellipse, SvgXml } from 'react-native-svg'
import icedit from 'icons/ic-edit.svg'
import DefaultHeader from 'components/molecules/defaultHeader'
import TextWithPicker from 'components/atom/textWithPicker'
import DefaultFooter from 'components/molecules/defaultFooter'
import CustomAlert from 'components/molecules/customAlert'

import { Column, Margin, Fonts, Colors, Padding, Row, Alignment, ImageSize, Flex } from 'theme'

export default function ProfileEditPhoneScreen({}) {
  useEffect(() => {
    async function initialize() {}
    initialize()
  }, [])

  const [modalState, setModalState] = useState(false)

  const toggleModal = () => {
    setModalState(!modalState)
  }

  return (
    <View
      style={{
        ...Flex.flex_1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        style={{
          width: 100,
          height: 40,
          backgroundColor: 'orange',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={toggleModal.bind(this)}
      >
        <Text style={{ textAlign: 'center', color: 'white' }}>Try Me</Text>
      </TouchableOpacity>

      <CustomAlert
        visible={modalState}
        onPress={toggleModal}
        title={'pemberitahuan'}
        information={'Ini Adalah informasi yang dilemparkan oleh container'}
        buttonLabel={'Tutup'}
      />
    </View>
  )
}

ProfileEditPhoneScreen.defaultProps = {}

ProfileEditPhoneScreen.propTypes = {}
