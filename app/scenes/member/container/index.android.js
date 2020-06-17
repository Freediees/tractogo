import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { getUserProfileObject } from 'function'
import ImageAction from 'scenes/kYCImage/store/actions'

import MemberScreen from 'components/organism/memberScreen'
import MemberRegistrationScreen from 'components/organism/memberRegistrationScreen'
import VerifikasiKYC from 'components/organism/verifikasiKYC'

function Member({ navigation, resetImage }) {
  const [data, setdata] = useState({})

  const onBack = () => {
    navigation.goBack()
  }

  const moveToImage = () => {
    resetImage()
    if (data.InReviewKYC == 1) {
      // alert('In Review KYC')
      navigation.navigate('CameraScreen')
    } else {
      navigation.navigate('CameraScreen')
    }
  }

  useEffect(() => {
    async function initialize() {
      let dataJson = await getUserProfileObject()
      console.log(dataJson)
      setdata(dataJson)
    }
    initialize()
  }, [])

  if (data.InReviewKYC == 0) {
    return (
      <MemberRegistrationScreen
        onButtonPress={moveToImage}
        onBack={onBack}
        onIconLeftPress={onBack}
      />
    )
  } else if (data.InReviewKYC != 0) {
    if (data.IsMember == 1) {
      return <MemberScreen onBack={onBack} />
    } else {
      return <VerifikasiKYC onBack={onBack} onFooterPress={onBack} />
    }
  } else {
    return <View />
  }
}

Member.defaultProps = {}

Member.propTypes = {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  resetImage: () => dispatch(ImageAction.resetImage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Member)
