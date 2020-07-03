import React, { useState, useEffect } from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import CenterView from 'components/molecules/centerView'
// import { liveInEurope } from 'app/Stores/Example/Selectors'
import LoginForm from 'components/organism/loginScreen'
import LoginAction from '../store/actions'
import { addNavCounter, getNavCounter } from 'function'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
import { checkAuth } from 'function/apiRequest'
import Spinner from 'react-native-loading-spinner-overlay'

const Login = ({
  navigation,
  fetchLogin,
  fetchLoginSocialite,
  loginErrorMessage,
  loginIsLoading,
}) => {
  // 8123491376
  const { params } = navigation.state
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, changeIsLoading] = useState(false)
  const [isPhoneNumberValid, changeIsPhoneNumberValid] = useState(true)

  useEffect(() => {
    async function initialize() {
      if ((await checkAuth()) === true) {
        navigation.pop()
      }
      changeIsLoading(false)
    }
    const unsubscribe = navigation.addListener('didFocus', () => {
      changeIsLoading(true)
      initialize()
    })
  }, [navigation])

  const phoneFormatter = (phone) => {
    if (phone.substring(0, 1) === '0') {
      return phone.substring(1, phone.length)
    } else {
      return phone
    }
  }

  const onSubmit = () => {
    let values = {
      NoHandphone: '+62' + phoneFormatter(phoneNumber),
    }
    // if (params) {
    //   if (params.loginAction) {
    //     const newPayload = {
    //       payload: {
    //         payload: values,
    //         callback: params.loginAction,
    //       },
    //     }
    //   } else {
    //     const newPayload = {
    //       payload: {
    //         payload: values,
    //         callback: null,
    //       },
    //     }
    //   }
    // } else {
    //   const newPayload = {
    //     payload: {
    //       payload: values,
    //       callback: null,
    //     },
    //   }
    // }
    // fetchLogin(newPayload)
    // if (props.loginSucces)
    if (
      phoneNumber.length >= 9 &&
      phoneNumber.length <= 12 &&
      phoneNumber.substring(0, 1) === '8'
    ) {
      changeIsPhoneNumberValid(true)
      console.log({ params })
      if (params) {
        if (typeof params.loginAction !== 'undefined' && params.loginAction) {
          addNavCounter()
          navigation.navigate('LoginVerifyScreen', {
            loginAction: params.loginAction || null,
            payload: values,
          })
        } else {
          navigation.navigate('LoginVerifyScreen', { payload: values })
        }
      } else {
        // changeIsLoading(true)
        navigation.navigate('LoginVerifyScreen', {
          payload: values,
        })
      }
    } else {
      console.log('error')
      changeIsPhoneNumberValid(false)
    }
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
      console.log('userInfo: ', userInfo.user)
      if (params) {
        if (params.loginAction) {
          const newPayload = {
            payload: {
              payload: userInfo.user,
              callback: params.loginAction,
            },
          }
          fetchLoginSocialite(newPayload)
        } else {
          const newPayload = {
            payload: {
              payload: userInfo.user,
              callback: null,
            },
          }
          fetchLoginSocialite(newPayload)
        }
      } else {
        const newPayload = {
          payload: {
            payload: userInfo.user,
            callback: null,
          },
        }
        fetchLoginSocialite(newPayload)
      }
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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner visible={isLoading} textContent={'Loading...'} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <LoginForm
        phoneNumber={phoneNumber}
        onChangeText={(phoneNumber) => {
          setPhoneNumber(phoneNumber)
        }}
        onLogin={() => onSubmit()}
        onGoogleLogin={onGoogleSigin}
        isPhoneNumberValid={isPhoneNumberValid}
        onSignup={() => {
          if (params) {
            if (typeof params.loginAction !== 'undefined' && params.loginAction) {
              addNavCounter()
              navigation.navigate('RegisterScreen', { loginAction: params.loginAction || null })
            } else {
              navigation.navigate('RegisterScreen')
            }
          } else {
            navigation.navigate('RegisterScreen')
          }
        }}
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

Login.propTypes = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
