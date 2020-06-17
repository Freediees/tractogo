import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import Svg, { Ellipse, SvgXml } from 'react-native-svg'
import icedit from 'icons/ic-edit.svg'
import DefaultHeader from 'components/molecules/defaultHeader'
import TextWithPicker from 'components/atom/textWithPicker'
import DefaultFooter from 'components/molecules/defaultFooter'
import ListViewCardLocation from 'components/molecules/listViewCardLocation'
import DatePicker from 'react-native-date-picker'
import CustomBottomSheet from 'components/molecules/customBottomSheet'
import OkCancelButton from 'components/molecules/okCancelButton'
import Spinner from 'react-native-loading-spinner-overlay'

import { Column, Margin, Fonts, Colors, Padding, Row, Alignment, ImageSize, Flex } from 'theme'

import backIcon from 'icons/ic-back.svg'
import editIcon from 'icons/ic-edit.svg'

export default function ProfileEditorScreen({
  navigation,
  title,
  onPress,
  labelSubmit,
  onBack,
  onEditPhone,
  birthDateLabel,
  valueBirthDate,
  emailLabel,
  emailContent,
  phoneContent,
  modalBirthDate,
  onSubmit,
  firstName,
  lastName,
  isLoading,
  gender,
}) {
  var month = new Array()
  month[0] = 'Januari'
  month[1] = 'Februari'
  month[2] = 'Maret'
  month[3] = 'April'
  month[4] = 'Mei'
  month[5] = 'Juni'
  month[6] = 'Juli'
  month[7] = 'Agustus'
  month[8] = 'September'
  month[9] = 'Oktober'
  month[10] = 'November'
  month[11] = 'Desember'


  const onSaveDate = (value) => {
    var date = value.getDate()
    var monthName = month[value.getMonth()]
    var year = value.getFullYear()
    var months = value.getMonth()

    //var day = date + ' ' + monthName + ' ' + year
    var day = year + '-' + months + '-' + date

    // alert(day)
    setBirthdateContent(day)
    modalBirthDate.close()
  }

  const onSimpan = () => {

    var obj = {
      name,
      nameTitle,
      birthDateContent
    }

    onSubmit(obj)
    //console.log("call API update name, nameTitle, birthdate")
  }

  const onNameChange = (val) =>{
    setName(val)
  }

  const onSelectTitle = (val) => {
    setNameTitle(val)
  }

  const [date, setDate] = useState(new Date())
  const [tempDate, setTempDate] = useState(new Date())
  const [birthDateContent, setBirthdateContent] = useState('')
  const [name, setName] = useState('')
  const [nameTitle, setNameTitle] = useState('')

  useEffect(() => {
    async function initialize() {
      setBirthdateContent(valueBirthDate)
      setName(`${firstName} ${lastName}`)
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
      <Spinner visible={isLoading} textContent={'Loading...'} />
      <DefaultHeader border={true} title={title} iconLeft={backIcon} onIconLeftPress={onBack} />
      <View
        style={{
          ...Flex.flex_2,
          width: '100%',
          ...Alignment.align_center,
          ...Padding.pt_20,
          backgroundColor: Colors.white,
        }}
      >
        <Image
          source={require('images/TOM.png')}
          style={{
            ...ImageSize.img_xs,
            ...Margin.mh_16,
            backgroundColor: Colors.white,
            borderRadius: ImageSize.img_xs.width,
          }}
        />
      </View>

      <View style={{ ...Flex.flex_10, width: '100%' }}>
        <View
          style={{
            ...Flex.flex_2,
            width: '100%',
            ...Alignment.align_start,
            ...Padding.ph_16,
            ...Padding.pb_8,
            backgroundColor: Colors.white,
          }}
        >
          <TextWithPicker
            onNameChange={onNameChange}
            onSelectTitle={onSelectTitle}
            value={name}
            title={gender}
          />

          <View style={{ width: '100%', ...Padding.pb_8, ...Margin.mt_20 }}>
            <Text style={{ ...Fonts.f_12 }}>{birthDateLabel}</Text>
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
              {birthDateContent}
            </Text>
            <TouchableOpacity
              style={{ position: 'absolute', right: 10, top: 0, zIndex: 888 }}
              onPress={() => modalBirthDate.open()}
            >
              <SvgXml xml={icedit} width={20} height={20} fill="#f39c12" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            ...Flex.flex_2,
            width: '100%',
            ...Alignment.align_start,
            ...Padding.ph_16,
            ...Margin.mt_16,
            backgroundColor: Colors.white,
          }}
        >
          <View style={{ width: '100%', ...Margin.mt_20 }}>
            <Text style={{ ...Fonts.f_12 }}>{emailLabel}</Text>
            <Text
              style={{
                width: '100%',
                borderBottomColor: Colors.white_grey,
                borderBottomWidth: 1,
                ...Margin.mt_8,
                ...Fonts.text_grey,
                ...Padding.ph_8,
              }}
            >
              {emailContent}
            </Text>
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
              {phoneContent}
            </Text>
            <TouchableOpacity
              style={{ position: 'absolute', right: 10, top: 0, zIndex: 888 }}
              onPress={onEditPhone.bind(this)}
            >
              <SvgXml xml={icedit} width={20} height={20} fill="#f39c12" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 5, width: '100%', ...Alignment.align_start, ...Padding.ph_16 }}>
          {/* <TextWithPicker /> */}
        </View>
      </View>

      <CustomBottomSheet title={birthDateLabel} botSheetRef={(ref) => (modalBirthDate = ref)}>
        <View style={{ justifyContent: 'center', ...Padding.ph_20 }}>
          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <DatePicker date={tempDate} mode={'date'} onDateChange={setTempDate} locale={'id-ID'} />
          </View>
        </View>
        <View style={{ ...Padding.pv_16, ...Padding.ph_16, flexDirection: 'row' }}>
          <OkCancelButton
            onOkPress={() => {
              onSaveDate(tempDate)
            }}
            onCancelPress={() => {
              modalBirthDate.close()
            }}
          />
        </View>
      </CustomBottomSheet>

      <DefaultFooter buttonText={labelSubmit} onButtonPress={onSimpan.bind(this)} />
    </View>
  )
}

ProfileEditorScreen.defaultProps = {
  gender: 0,
  title: 'Pengaturan Akun',
  thumbnails: require('images/TOM.png'),
  labelName: 'Nama',
  firtsName: 'firtsName',
  onPress: () => {},
  placeholderName: 'cth : Name',
  lastName: '',
  onchangeName: () => {},
  phoneNumber: '+628581763645',
  email: 'Frdaus@gmail.com',
  labelSubmit: 'Simpan',
  onBack: () => {},
  onEditPhone: () => {},
  birthDateLabel: 'Birth Date',
  // birthDateContent: "17 Agustus 1990",
  emailLabel: 'Email dan Telepon',
  emailContent: 'email@gmail.com',
  phoneContent: '+62',
  onSubmit: ()=>{}
}

ProfileEditorScreen.propTypes = {
  gender: PropTypes.number,
  title: PropTypes.string,
  thumbnails: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  labelName: PropTypes.string,
  firtsName: PropTypes.string,
  onPress: PropTypes.func,
  placeholderName: PropTypes.string,
  lastName: PropTypes.string,
  onchangeName: PropTypes.func,
  phoneNumber: PropTypes.string,
  email: PropTypes.string,
  labelSubmit: PropTypes.func,
  onBack: PropTypes.func,
  onEditPhone: PropTypes.func,
  birthDateLabel: PropTypes.string,
  // birthDateContent: PropTypes.string,
  emailLabel: PropTypes.string,
  emailContent: PropTypes.string,
  phoneContent: PropTypes.string,
  onSubmit: PropTypes.func
}
