import React, { useState, useEffect } from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
// import { liveInEurope } from 'App/Stores/Example/Selectors'
import WalktroughScreen from 'components/organism/walktroughScreen'
import AsyncStorage from '@react-native-community/async-storage'

function Walktrough(props) {
  

  return (
    <WalktroughScreen
      onSignUp={async () => {
        await AsyncStorage.setItem('onBoard', '1')
        props.navigation.replace('RegisterScreen')
      }}
      onSignIn={async () => {
        await AsyncStorage.setItem('onBoard', '1')
        props.navigation.replace('LoginScreen')
      }}
      onHome={async () => {
        await AsyncStorage.setItem('onBoard', '1')
        props.navigation.navigate('routeTwo')}
      }
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
