import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import ProfileScreen from 'components/organism/profileScreen'
import { getUserProfileObject } from 'function'

import HomeAction from 'scenes/home/store/actions'
import ProfileAction from 'scenes/profile/store/actions'

function Profile({ navigation, fetchUser, user, userIsLoading, userErrorMessage, doLogout }) {
  const [onLoad, setonLoad] = useState(true)
  const [data, setData] = useState({})

  useEffect(() => {
    async function initialize() {
      // fetchUser()
      let dataJson = await getUserProfileObject()
      setData(dataJson)

      console.log(user)
    }
    initialize()
  }, [])

  const moveToDetail = () => {
    navigation.navigate('SettingScreen')
  }

  const moveToMember = () => {
    navigation.navigate('MemberScreen')
    //navigation.navigate('CameraScreen')
  }

  const datasource = [
    {
      imageSource: require('icons/ic_center.png'),
      title: 'Help Center',
      body: 'Solusi terbaik dan menghubungi kami',
      onPress: () => {
        console.log('Button Help Center')
      },
      type: 'navigate',
      content: '',
    },
    {
      imageSource: require('icons/ic_tearm_condition.png'),
      title: 'Syarat Ketentuan',
      body: 'Lihat semua syarat ketentuan',
      onPress: () => {},
      type: 'modal',
      content: '',
    },
    {
      imageSource: require('icons/ic_private.png'),
      title: 'Kebijakan Privasi',
      body: 'Lihat semua kebijakan privasi',
      onPress: () => {},
      type: 'modal',
      content: '',
    },
    {
      imageSource: require('icons/ic_setting.png'),
      title: 'Setting',
      body: 'Lihat dan atur akun anda',
      onPress: () => {},
      type: 'navigate',
      content: '',
    },
    {
      imageSource: require('icons/ic_logout.png'),
      title: 'Logout',
      body: '',
      onPress: () => {
        doLogout()
      },
      type: 'navigate',
      content: '',
    },
  ]

  return (
    <ProfileScreen
      fullName={`${user.FirstName} ${user.LastName}`}
      email={user.EmailPersonal}
      phoneNo={user.NoHandphone}
      moveToDetail={moveToDetail}
      moveToMember={moveToMember}
      dataList={datasource}
      // onEdit={onEdit}
    />
  )
}

Profile.defaultProps = {
  user: [],
}

Profile.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  doLogout: PropTypes.func,
}

const mapStateToProps = (state) => ({
  user: state.home.user,
  // userIsLoading: state.home.userIsLoading,
  // userErrorMessage: state.home.userErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  // fetchUser: (value) => dispatch(ProfileAction.fetchUser(value)),
  doLogout: () => dispatch(ProfileAction.doLogout()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
