/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native'
import PhoneFieldInput from 'components/atom/phoneFieldInput'
import PrimaryButton from 'components/atom/primaryButton'
import SecondaryButton from 'components/atom/secondaryButton'
import TextButton from 'components/atom/textButton'
import SeparatorText from 'components/molecules/separatorText'
import Moment from 'moment'
import CenterView from 'components/molecules/centerView'
import { SvgXml } from 'react-native-svg'
import CustomBottomSheet from 'components/molecules/customBottomSheet'
import DefaultHeader from 'components/molecules/defaultHeader'
import CustomPickerButton from 'components/molecules/customPickerButton'
import caret from 'icons/ic-CTADown.svg'
import { Background, Margin, Fonts, Colors } from 'theme'
import backIcon from 'icons/ic-back.svg'

import DatePicker from 'react-native-date-picker'

export default function RegisterScreen({
  onRegister,
  placeholderName,
  labelName,
  valueName,
  onchangeName,
  labelEmail,
  valueEmail,
  placeholderEmail,
  onchangeEmail,
  labelBirthDate,
  valuePhoneNumber,
  onChangePhoneNumber,
  onPressTitle,
  onSignin,
  onIconLeftPress,
  screenTitle,
  labelSeparator,
  onGoogleLogin,
  topRightBottomSheetTitle,
  bsNameTitle,
  bsBirthDateTitle,
  labelRegister,
  labelHaveAnAccount,
  labelSignIn,
  getCountry,
  selectedDate,
  onDateChange,
  registerIsLoading,
  placeholderBirthDate,
}) {
  // const [birthDate, setBirthDate] = useState(new Date())
  const [firstName, setFirstName] = useState('Mr.')

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <DefaultHeader border={true} title={screenTitle} />
      <View style={{ flex: 9 }}>
      <ScrollView>
        
          <CenterView>
            <View style={{ width: '100%', marginTop: 10 }}>
              <Text style={{ ...Fonts.f_10, color: '#a0a4a8' }}>{labelName}</Text>
              <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'flex-end' }}>
                <View
                  style={{
                    ...Style.pickerWrapper,
                    marginRight: '10%',
                    paddingTop: 10,
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => bsNameTitle.open()}
                    style={{ flexDirection: 'row', height: 30 }}
                  >
                    <View style={{ width: '80%' }}>
                      <Text>{firstName}</Text>
                    </View>

                    <View style={{}}>
                      <SvgXml xml={caret} width={16} height={16} />
                    </View>
                  </TouchableOpacity>
                </View>

                <TextInput
                  placeholder={placeholderName}
                  placeholderTextColor={Colors.grey}
                  value={valueName}
                  editable
                  onChangeText={onchangeName}
                  style={{
                    height: 40,
                    width: '60%',
                    color: Colors.black,
                    borderBottomColor: '#bdc3c7',
                    borderBottomWidth: 1,
                  }}
                />
              </View>
            </View>

            <View style={{ width: '100%', marginTop: 30 }}>
              <Text style={{ ...Fonts.f_10, color: '#a0a4a8' }}>{labelBirthDate}</Text>
              <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => bsBirthDateTitle.open()}
                  style={{ ...Style.pickerWrapper, width: '100%', padding: '5%', paddingLeft: 0 }}
                >
                  {selectedDate ? (
                    <Text style={{ width: '100%' }}>
                      {Moment(selectedDate).format('DD MMMM YYYY')}
                    </Text>
                  ) : (
                    <Text style={{ width: '100%', ...Fonts.f_12, ...Fonts.text_grey }}>{placeholderBirthDate}</Text>
                  )}

                  <View
                    style={{
                      position: 'absolute',
                      right: 5,
                      top: 15,
                      width: 16,
                      height: 16,
                      zIndex: 1,
                    }}
                  >
                    <SvgXml xml={caret} width={16} height={16} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <PhoneFieldInput
              style={{ marginTop: 30 }}
              phoneNumber={valuePhoneNumber}
              onChangeText={onChangePhoneNumber}
              getCountry={getCountry}
            />

            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                marginTop: 30,
              }}
            >
              <Text style={{ ...Fonts.f_10, width: '100%', color: '#a0a4a8' }}>{labelEmail}</Text>
              <TextInput
                placeholder={placeholderEmail}
                placeholderTextColor={Colors.grey}
                value={valueEmail}
                onChangeText={onchangeEmail}
                style={{
                  height: 40,
                  width: '100%',
                  color: Colors.black,
                  borderBottomColor: '#bdc3c7',
                  borderBottomWidth: 1,
                }}
              />
            </View>

            {/* <View style={{ width: '100%', marginTop: 30}}> */}
            {/* <Text style={{ ...Fonts.f_10, width: '100%', color: '#a0a4a8'}}>No. Handphone</Text> */}

            {/* </View> */}

            <View style={{ ...Margin.mt_20, ...Margin.mb_20, width: '100%' }}>
              <PrimaryButton
                onPress={onRegister}
                disable={registerIsLoading}
                text={registerIsLoading ? 'Please Wait...' : labelRegister}
                style={{ ...Margin.mt_8, ...Margin.mb_8, height: 40, ...Background.bg_amber }}
              />
              <SeparatorText text={labelSeparator} style={{ ...Margin.mb_12, ...Margin.mt_12 }} />
              <SecondaryButton
                onPress={onGoogleLogin}
                text={'Google'}
                icon={require('icons/google_icon_lg.png')}
                style={{ ...Margin.mt_8, ...Margin.mb_8 }}
              />
            </View>

            <View style={{ ...Margin.mt_10, flexDirection: 'row' }}>
              <Text style={{ ...Fonts.f_12, ...Margin.mr_8 }}>{labelHaveAnAccount}</Text>
              <TextButton text={labelSignIn} onPress={onSignin} />
            </View>
          </CenterView>
        
      </ScrollView>
      </View>

      <CustomBottomSheet
        title={bsNameTitle}
        botSheetRef={(ref) => (bsNameTitle = ref)}
        // rightText={() => renderRightText(1)}
        bsHeight="25%"
        topRightComponent={() => (
          <TextButton
            style={{ ...Fonts.f_10 }}
            text={topRightBottomSheetTitle}
            onPress={() => bsNameTitle.close()}
          />
        )}
      >
        <CustomPickerButton
          initalItem={firstName}
          onPress={(i, item) => {
            setFirstName(item)
            onPressTitle(i, item)
            bsNameTitle.close()
          }}
          datasource={['Mr.', 'Mrs.']}
        />
      </CustomBottomSheet>

      <CustomBottomSheet
        // title={placeHolderStartDate}
        title={bsBirthDateTitle}
        botSheetRef={(ref) => (bsBirthDateTitle = ref)}
        bsHeight="40%"
        topRightComponent={() => (
          <TextButton
            style={{ ...Fonts.f_10 }}
            text={topRightBottomSheetTitle}
            onPress={() => bsBirthDateTitle.close()}
          />
        )}
      >
        <DatePicker
          date={selectedDate}
          onDateChange={onDateChange}
          mode={'date'}
          locale={'id-ID'}
        />
      </CustomBottomSheet>
    </View>
  )
}

RegisterScreen.defaultProps = {
  onRegister: () => {},
  onRegisterError: null,
  onRegisterSuccess: false,
  onGoogleLogin: () => {},
  onGoogleLoginError: null,
  onGoogleLoginSuccess: false,
  email: '',
  onEmailChange: null,
  emailError: null,
  password: null,
  onPasswordChange: null,
  passwordError: null,
  confirmPassword: null,
  onConfirmPasswordChange: null,
  confirmPasswordError: null,
  selectedValue: '',
  onValueChange: (a, b) => {
    console.log(a, b)
  },
  placeholderName: 'eg : John Doe',
  labelName: 'Name',
  valueName: 'John Doe',
  onchangeName: (a) => {
    console.log(a)
  },
  valueEmail: 'john.doe@trac.astra.co.id',
  onchangeEmail: (a) => {
    console.log('email ', a)
  },
  labelBirthDate: 'Birth Date',
  placeholderBirthDate: 'Select Date',
  onDateChange: (a) => {
    console.log('date ', a)
  },
  valuePhoneNumber: '',
  onChangePhoneNumber: (a) => {
    console.log('phone ', a)
  },
  onPressTitle: (a, b) => {
    console.log(a, b)
  },
  selectedDate: new Date(),
  onIconLeftPress: () => {},
  screenTitle: 'Register',
  labelSeparator: 'Or With',
  topRightBottomSheetTitle: 'Done',
  bsNameTitle: 'Choose Title',
  bsBirthDateTitle: 'Choose Birthdate',
  labelRegister: 'Register',
  labelHaveAnAccount: 'Have an account ?',
  labelSignIn: 'Sign In',
  labelEmail: 'Email',
  placeholderEmail: 'eg: name@email.com',
  getCountry: (a) => {
    console.log('phone ', a)
  },
  registerIsLoading: false,
}

RegisterScreen.propTypes = {
  onIconLeftPress: PropTypes.func,
  screenTitle: PropTypes.string,
  onRegister: PropTypes.func,
  onRegisterError: PropTypes.string,
  onRegisterSuccess: PropTypes.bool,
  onGoogleLogin: PropTypes.func,
  onGoogleLoginError: PropTypes.string,
  onGoogleLoginSuccess: PropTypes.bool,
  email: PropTypes.string,
  onEmailChange: PropTypes.func,
  emailError: PropTypes.string,
  password: PropTypes.string,
  onPasswordChange: PropTypes.func,
  passwordError: PropTypes.string,
  confirmPassword: PropTypes.string,
  onConfirmPasswordChange: PropTypes.func,
  confirmPasswordError: PropTypes.string,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onValueChange: PropTypes.func,
  placeholderName: PropTypes.string,
  labelName: PropTypes.string,
  valueName: PropTypes.string,
  onchangeName: PropTypes.func,
  valueEmail: PropTypes.string,
  onchangeEmail: PropTypes.func,
  labelBirthDate: PropTypes.string,
  placeholderBirthDate: PropTypes.string,
  onDateChange: PropTypes.func,
  valuePhoneNumber: PropTypes.string,
  onChangePhoneNumber: PropTypes.func,
  onPressTitle: PropTypes.func,

  changeSelectedDate: PropTypes.func,
  onSignin: PropTypes.func,
  labelSeparator: PropTypes.string,
  topRightBottomSheetTitle: PropTypes.string,
  bsNameTitle: PropTypes.string,
  bsBirthDateTitle: PropTypes.string,
  labelRegister: PropTypes.string,
  labelHaveAnAccount: PropTypes.string,
  labelSignIn: PropTypes.string,
  labelEmail: PropTypes.string,
  placeholderEmail: PropTypes.string,
  getCountry: PropTypes.func,
  selectedDate: PropTypes.string,
  registerIsLoading: PropTypes.bool,
}

const Style = {
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
}
