import React, { useState } from 'react'
// import { Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import CenterView from 'components/molecules/centerView'
// import { liveInEurope } from 'App/Stores/Example/Selectors'
import RegisterVerification from 'components/organism/registerVerification'
import LoginAction from '../store/actions'

const LoginVerification = ({
  navigation,
  loginVerifySuccess,
  loginVerifyIsLoading,
  loginVerifyErrorMessage,
  fetchLoginVerify,
}) => {
  // const { noHandPhone } = navigation.state.params

  const [phoneNumber, setPhoneNumber] = useState('81230860614')

  const onBack = () => {
    navigation.goBack()
  }

  //
  const onSubmit = (value) => {
    // SEMENTARA REMARK
    // let data = await localStorageDecrypt('user')
    // let user = JSON.parse(data)

    if (value.length === 4) {
      const verify = {
        NoHandphone: '+62' + phoneNumber,
        OtpCode: value,
      }
      console.log(verify)
      fetchLoginVerify(verify)
    }

    // props.fetchLogin(verify)

    // SEMENTARA NUNGGU ID NEXMO
    // if (value === '1234') navigation.navigate('routeTwo')
  }

  return <RegisterVerification onCodeFilled={(a) => onSubmit(a)} phoneNo={phoneNumber} onIconLeftPress={onBack} />
}

const mapStateToProps = (state) => ({
  loginVerifySuccess: state.loginVerify.loginVerifySuccess,
  loginVerifyIsLoading: state.loginVerify.loginVerifyIsLoading,
  loginVerifyErrorMessage: state.loginVerify.loginVerifyErrorMessage,
  // liveInEurope: liveInEurope(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchLoginVerify: (value) => dispatch(LoginAction.fetchLoginVerify(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginVerification)
