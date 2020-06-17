import React, { useState } from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import CenterView from 'components/molecules/centerView'
// import { liveInEurope } from 'app/Stores/Example/Selectors'
import LoginForm from 'components/organism/loginScreen'
import LoginAction from '../store/actions'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'

const Login = ({
  navigation,
  fetchLogin,
  fetchLoginSocialite,
  loginErrorMessage,
  loginIsLoading,
}) => {
  // 8123491376
  const [phoneNumber, setPhoneNumber] = useState('8123491376')

  const onSubmit = () => {
    let values = {
      NoHandphone: '+62' + phoneNumber,
    }

    // fetchLogin(values)
    // if (props.loginSucces)
    navigation.navigate('LoginVerifyScreen')
  }

  // sementara
  const onGoogleSigin = async () => {
    GoogleSignin.configure({
      webClientId: '628358414804-iafjt1dh925ipvlj2r8jcdf4faqj46hu.apps.googleusercontent.com',
      offlineAccess: true,
    })

    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      console.log(userInfo.user)
      fetchLoginSocialite(userInfo.user)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('IN_PROGRESS :', JSON.stringify(error))
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('IN_PROGRESS :', JSON.stringify(error))
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('PLAY_SERVICES_NOT_AVAILABLE :', JSON.stringify(error))
      } else {
        // some other error happened
        console.log(JSON.stringify(error))
      }
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center'}}>
      <LoginForm
        phoneNumber={phoneNumber}
        onChangeText={(phoneNumber) => {
          setPhoneNumber(phoneNumber)
        }}
        onLogin={() => onSubmit()}
        onGoogleLogin={onGoogleSigin}
        onSignup={() => navigation.navigate('RegisterScreen')}
      />
    </View>
  )
}

const mapStateToProps = (state) => ({
  loginSucces: state.login.loginSucces,
  loginIsLoading: state.login.loading,
  loginErrorMessage: state.login.loginError,
  // liveInEurope: liveInEurope(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchLogin: (value) => dispatch(LoginAction.fetchLogin(value)),
  fetchLoginSocialite: (value) => dispatch(LoginAction.fetchLoginSocialite(value)),
})

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
