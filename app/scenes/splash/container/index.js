import React, { useState, useEffect } from 'react'
import { Animated, Easing, Image } from 'react-native';
import { Text, View } from 'react-native'
import Splash from 'components/organism/splashScreen'
import styles from './style'
import AsyncStorage from '@react-native-community/async-storage'
import messaging from '@react-native-firebase/messaging'

export default function SplashScreen(props) {
  const mode = new Animated.Value(1);

  useEffect(() => {
    async function initialize() {
      const userToken = await AsyncStorage.getItem('token')
      const isOnBoard = await AsyncStorage.getItem('onBoard')
      if (userToken && userToken !== '') {
        props.navigation.navigate('routeTwo')
      } else {
        mode.setValue(0)
        return Animated.timing(mode, {
          toValue: 1,
          duration: 2000,
          bounciness: 20
        }).start(async () => {
          if (isOnBoard === '1') {
            props.navigation.navigate('routeTwo')
          } else {
            props.navigation.replace('WalktroughScreen')
          }
        })
      }
      // messaging.getToken().then((token) => {
      //   console.log('current device token', token)
      // })
    }
    initialize()
  }, [props.navigation])

  return (
    <Splash/>
  )

}
