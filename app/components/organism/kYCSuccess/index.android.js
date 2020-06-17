import React from 'react'
import PropTypes from 'prop-types'
import { TouchableNativeFeedback, Text, View } from 'react-native'
import Separator from 'components/atom/separator'
import { Background, Border, Padding, Alignment, Fonts, Column } from 'theme'

export default function KYCSuccessScreen({ onHomeButtonPress }) {
  return (
    <View style={{ flexDirection: 'column' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ ...Fonts.f_14, ...Fonts.bold, ...Fonts.text_black }}>Masuk</Text>
      </View>
      <View style={{ flex: 11, flexDirection: 'column', ...Column.col_12 }}>
        <CenterView>
          <Image
            source={require('images/illustration-trac-06.png')}
            style={{ ...ImageSize.img_l, ...Margin.mt_20 }}
          />
        </CenterView>
        <CenterView>
          <TextInput placeholder={'Email'} />
          <PasswordInput />
          <View style={{ ...Margin.mt_20, ...Margin.mb_20, width: '100%' }}>
            <PrimaryButton text={'Masuk'} style={{ ...Margin.mt_8, ...Margin.mb_8 }} />
            <SeparatorText text={'Atau dengan'} style={{ ...Margin.mb_12, ...Margin.mt_12 }} />
            <SecondaryButton
              text={'Google'}
              icon={require('icons/google_icon_lg.png')}
              style={{ ...Margin.mt_8, ...Margin.mb_8 }}
            />
          </View>
          <View style={{ ...Margin.mt_20, flexDirection: 'row' }}>
            <Text style={{ ...Fonts.f_10, ...Margin.mr_8 }}>{'Belum punya akun?'}</Text>
            <TextButton text={'DAFTAR'} />
          </View>
        </CenterView>
      </View>
    </View>
  )
}

KYCSuccessScreen.defaultProps = {
  onLogin: null,
  onLoginError: null,
  onLoginSuccess: false,
  onGoogleLogin: null,
  onGoogleLoginError: null,
  onGoogleLoginSuccess: false,
  email: '',
  onEmailChange: null,
  emailError: null,
  password: null,
  onPasswordChange: null,
  passwordError: null,
}

KYCSuccessScreen.propTypes = {
  onLogin: PropTypes.func,
  onLoginError: PropTypes.string,
  onLoginSuccess: PropTypes.bool,
  onGoogleLogin: PropTypes.func,
  onGoogleLoginError: PropTypes.string,
  onGoogleLoginSuccess: PropTypes.bool,
  email: PropTypes.string,
  onEmailChange: PropTypes.func,
  emailError: PropTypes.string,
  password: PropTypes.string,
  onPasswordChange: PropTypes.func,
  passwordError: PropTypes.string,
}
