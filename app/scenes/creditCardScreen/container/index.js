import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { CheckBox, Text, View, TextInput, TouchableHighlight } from 'react-native'
import CheckoutScreenActions from 'scenes/checkoutScreen/store/actions'
import AsyncStorage from '@react-native-community/async-storage'
import Xendit from 'xendit-js-node'

import { WebView } from 'react-native-webview'
import Spinner from 'react-native-loading-spinner-overlay'

import styles from './styles'

const TokenScreen = ({
  navigation,
  postCheckoutCC,
  postCheckoutIsLoading,
  postCheckoutErrorMessage,
  postCheckoutSuccessMessage,
  postCheckoutWithoutCartCC,
  postCheckoutWithoutCartIsLoading,
  postCheckoutWithoutCartErrorMessage,
  postCheckoutWithoutCartSuccessMessage,
}) => {
  const { creditCardInfo, checkout, cartItem, reservationPromo } = navigation.state.params

  const [isMultipleUse, changeIsMultipleUse] = useState(false)
  const [isSkip3DS, changeIsSkip3DS] = useState(false)
  const [isTokenizing, changeIsTokenizing] = useState(false)
  const [isRenderWebview, changeIsRenderWebView] = useState(false)
  const [webviewUrl, changeWebviewUrl] = useState('')
  const [tempToken, changeToken] = useState('')

  useEffect(() => {
    const unsubscribe = navigation.addListener('didFocus', async () => {
      // The screen is focused
      // Call any action
      console.log(creditCardInfo)
      console.log(creditCardInfo.totalAmount)
      tokenize()
    })
  }, [navigation])

  const setIsTokenizing = () => {
    changeIsTokenizing(!isTokenizing)
  }

  const INJECTED_JAVASCRIPT = `(function() {
    var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
    var addEventListener = window[eventMethod];
    var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

    addEventListener(messageEvent, function(e) {
      var key = e.message ? 'message' : 'data';
      var messageStr = e[key];

      try {
        window.ReactNativeWebView.postMessage(messageStr);
      } catch (e) {}
  }, false);
})();`

  const tokenize = () => {
    setIsTokenizing()
    Xendit.setPublishableKey(
      'xnd_public_development_gQATTUQFA5CVn5LDX7KTAuhCiI9nCGKluA8EM0Q9dEWZJSXNclES7PAREGdQy8V'
    )

    const tokenData = getTokenData()
    console.log(tokenData)

    Xendit.card.createToken(tokenData, _tokenResponseHandler)
  }

  const getTokenData = () => {
    return {
      amount: creditCardInfo.totalAmount,
      card_number: creditCardInfo.cardNo,
      card_exp_month: creditCardInfo.month,
      card_exp_year: `20${creditCardInfo.year}`,
      card_cvn: creditCardInfo.cvv,
      is_multiple_use: false,
      should_authenticate: true,
    }
  }

  const _tokenResponseHandler = (err, token) => {
    if (err) {
      alert(JSON.stringify(err))
      setIsTokenizing()

      return
    }
    console.log(token)
    switch (token.status) {
      case 'APPROVED':
        // alert(JSON.stringify(token))
        changeIsRenderWebView(false)
        break
      case 'VERIFIED':
        // alert(JSON.stringify(token))
        changeIsRenderWebView(false)
        break
      case 'FAILED':
        alert('Credit Card Information is Invalid')
        // alert(JSON.stringify(token))
        navigation.goBack()
        changeIsRenderWebView(false)
        break
      case 'IN_REVIEW':
        changeWebviewUrl(token.payer_authentication_url)
        changeIsRenderWebView(true)
        changeToken(token)

        break
      default:
        navigation.goBack()
        alert('Unknown token status')
        break
    }

    setIsTokenizing()
  }

  const patchPostMessageFunction = () => {
    var originalPostMessage = window.postMessage
    var patchedPostMessage = function(message, targetOrigin, transfer) {
      originalPostMessage(message, targetOrigin, transfer)
    }
    patchedPostMessage.toString = function() {
      return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
    }

    window.ReactNativeWebView.postMessage = patchedPostMessage
  }

  const injectScript = '(' + String(patchPostMessageFunction) + ')();'

  const onMessage = async (rawData) => {
    const data = JSON.parse(rawData.nativeEvent.data)

    changeIsRenderWebView(false)
    console.log(data)
    if (data.status === 'VERIFIED') {
      if (checkout) {
        console.log('test checkout')
        const payload = checkout
        payload.PaymentMethod = {
          PaymentMethodId: creditCardInfo.PaymentMethodId,
          MsBankId: creditCardInfo.MsBankId,
          CC_Tokenization: data,
        }
        console.log(payload)
        await postCheckoutWithoutCartCC(payload)
      } else {
        console.log('test cart')
        const payload = {
          PaymentMethod: creditCardInfo,
          ReservationPromo: reservationPromo || [],
        }
        payload.PaymentMethod = {
          PaymentMethodId: creditCardInfo.PaymentMethodId,
          MsBankId: creditCardInfo.MsBankId,
          CC_Tokenization: data,
        }
        await postCheckoutCC(payload)
      }
    } else {
      navigation.goBack()
    }
  }

  if (isRenderWebview) {
    console.log(injectScript)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Payment Screen</Text>
        <View style={{ height: 200, width: 400, marginVertical: 40 }}>
          <WebView
            style={{ alignItems: 'center', height: 200 }}
            messagingEnabled={true}
            scalesPageToFit={true}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            useWebKit={true}
            source={{ uri: webviewUrl }}
            onMessage={(event) => onMessage(event)}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner visible={postCheckoutIsLoading} textContent={'Processing Payment...'} />
      <Spinner visible={postCheckoutWithoutCartIsLoading} textContent={'Processing Payment...'} />
      <Text style={{ fontSize: 40 }}>Redirecting...</Text>
    </View>
  )
}

TokenScreen.defaultProps = {}

TokenScreen.propTypes = {}

const mapStateToProps = (state) => ({
  postCheckoutIsLoading: state.checkout.postCheckoutIsLoading,
  postCheckoutErrorMessage: state.checkout.postCheckoutErrorMessage,
  postCheckoutSuccessMessage: state.checkout.postCheckoutSuccessMessage,
  postCheckoutWithoutCartIsLoading: state.checkout.postCheckoutWithoutCartIsLoading,
  postCheckoutWithoutCartErrorMessage: state.checkout.postCheckoutWithoutCartErrorMessage,
  postCheckoutWithoutCartSuccessMessage: state.checkout.postCheckoutWithoutCartSuccessMessage,
})

const mapDispatchToProps = (dispatch) => ({
  postCheckoutCC: (payload) => dispatch(CheckoutScreenActions.postCheckoutCC(payload)),
  postCheckoutWithoutCartCC: (payload) =>
    dispatch(CheckoutScreenActions.postCheckoutWithoutCartCC(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TokenScreen)
