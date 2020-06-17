import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import RegisterScreen from 'components/organism/registerScreen'
import RegisterAction from '../store/actions'
import Moment from 'moment'
// import Style from './ExampleScreenStyle'
// import { ApplicationStyles, Helpers, Images, Metrics } from 'theme';

const RegisterContainerScreen = ({ navigation, fetchRegister, registerIsLoading, fetchRegisterFailure }) => {
  const [gender, setGender] = useState(1)
  const [title, setTitle] = useState('Mr.')
  const [fullName, setFullName] = useState('')
  const [dialcode, setdialcode] = useState('+62')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState(null)

  const onSubmit = async () => {
    var name = fullName.split(' ')
    let values = {
      EmailPersonal: email,
      NoHandphone: dialcode + phoneNumber,
      FirstName: name[0],
      LastName: fullName
        .split(' ')
        .slice(1)
        .join(' '),
      BirthDate: `${Moment(birthDate).format('YYYY-MM-DD')}`,
      Gender: gender,
    }
    if(values.NoHandphone.length < 12){
      alert(`Phone number length can't be less than 12 character`)
    }else{
      fetchRegister(values)
    }
  }

  useEffect(() => {
    fetchRegisterFailure()
    console.log('registerIsLoading useEffect', registerIsLoading)
  }, [])

  return (
    <RegisterScreen
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
        console.log({ phoneNumber })
        // setPhoneNumber(phoneNumber)
        // console.log('phone', phoneNumber)
      }}
      onDateChange={(date) => {
        setBirthDate(date)
        console.log(date)
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
      onSignin={() => navigation.navigate('LoginScreen')}
      registerIsLoading={registerIsLoading}
      onGoogleLogin={()=> {alert('Under Development')}}
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
  fetchRegister: (value) => dispatch(RegisterAction.fetchRegister(value)),
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
