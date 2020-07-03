import React, { useEffect } from 'react'
import { Linking, Alert } from 'react-native'

import { Provider } from 'react-redux'
import '../I18n/I18n.js'
import { PersistGate } from 'redux-persist/lib/integration/react'
import * as Sentry from '@sentry/react-native'
import DeepLinking from 'react-native-deep-linking'
import createStore from 'stores'
import RootScreen from 'containers/root/rootScreen'
import iid from '@react-native-firebase/iid'

import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging'
import firebase from '@react-native-firebase/app'

const { store, persistor } = createStore()

// XMLHttpRequest = GLOBAL.originalXMLHttpRequest
//   ? GLOBAL.originalXMLHttpRequest
//   : GLOBAL.XMLHttpRequest

// // fetch logger
// global._fetch = fetch
// global.fetch = function(uri, options, ...args) {
//   return global._fetch(uri, options, ...args).then((response) => {
//     console.log('Fetch', { request: { uri, options, ...args }, response })
//     return response
//   })
// }

export default function App() {
  useEffect(() => {
    async function initialize() {
      Sentry.init({
        dsn: 'https://7d4c7c0d124147cdad608f3991ca1fc1@o201234.ingest.sentry.io/2731530',
      })
      await firebase.messaging().registerDeviceForRemoteMessages()
    }

    initialize()
    requestUserPermission()
    getInstanceId()

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
    })

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification
      )
      console.log('data inside', remoteMessage.data)
      console.log('target screen', remoteMessage.data.screen)
    })

    return unsubscribe
  }, [])

  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission({
      alert: true,
      announcement: false,
      badge: true,
      provisional: true,
      sound: true,
    })
    if (authorizationStatus) {
      const fcmToken = messaging().getToken()
      
      fcmToken.then((data) => console.log('token data', data))
      console.log('Permission status:', authorizationStatus)
    }

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.')
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.')
    } else {
      console.log('User has notification permissions disabled')
    }
  }

  async function getInstanceId() {
    const id = await iid().get()
    console.log('Current Instance ID: ', id)
  }

  // componentDidMount() {
  //   Sentry.init({
  //     dsn: 'https://7d4c7c0d124147cdad608f3991ca1fc1@o201234.ingest.sentry.io/2731530',
  //   });

  //   messaging().registerDeviceForRemoteMessages();

  //   const granted =  messaging().requestPermission({
  //     alert: true,
  //     announcement: false,
  //     badge: true,
  //     carPlay: true,
  //     provisional: false,
  //     sound: true,
  //   });
  //   if (granted) {
  //     const fcmToken =  messaging().getToken();
  //     console.log({fcmToken});
  //     console.log('User granted messaging permissions!');
  //   } else {
  //     console.log('User declined messaging permissions :(');
  //   }

  //   DeepLinking.addScheme('tractogo://')
  //   Linking.addEventListener('url', this.handleUrl)

  //   DeepLinking.addRoute('/settings', (response) => {
  //     // example://test
  //     console.log('response')
  //     this.setState({ response })
  //   })

  //   Linking.getInitialURL()
  //     .then((url) => {
  //       if (url) {
  //         Linking.openURL(url)
  //       }
  //     })
  //     .catch((err) => console.error('An error occurred', err))
  // }

  // componentWillUnmount() {
  //   Linking.removeEventListener('url', this.handleUrl)
  // }

  // handleUrl = ({ url }) => {
  //   Linking.canOpenURL(url).then((supported) => {
  //     if (supported) {
  //       DeepLinking.evaluateUrl(url)
  //     }
  //   })
  // }

  // render() {
  return (
    /**
     * @see https://github.com/reduxjs/react-redux/blob/master/docs/api/Provider.md
     */
    <Provider store={store}>
      {/**
       * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
       * and saved to redux.
       * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
       * for example `loading={<SplashScreen />}`.
       * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
       */}
      <PersistGate loading={null} persistor={persistor}>
        <RootScreen />
      </PersistGate>
    </Provider>
  )
  // }
}
