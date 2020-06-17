import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import ProfileEditPhoneScreen from 'components/organism/profileEditPhoneScreen'
import ProfileAction from 'scenes/home/store/actions'
import ProfileEditPhoneAction from 'scenes/profileEditPhone/store/actions'
//import { ProfileEditPhoneTypes } from '../store/actions'



function ProfileEditPhone({ navigation, fetchUser, user, userIsLoading, userErrorMessage, putPhone, phoneNumber, fetchPhoneNumber }) {
  useEffect(() => {
    async function init() {
      console.log(await phoneNumber)
    }
    init()
  }, [])
  const [verification, setVerification] = useState(false)
  const onSave = (otpCode, noHandphone, updateNoHandphone) => {
    toggleModal()
    //alert('Saved')
    fetchPhoneNumber({
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
  return <ProfileEditPhoneScreen onBack={onBack} onSave={onSave} phoneNumber={user.NoHandphone} email={user.EmailPersonal} verification={verification} onToggleModal={toggleModal}/>
}

ProfileEditPhone.defaultProps = {

}

ProfileEditPhone.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  phoneNumberIsLoading: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  user: state.home.user,
  userIsLoading: state.home.userIsLoading,
  userErrorMessage: state.home.userErrorMessage,
  //phoneNumberIsLoading: state.editPhone.phoneNumberIsLoading,
  phoneNumber: state.editPhone,
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (value) => dispatch(ProfileAction.fetchUser(value)),
  //fetchPhoneNumberLoading: () => dispatch(ProfileEditPhoneAction.fetchPhoneNumberLoading()),
  fetchPhoneNumber: (value) => dispatch(ProfileEditPhoneAction.fetchPhoneNumber(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEditPhone)