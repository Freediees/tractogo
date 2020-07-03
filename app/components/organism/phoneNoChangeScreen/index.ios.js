/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize,
} from 'react-native-responsive-dimensions'
import LinearGradient from 'react-native-linear-gradient'
import Svg, { Ellipse, SvgXml } from 'react-native-svg'
import PhoneFieldInput from 'components/atom/phoneFieldInput'
import PrimaryButton from 'components/atom/primaryButton'
import Header from 'components/atom/header'
import Left from 'components/atom/left'
import Container from 'components/atom/container'
import Content from 'components/atom/content'
import LeftView from 'components/molecules/leftView'
import {
  Background,
  Border,
  Padding,
  Alignment,
  Fonts,
  Column,
  ImageSize,
  Margin,
  Colors,
} from 'theme'
import CustomBottomSheet from 'components/molecules/customBottomSheet'
import ListItem from 'components/molecules/listItem'
import CustomInputPicker from 'components/molecules/customInputPicker'
import icedit from 'icons/ic-edit.svg'
import { getPhoneNumber } from 'react-native-device-info'

export default function ProfileEditorScreen({
  title,
  thumbnails,
  labelName,
  onPressTitle,
  onPress,
  onChangeDate,
  placeholderName,
  valueName,
  onchangeName,
  phoneNumber,
  onChangePhoneNumber,
  email,
  onSubmit,
  labelSubmit,
  onBack,
}) {
  const [birthDate, setBirthDate] = useState('1990-01-12')
  const [firtsName, setfirtsName] = useState('Mr.')
  function changeDate(a) {
    setBirthDate(a)
    bsDate.close()
    // changeSelectedDate(date)
  }

  const onSave = () => {
    onSubmit()
    bsPhone.close()
  }
  return (
    <Container>
      <Header>
        <Left isArrow onBack={onBack}>
          <Text style={{ ...Fonts.f_16, width: '100%', paddingLeft: '5%' }}>{title}</Text>
        </Left>
      </Header>
      <Content>
        <View style={{ backgroundColor: '#FFF', width: wp(100), padding: '5%', marginTop: '3%' }}>
          <Text style={{ ...Fonts.f_10, color: '#a0a4a8', padding: 5 }}>Nomor Ponsel</Text>
          <Text style={{ ...Fonts.f_12, color: '#000', padding: 5 }}>{phoneNumber}</Text>
          <TouchableOpacity
            onPress={() => bsPhone.open()}
            style={{ position: 'absolute', right: 15, top: 15, zIndex: 888 }}
          >
            <SvgXml xml={icedit} width={20} height={20} fill="#f39c12" />
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: '#FFF', width: wp(100), padding: '5%', marginTop: '3%' }}>
          <Text style={{ ...Fonts.f_10, color: '#a0a4a8', padding: 5 }}>Email</Text>
          <Text style={{ ...Fonts.f_12, color: '#000', padding: 5 }}>{email}</Text>
          <Text style={{ ...Fonts.f_10, color: '#a0a4a8', padding: 5 }}>
            Semua Informasi transaksi & keamanan akunmu akan dikirim ke email ini
          </Text>
        </View>

        <CustomBottomSheet
          // title={placeHolderStartDate}
          title="Ubah No Handphone"
          botSheetRef={(ref) => (bsPhone = ref)}
          // topRightComponent={() => renderRightText(1)}
          onClose={() => bsPhone.close()}
          rBSheetHeight={100}
        >
          <View
            style={{
              width: '100%',
              marginTop: 20,
              paddingTop: 10,
              marginBottom: 5,
              borderTopWidth: 1,
              borderTopColor: Colors.light_grey,
            }}
          >
            <Text style={{ ...Fonts.f_10, width: '100%', color: '#a0a4a8' }}>No. Handphone</Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                padding: '5%',
                paddingLeft: 0,
                width: '100%',
                alignItems: 'center',
                alignSelf: 'center',
              }}
            >
              <PhoneFieldInput
                phoneNumber={phoneNumber}
                onChangeText={onChangePhoneNumber}
                placeholder={'cth: 000000000'}
              />
            </View>
          </View>
          <View style={{ width: '100%', marginTop: 40 }}>
            <PrimaryButton
              onPress={onSave}
              style={{ backgroundColor: Colors.amber, height: 50 }}
              text={labelSubmit}
            />
          </View>
        </CustomBottomSheet>
      </Content>
    </Container>
  )
}

ProfileEditorScreen.defaultProps = {
  title: 'Pengaturan Akun',
  thumbnails: require('images/TOM.png'),
  labelName: 'Nama',
  onPressTitle: (a, b) => {
    console.log(a, b)
  },
  onPress: () => {},
  onChangeDate: (a) => {
    console.log(a)
  },
  placeholderName: 'cth : Name',
  valueName: '',
  onchangeName: () => {},
  phoneNumber: '+628581763645',
  onChangePhoneNumber: (a) => {
    console.log
  },
  email: 'Frdaus@gmail.com',
  onSubmit: () => {},
  labelSubmit: 'Simpan',
  onBack: () => {},
}

ProfileEditorScreen.propTypes = {
  title: PropTypes.string,
  thumbnails: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  labelName: PropTypes.string,
  onPressTitle: PropTypes.func,
  onPress: PropTypes.func,
  onChangeDate: PropTypes.func,
  placeholderName: PropTypes.string,
  valueName: PropTypes.string,
  onchangeName: PropTypes.func,
  phoneNumber: PropTypes.string,
  onChangePhoneNumber: PropTypes.func,
  email: PropTypes.string,
  onSubmit: PropTypes.func,
  labelSubmit: PropTypes.func,
  onBack: PropTypes.func,
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    width: wp(100),
    height: hp(45),
    paddingTop: 30,
  },
  shadow: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pickerDate: {
    width: '100%',
    borderBottomColor: '#bdc3c7',
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
  },
  pickerWrapper: {
    borderBottomColor: '#bdc3c7',
    borderBottomWidth: 1,
    // backgroundColor: "#273137",
    borderRadius: 4,
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerIcon: {
    color: '#e74c3c',
    position: 'absolute',
    bottom: 15,
    right: 10,
    fontSize: 20,
  },

  pickerContent: {
    color: '#a0a4a8',
    backgroundColor: 'transparent',
    width: '100%',
  },
  footer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: wp(100),
    height: 90,
    padding: '5%',
  },
})
