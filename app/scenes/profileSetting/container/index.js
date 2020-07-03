import React, { useState, useEffect } from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
// import { liveInEurope } from 'App/Stores/Example/Selectors'
import ProfileEditorScreen from 'components/organism/profileEditorScreen'
import ProfileUpdate from '../store/actions'
import { localStorageDecrypt } from 'function/storage'

function EditProfile({ navigation, putProfile, user, updateProfile }) {
  const [onLoad, setonLoad] = useState(true)
  const [gender, setGender] = useState()

  useEffect(() => {
    const initialize = async () => {
      setGender(user.Gender)
      console.log(user)
    }

    initialize()
  }, [])

  const toggleGender = (value) => {
    //console.log('MRx', value)
    setGender(value)
  }

  const moveToEdit = () => {
    navigation.navigate('EditPhoneScreen')
  }

  const getProfile = async () => {
    let data = user
    return data
  }

  const updateUser = async (value) => {
    console.log(value)
    let token = await localStorageDecrypt('token')
    let user = await getProfile()

    var name = value.name.split(' ')
    var firstName = name[0]
    var lastName = value.name
      .split(' ')
      .slice(1)
      .join(' ')

    var dataPayload = {
      firstName: firstName,
      lastName: lastName,
      birthDateContent: value.birthDateContent,
      nameTitle: gender,
      Id: user.Id,
    }

    let obj = { dataPayload, user }

    putProfile(obj)
  }

  if (user)
    return (
      <ProfileEditorScreen
        onBack={() => navigation.goBack()}
        firstName={user.FirstName}
        lastName={user.LastName}
        valueBirthDate={user.BirthDate}
        emailContent={user.EmailPersonal}
        phoneContent={user.NoHandphone}
        onChangePhoneNo={() => props.navigation.navigate('ChangePhoneno')}
        onSubmit={updateUser}
        onEditPhone={moveToEdit}
        isLoading={updateProfile.profileIsLoading}
        gender={gender}
        toggleGender={toggleGender}
      />
    )

  return null
}

const mapStateToProps = (state) => ({
  user: state.home.user,
  updateProfile: state.updateProfile,
})

const mapDispatchToProps = (dispatch) => ({
  putProfile: (value) => dispatch(ProfileUpdate.putProfile(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile)
