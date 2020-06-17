import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Image, TouchableOpacity, Text, TextInput, Modal } from 'react-native'
import Svg, { Ellipse, SvgXml } from 'react-native-svg'
import icedit from 'icons/ic-edit.svg'
import DefaultHeader from 'components/molecules/defaultHeader'
import TextWithPicker from 'components/atom/textWithPicker'
import DefaultFooter from 'components/molecules/defaultFooter'
import OTPScreen from 'components/organism/otpVerificationScreen'

import { Column, Margin, Fonts, Colors, Padding, Row, Alignment, ImageSize, Flex } from 'theme'

import backIcon from 'icons/ic-back.svg'
import editIcon from 'icons/ic-edit.svg'

export default function ProfileEditPhoneScreen({
  title,
  thumbnails,
  labelName,
  firtsName,
  onPress,
  placeholderName,
  valueName,
  onchangeName,
  phoneNumber,
  email,
  emailLabel,
  informationContent,
  labelSubmit,
  onBack,
  phoneLabel,
  onSave,
  verification,
  onToggleModal,
}) {

  const unlockInput = () => {
    setLockEdit(true)
    setTimeout(function(){
      inputNumber.focus()
    }, 100);
    
  }

  const onSimpan = () => {
    onSave('1234', phoneNumber, phone)
  }

  const lockInput = () => {
    setLockEdit(false)
  }
  

  const [lockEdit, setLockEdit] = useState(false)
  const [phone, setPhone] = useState('')

  useEffect(() => {
    async function initialize() {
      setPhone(phoneNumber)
    }
    initialize()
  }, [])

  return (
    <View
      style={{
        ...Flex.flex_1,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: Colors.white_grey,
      }}
    >
      <DefaultHeader border={true} title={title} iconLeft={backIcon} onIconLeftPress={onBack} />
      <View
        style={{
          ...Flex.flex_10,
          width: '100%',
          ...Alignment.align_center,
          ...Padding.pt_20,
          ...Padding.ph_16,
          backgroundColor: Colors.white,
        }}
      >
        <View style={{ width: '100%', ...Margin.mh_20, backgroundColor: Colors.white }}>
          <Text style={{ ...Fonts.f_12 }}>{phoneLabel}</Text>
                <TextInput
                    ref={(input) => {inputNumber = input} }
                    keyboardType={'phone-pad'}
                    value={phone}
                    //color={lockEdit ? Colors.black : Colors.grey }
                    //placeholderTextColor={Colors.grey}
                    returnKeyType="done"
                    autoCorrect={false}
                    editable={lockEdit}
                    secureTextEntry={false}
                    onEndEditing={()=> lockInput() }
                    onChangeText={(val) => {
                      setPhone(val)
                    }
                    }
                  />
          <TouchableOpacity style={{ position: 'absolute', right: 10, top: 0, zIndex: 888 }} onPress={()=> unlockInput()}>
            <SvgXml xml={icedit} width={20} height={20} fill="#f39c12" />
          </TouchableOpacity>
        </View>

        <View style={{ width: '100%', ...Margin.mt_20, backgroundColor: Colors.white }}>
          <Text style={{ ...Fonts.f_12 }}>{emailLabel}</Text>

          <Text
            style={{
              width: '100%',
              borderBottomColor: Colors.smoky_grey,
              borderBottomWidth: 1,
              ...Margin.mt_8,
              ...Fonts.text_grey,
              ...Padding.ph_8,
            }}
          >
            {email}
          </Text>
          <Text
            style={{
              width: '100%',
              borderBottomColor: Colors.smoky_grey,
              borderBottomWidth: 1,
              ...Margin.mt_8,
              ...Fonts.text_grey,
              ...Padding.ph_8,
              ...Fonts.f_10,
            }}
          >
            {informationContent}
          </Text>
        </View>
      </View>

      <DefaultFooter buttonText={labelSubmit} onButtonPress={()=>onToggleModal()} />

      <Modal
        animationType={'slide'}
        visible={verification}>
          <OTPScreen 
            onIconLeftPress={onToggleModal}
            onButtonPress={onSimpan}
          />
      </Modal>
    </View>
  )
}

ProfileEditPhoneScreen.defaultProps = {
  verification: false,
  onToggleModal: ()=>{},
  onSave: ()=>{},
  title: 'Pengaturan Akun',
  thumbnails: require('images/TOM.png'),
  labelName: 'Nama',
  firtsName: 'firtsName',
  onPress: () => {},
  placeholderName: 'cth : Name',
  valueName: '',
  onchangeName: () => {},
  phoneNumber: '-',
  email: '-',
  labelSubmit: 'Simpan',
  onBack: () => {},
  phoneLabel: "Phone",
  emailLabel: "Email",
  informationContent: "Semua informasi transaksi dan keamanan akunmu akan dikirim ke email ini"
}

ProfileEditPhoneScreen.propTypes = {
  onToggleModal: PropTypes.func,
  verification: PropTypes.bool,
  onSave: PropTypes.func,
  title: PropTypes.string,
  thumbnails: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  labelName: PropTypes.string,
  firtsName: PropTypes.string,
  onPress: PropTypes.func,
  placeholderName: PropTypes.string,
  valueName: PropTypes.string,
  onchangeName: PropTypes.func,
  phoneNumber: PropTypes.string,
  email: PropTypes.string,
  labelSubmit: PropTypes.func,
  onBack: PropTypes.func,
  phoneLabel: PropTypes.string,
  emailLabel: PropTypes.string,
  informationContent: PropTypes.string,
}
