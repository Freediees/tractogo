import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, Image } from 'react-native'
// import Separator from 'components/atom/separator';
import CenterView from 'components/molecules/centerView'
import PhoneFieldInput from 'components/atom/phoneFieldInput'
// import TextInput from 'components/Atom/TextInput';
// import PasswordInput from 'components/Atom/PasswordInput';
import PrimaryButton from 'components/atom/primaryButton'
import SecondaryButton from 'components/atom/secondaryButton'
import TextButton from 'components/atom/textButton'
import SeparatorText from 'components/molecules/separatorText'
import { Background, Fonts, Column, ImageSize, Margin } from 'theme'

export default function LoginScreen({
  title,
  labelSignin,
  labelSeprator,
  labelSignUpDesc,
  labelSignUp,
  onLogin,
  onLoginError,
  onLoginSuccess,
  onGoogleLogin,
  onGoogleLoginError,
  onGoogleLoginSuccess,
  phoneNumber,
  onChangeText,
  onSignup,
  isPhoneNumberValid,
}) {
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ ...Fonts.f_14, ...Fonts.bold, ...Fonts.text_black }}>{title}</Text>
      </View>
      <View style={{ flex: 11, flexDirection: 'column', ...Column.col_12 }}>
        <CenterView>
          <Image
            source={require('images/illustration-trac-06.png')}
            style={{ ...ImageSize.img_l, ...Margin.mt_20 }}
          />
        </CenterView>
        <CenterView>
          <PhoneFieldInput
            phoneNumber={phoneNumber}
            onChangeText={onChangeText}
            placeholder={'Phone Number'}
          />
          <Text style={{ ...Fonts.f_10, ...Fonts.text_red, ...Margin.mb_8 }}>
            {!isPhoneNumberValid ? 'Invalid Phone Number' : ''}
          </Text>
          <View style={{ ...Margin.mt_20, ...Margin.mb_20, width: '100%' }}>
            <PrimaryButton
              onPress={onLogin}
              text={labelSignin}
              style={{ ...Margin.mt_8, ...Margin.mb_8, ...Background.bg_amber, height: 40 }}
            />
            <SeparatorText text={labelSeprator} style={{ ...Margin.mb_12, ...Margin.mt_12 }} />
            <SecondaryButton
              onPress={onGoogleLogin}
              text={'Google'}
              icon={require('icons/google_icon_lg.png')}
              style={{ ...Margin.mt_8, ...Margin.mb_8 }}
            />
          </View>
          <View style={{ ...Margin.mt_20, flexDirection: 'row' }}>
            <Text style={{ ...Fonts.f_12, ...Margin.mr_8 }}>{labelSignUpDesc}</Text>
            <TextButton text={labelSignUp} onPress={onSignup} />
          </View>
        </CenterView>
      </View>
    </View>
  )
}

LoginScreen.defaultProps = {
  Masuk: 'Sign In',
  labelSignin: 'Sign In',
  labelSeprator: 'Or With',
  labelSignUpDesc: "Don't have an account yet ?",
  labelSignUp: 'Register',
  onLogin: null,
  onLoginError: null,
  onLoginSuccess: false,
  onGoogleLogin: () => {},
  onGoogleLoginError: null,
  onGoogleLoginSuccess: false,
  phoneNumber: '',
  onChangeText: (a, b) => {
    console.log(a, b)
  },
  onSignup: () => {
    console.log('onSignup')
  },
  isPhoneNumberValid: true,
}

LoginScreen.propTypes = {
  title: PropTypes.string,
  labelSignin: PropTypes.string,
  labelSeprator: PropTypes.string,
  labelSignUpDesc: PropTypes.string,
  labelSignUp: PropTypes.string,
  onLogin: PropTypes.func,
  onLoginError: PropTypes.string,
  onLoginSuccess: PropTypes.bool,
  onGoogleLogin: PropTypes.func,
  onGoogleLoginError: PropTypes.string,
  onGoogleLoginSuccess: PropTypes.bool,
  phoneNumber: PropTypes.string,
  onChangeText: PropTypes.func,
  onSignup: PropTypes.func,
  isPhoneNumberValid: PropTypes.bool,
}
