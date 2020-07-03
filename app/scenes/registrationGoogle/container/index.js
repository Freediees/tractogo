import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import RegisterScreen from 'components/organism/registerGoogle'
import RegisterAction from 'scenes/registration/store/actions'
import Moment from 'moment'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
import { Alert } from 'react-native'
// import Style from './ExampleScreenStyle'
// import { ApplicationStyles, Helpers, Images, Metrics } from 'theme';

const RegisterContainerScreen = ({
  navigation,
  fetchRegister,
  registerIsLoading,
  fetchRegisterFailure,
  updateRegisterGoogle,
}) => {
  const { params } = navigation.state
  console.log(params)

  const [gender, setGender] = useState(0)
  const [title, setTitle] = useState('Mr.')
  const [fullName, setFullName] = useState('')
  const [dialcode, setdialcode] = useState('+62')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState(null)

  const onGoogleLogin = async () => {
    GoogleSignin.configure({
      webClientId: '628358414804-iafjt1dh925ipvlj2r8jcdf4faqj46hu.apps.googleusercontent.com',
      offlineAccess: true,
    })

    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      console.log('userInfo: ', userInfo.user)

      setFullName(userInfo.user.name)
      setEmail(userInfo.user.email)

      console.log(await fullName)
      console.log(await email)

      Alert.alert('Please fill birthdate and phone number field')
      // if (params) {
      //   if (params.loginAction) {
      //     const newPayload = {
      //       payload: {
      //         payload: userInfo.user,
      //         callback: params.loginAction,
      //       },
      //     }
      //     //fetchLoginSocialite(newPayload)
      //   } else {
      //     const newPayload = {
      //       payload: {
      //         payload: userInfo.user,
      //         callback: null,
      //       },
      //     }
      //     //fetchLoginSocialite(newPayload)
      //   }
      // } else {
      //   const newPayload = {
      //     payload: {
      //       payload: userInfo.user,
      //       callback: null,
      //     },
      //   }
      //   fetchLoginSocialite(newPayload)
      // }
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
        Alert.alert('Oops.. Something happen')
        console.log(JSON.stringify(error))
      }
    }
  }

  const onSubmit = async () => {
    var name = fullName.split(' ')
    var lastName = fullName
      .split(' ')
      .slice(1)
      .join(' ')
    let values = {
      Id: params.payload.user.Id,
      //EmailPersonal: email,
      NoHandphone: dialcode + phoneNumber,
      FirstName: name[0] ? name[0] : name,
      LastName: lastName ? lastName : name[0],
      BirthDate: `${Moment(birthDate).format('YYYY-MM-DD')}`,
      Gender: gender,
    }
    let newPayload
    if (values.NoHandphone.length < 12) {
      alert(`Phone number length can't be less than 12 character`)
    } else {
      if (params) {
        newPayload = {
          payload: {
            payload: values,
            token: params.payload.token,
            callback: params.loginAction || null,
          },
        }
      } else {
        newPayload = {
          payload: {
            payload: values,
          },
        }
      }
      updateRegisterGoogle(newPayload)
    }
  }

  useEffect(() => {
    setFullName(params.payload.user.FirstName + ' ' + params.payload.user.LastName)
    setBirthDate(params.payload.user.BirthDate)
    setEmail(params.payload.user.EmailPersonal)
    fetchRegisterFailure()
    //console.log('registerIsLoading useEffect', registerIsLoading)
  }, [])

  return (
    <RegisterScreen
      onBack={() => navigation.goBack()}
      valueName={fullName}
      // eslint-disable-next-line react/prop-types
      onIconLeftPress={() => navigation.goBack()}
      onPressTitle={(a, b) => {
        setGender(a)
        setTitle(b)
      }}
      onchangeName={(name) => setFullName(name)}
      onChangePhoneNumber={(phoneNumber) => {
        setPhoneNumber(phoneNumber)
        //console.log({ phoneNumber })
        // setPhoneNumber(phoneNumber)
        // console.log('phone', phoneNumber)
      }}
      onDateChange={(date) => {
        setBirthDate(date)
        //console.log(date)
      }}
      selectedDate={birthDate}
      valueEmail={email}
      valuePhoneNumber={phoneNumber}
      onchangeEmail={(email) => setEmail(email)}
      onRegister={() => onSubmit()}
      getCountry={(countryCode) => {
        setdialcode(countryCode)
        console.log('countryCode', dialcode)
      }}
      onSignin={() => {
        if (params) {
          if (params.loginAction) {
            navigation.navigate('LoginScreen', { loginAction: params.loginAction })
          } else {
            navigation.navigate('LoginScreen')
          }
        } else {
          navigation.navigate('LoginScreen')
        }
      }}
      registerIsLoading={registerIsLoading}
      onGoogleLogin={onGoogleLogin}
    />
  )
}

const mapStateToProps = (state) => ({
  registerSuccess: state.register.registerSuccess,
  registerIsLoading: state.register.registerIsLoading,
  registerErrorMessage: state.register.registerError,
  // liveInEurope: liveInEurope(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchRegisterFailure: () => dispatch(RegisterAction.fetchRegisterFailure()),
  updateRegisterGoogle: (value) => dispatch(RegisterAction.updateRegisterGoogle(value)),
})

RegisterContainerScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  registerIsLoading: PropTypes.bool,
  fetchRegister: PropTypes.func,
}

RegisterContainerScreen.defaultProps = {
  registerIsLoading: false,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainerScreen)
