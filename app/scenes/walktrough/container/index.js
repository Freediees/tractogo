import React, { useState, useEffect } from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
// import { liveInEurope } from 'App/Stores/Example/Selectors'
import WalktroughScreen from 'components/organism/walktroughScreen'

function Walktrough(props) {
  return (
    <WalktroughScreen
      onSignUp={() => props.navigation.replace('RegisterScreen')}
      onSignIn={() => props.navigation.replace('LoginScreen')}
    />
  )
}

const mapStateToProps = (state) => ({
  // liveInEurope: liveInEurope(state),
})

// export default connect(
//     mapStateToProps
// )(Walktrough)

export default Walktrough
