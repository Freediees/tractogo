import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Image, TouchableOpacity, Text, TextInput } from 'react-native'
import Svg, { Ellipse, SvgXml } from 'react-native-svg'
import icedit from 'icons/ic-edit.svg'
import DefaultHeader from 'components/molecules/defaultHeader'
import TextWithPicker from 'components/atom/textWithPicker'
import DefaultFooter from 'components/molecules/defaultFooter'

import { Column, Margin, Fonts, Colors, Padding, Row, Alignment, ImageSize, Flex } from 'theme'


export default function ProfileEditPhoneScreen({

}) {

  useEffect(() => {
    async function initialize() {
    }
    initialize()
  }, [])

  return (
    <View
      style={{
        ...Flex.flex_1,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: Colors.blue,
      }}
    >
        <Text>Hello</Text>
    </View>
  )
}

ProfileEditPhoneScreen.defaultProps = {
}

ProfileEditPhoneScreen.propTypes = {
}
