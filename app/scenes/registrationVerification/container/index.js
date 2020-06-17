/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import { localStorageDecrypt } from 'function/storage'
import RegisterVerifyActions from '../store/actions'
// import { liveInEurope } from 'App/Stores/Example/Selectors'
import RegisterVerification from 'components/organism/registerVerification'

// import Style from './ExampleScreenStyle'
// import { ApplicationStyles, Helpers, Images, Metrics } from 'App/Theme';

function RegisterVerify({
  props,
  navigation,
  fetchOTPVerification,
  timer,
  registerVerifyIsLoading,
}) {
  const { noHandPhone } = navigation.state.params

  const onSubmit = async (otpCode) => {
    // SEMENTARA SAMPAI NEMOXID SDH BS--62829384756
    var verify = {
      NoHandphone: noHandPhone,
      OtpCode: otpCode,
    }

    // console.log('verify: ', JSON.stringify(verify))
    console.log('verify loading', registerVerifyIsLoading)
    console.log({ verify })
    fetchOTPVerification(verify)
    // props.navigation.navigate('Home')
  }

  return (
    <RegisterVerification
      onCodeFilled={(a) => onSubmit(a)}
      phoneNumber={noHandPhone}
      timer={60}
      verificationIsLoading={registerVerifyIsLoading}
    />
  )
}

// REMAKS SEMENTARA SAMPAI NEMOXID SDH BS
const mapStateToProps = (state) => ({
  //   user: state.register.registerSuccess,
  fetchRegisterVerifySuccess: state.registerVerify.fetchRegisterVerifySuccess,
  registerVerifyIsLoading: state.registerVerify.fetchRegisterVerifyLoading,
  registerVerifyErrorMessage: state.registerVerify.fetchRegisterVerifyFailure,
  // liveInEurope: liveInEurope(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchOTPVerification: (value) => dispatch(RegisterVerifyActions.fetchRegisterVerify(value)),
})
RegisterVerification.PropTypes = {
  registerVerifyIsLoading: PropTypes.bool,
}

RegisterVerification.defautProps = {
  registerVerifyIsLoading: false,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterVerify)

// export default RegisterVerify
