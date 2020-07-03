import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import ProfileEditPhoneScreen from 'components/organism/profileEditPhoneScreen'
import ProfileAction from 'scenes/home/store/actions'
import ProfileEditPhoneAction from 'scenes/profileEditPhone/store/actions'
//import { ProfileEditPhoneTypes } from '../store/actions'

function ProfileEditPhone({
  navigation,
  fetchUser,
  user,
  userIsLoading,
  userErrorMessage,
  putPhone,
  phoneNumber,
  fetchPhoneNumber,
  editPhone,
  fetchPhoneNumberFailure,
  fetchPhoneNumberLoading,
}) {
  useEffect(() => {
    async function init() {
      fetchPhoneNumberFailure()
      console.log('pohne: ', await phoneNumber)
      console.log('user: ', await user)
    }
    init()
  }, [])
  const [verification, setVerification] = useState(false)
  const onSave = async (otpCode, noHandphone, updateNoHandphone) => {
    await fetchPhoneNumber({
      OtpCode: otpCode,
      NoHandphone: noHandphone,
      UpdateNoHandphone: updateNoHandphone,
      user,
    })
  }

  const toggleModal = () => {
    setVerification(!verification)
  }

  const onBack = () => {
    navigation.goBack()
  }
  return (
    <ProfileEditPhoneScreen
      onBack={onBack}
      onSave={onSave}
      phoneNumber={user.NoHandphone}
      email={user.EmailPersonal}
      verification={verification}
      onToggleModal={toggleModal}
      errorMessage={''}
      isLoading={phoneNumber.phoneNumberIsLoading}
    />
  )
}

ProfileEditPhone.defaultProps = {}

ProfileEditPhone.propTypes = {
  fetchUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.home.user,
  //userIsLoading: state.home.userIsLoading,
  //userErrorMessage: state.home.userErrorMessage,
  //phoneNumberIsLoading: state.editPhone.phoneNumberIsLoading,
  phoneNumber: state.editPhones,
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (value) => dispatch(ProfileAction.fetchUser(value)),
  fetchPhoneNumberLoading: () => dispatch(ProfileEditPhoneAction.fetchPhoneNumberLoading()),
  fetchPhoneNumber: (value) => dispatch(ProfileEditPhoneAction.fetchPhoneNumber(value)),
  fetchPhoneNumberFailure: () => dispatch(ProfileEditPhoneAction.fetchPhoneNumberFailure()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEditPhone)
