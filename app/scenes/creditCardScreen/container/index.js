import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { CheckBox, Text, View, TextInput, TouchableHighlight } from 'react-native'
import Xendit from 'xendit-js-node'

import { WebView } from 'react-native-webview'

import styles from './styles'

const TokenScreen = ({ navigation }) => {
  const { creditCardInfo } = navigation.state.params

  const [isMultipleUse, changeIsMultipleUse] = useState(false)
  const [isSkip3DS, changeIsSkip3DS] = useState(false)
  const [isTokenizing, changeIsTokenizing] = useState(false)
  const [isRenderWebview, changeIsRenderWebView] = useState(false)
  const [webviewUrl, changeWebviewUrl] = useState('')
  const [tempToken, changeToken] = useState('')

  useEffect(() => {
    console.log(creditCardInfo)
    console.log(creditCardInfo.totalAmount)
    tokenize()
  }, [])

  const setIsTokenizing = () => {
    changeIsTokenizing(!isTokenizing)
  }

  const tokenize = () => {
    setIsTokenizing()
    Xendit.setPublishableKey(
      'xnd_public_development_OYqIfOUth+GowsY6LeJOHzLCZtSj84J9kXDn+Rxj/mbf/LCoCQdxgA=='
    )

    const tokenData = getTokenData()

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
        alert(JSON.stringify(token))
        changeIsRenderWebView(false)
        break
      case 'VERIFIED':
        alert(JSON.stringify(token))
        changeIsRenderWebView(false)
        break
      case 'FAILED':
        alert(JSON.stringify(token))
        changeIsRenderWebView(false)
        break
      case 'IN_REVIEW':
        changeWebviewUrl(token.payer_authentication_url)
        changeIsRenderWebView(true)
        changeToken(token)

        break
      default:
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

  const onMessage = (rawData) => {
    const data = JSON.parse(rawData.nativeEvent.data)

    changeIsRenderWebView(false)
    console.log(rawData)
    alert(JSON.stringify(data))
  }

  if (isRenderWebview) {
    console.log(injectScript)
    return (
      <WebView
        messagingEnabled={true}
        injectedJavaScript={injectScript}
        useWebKit={true}
        source={{ uri: webviewUrl }}
        onMessage={(event) => onMessage(event)}
      />
    )
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Amount"
        defaultValue={creditCardInfo.totalAmount}
        onChangeText={(text) => {}}
        keyboardType={'numeric'}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Card Number"
        maxLength={16}
        defaultValue={creditCardInfo.cardNo}
        onChangeText={(text) => {}}
        keyboardType={'numeric'}
      />
      <View style={styles.secondaryTextContainer}>
        <TextInput
          placeholder="Exp Month"
          maxLength={2}
          style={styles.secondaryTextInput}
          defaultValue={creditCardInfo.month}
          onChangeText={(text) => {}}
          keyboardType={'numeric'}
        />
        <TextInput
          placeholder="Exp Year"
          maxLength={4}
          style={styles.secondaryTextInput}
          defaultValue={creditCardInfo.year}
          onChangeText={(text) => {}}
          keyboardType={'numeric'}
        />
        <TextInput
          placeholder="CVN"
          maxLength={3}
          style={styles.secondaryTextInput}
          defaultValue={creditCardInfo.cvv}
          onChangeText={(text) => {}}
          keyboardType={'numeric'}
        />
      </View>
      <TouchableHighlight style={styles.button} onPress={tokenize} disabled={isTokenizing}>
        <Text style={{ color: '#fff' }}>Tokenize</Text>
      </TouchableHighlight>
    </View>
  )
}

TokenScreen.defaultProps = {}

TokenScreen.propTypes = {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TokenScreen)
