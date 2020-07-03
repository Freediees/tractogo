import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { getUserProfileObject } from 'function'
import ImageAction from 'scenes/kYCImage/store/actions'

import MemberScreen from 'components/organism/memberScreen'
import MemberRegistrationScreen from 'components/organism/memberRegistrationScreen'
import VerifikasiKYC from 'components/organism/verifikasiKYC'

function Member({ navigation, resetImage, user }) {
  const [data, setdata] = useState()
  const [statusKYC, setStatusKYC] = useState()
  const [info, setInfo] = useState()

  const onBack = () => {
    navigation.goBack()
  }

  const moveToImage = () => {
    //alert('kayece')
    //resetImage()
    navigation.navigate('CameraScreen')
  }

  useEffect(() => {
    async function initialize() {
      console.log(user)
      // let dataJson = await getUserProfileObject()
      //console.log(dataJson.ApprovalKYC.Status)
      setdata(user)
      setStatusKYC(user.ApprovalKYC.Status)
      setInfo(user.ApprovalKYC.Description)
    }
    initialize()
  }, [])
  if (user && user.IsMember == 0 && user.InReviewKYC == 0) {
    return (
      <MemberRegistrationScreen
        onButtonPress={moveToImage}
        onBack={onBack}
        onIconLeftPress={onBack}
      />
    )
  } else if (user && user.IsMember == 0 && user.InReviewKYC == 1) {
    return (
      <VerifikasiKYC
        onBack={onBack}
        onFooterPress={
          user.ApprovalKYC.Status && user.ApprovalKYC.Status == 0
            ? () => {
                moveToImage()
              }
            : onBack
        }
        statusKYC={user.ApprovalKYC.Status}
        informationLabel={
          (user.ApprovalKYC && user.ApprovalKYC.Description) ||
          'Our system is cheking the data that you have sent'
        }
        footerLabel={user.ApprovalKYC && user.ApprovalKYC.Status == 0 ? 'Retake Photo' : 'Back'}
      />
    )
  } else if (user && user.IsMember == 1) {
    return <MemberScreen onBack={onBack} />
  } else {
    return <View />
  }
}

Member.defaultProps = {}

Member.propTypes = {}

const mapStateToProps = (state) => ({
  user: state.home.user,
})

const mapDispatchToProps = (dispatch) => ({
  resetImage: () => dispatch(ImageAction.resetImage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Member)
