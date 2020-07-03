import React, { useState, useEffect } from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import CenterView from 'components/molecules/centerView'
// import { liveInEurope } from 'App/Stores/Example/Selectors'
import RegisterVerification from 'components/organism/registerVerification'
import LoginAction from '../store/actions'
import { checkAuth } from 'function/apiRequest'
import AsyncStorage from '@react-native-community/async-storage'
import messaging from '@react-native-firebase/messaging'

const LoginVerification = ({
  navigation,
  loginVerifySuccess,
  loginVerifyIsLoading,
  loginVerifyErrorMessage,
  fetchLoginVerify,
  fetchLoginVerifyFailure,
}) => {
  // const { noHandPhone } = navigation.state.params
  const { params } = navigation.state
  const [phoneNumber, setPhoneNumber] = useState('')
  //const [phoneNumber, setPhoneNumber] = useState('85740707517')
  const [isLoading, changeIsLoading] = useState(true)

  useEffect(() => {
    async function initialize() {
      console.log({ params })
      if (params && params.payload.NoHandphone) {
        console.log('sini')
        setPhoneNumber(params.payload.NoHandphone)
      }
      fetchLoginVerifyFailure('')
      if ((await checkAuth()) === true) {
        navigation.pop()
      }
      
      changeIsLoading(false)
    }
    initialize()
    const unsubscribe = navigation.addListener('didFocus', () => {
      changeIsLoading(true)
      initialize()
    })
  }, [navigation])

  const onBack = () => {
    navigation.goBack()
  }

  //
  const onSubmit = async (value) => {
    // SEMENTARA REMARK
    // let data = await localStorageDecrypt('user')
    // let user = JSON.parse(data)
    let deviceToken = await AsyncStorage.getItem('deviceToken')
    if (!deviceToken) {
      deviceToken = await messaging().getToken()
    }

    if (value.length === 4) {
      const verify = {
        //NoHandphone: '+62' + phoneNumber,
        NoHandphone: phoneNumber,
        OtpCode: value,
      }
      if (params) {
        const newPayload = {
          payload: {
            payload: verify,
            callback: params.loginAction,
            device: {
              type: Platform.OS,
              deviceToken: deviceToken,
            },
          },
        }
        console.log(verify)
        fetchLoginVerify(newPayload)
      } else {
        const newPayload = {
          payload: {
            payload: verify,
            callback: null,
            device: {
              type: Platform.OS,
              deviceToken: deviceToken,
            },
          },
        }
        console.log(verify)
        fetchLoginVerify(newPayload)
      }
    }

    // props.fetchLogin(verify)

    // SEMENTARA NUNGGU ID NEXMO
    // if (value === '1234') navigation.navigate('routeTwo')
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 40 }}>Loading...</Text>
      </View>
    )
  }

  return (
    <RegisterVerification
      onCodeFilled={(a) => onSubmit(a)}
      onButtonPress={(a) => onSubmit(a)}
      phoneNumber={phoneNumber}
      onIconLeftPress={onBack}
      isLoading={loginVerifyIsLoading}
      errorMessage={loginVerifyErrorMessage}
    />
  )
}

const mapStateToProps = (state) => ({
  loginVerifySuccess: state.loginVerify.loginVerifySuccess,
  loginVerifyIsLoading: state.loginVerify.loginVerifyIsLoading,
  loginVerifyErrorMessage: state.loginVerify.loginVerifyErrorMessage,
  // liveInEurope: liveInEurope(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchLoginVerify: (value) => dispatch(LoginAction.fetchLoginVerify(value)),
  fetchLoginVerifyFailure: () => dispatch(LoginAction.fetchLoginVerifyFailure()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginVerification)
