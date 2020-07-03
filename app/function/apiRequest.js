import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import NavigationService from 'services/navigationService'
import { PUBLIC_KEY } from 'config'
import { addNavCounter, resetNavCounter } from 'function'

const defineHeaders = async () => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) {
    headers.Authorization = `Bearer ${AUTH}`
  } else {
    headers.Basic = PUBLIC_KEY
  }
  return headers
}

const doResolveLoginRoute = async (callBackAfterLogin = null) => {
  const AUTH = await AsyncStorage.getItem('token')
  console.log('AUTH :', AUTH)
  if (!AUTH) {
    if (!callBackAfterLogin) {
      NavigationService.navigate('LoginScreen')
    } else {
      console.log('masuk sini lagi')
      addNavCounter()
      // NavigationService.backToPrev()
      NavigationService.navigate('LoginScreen', { loginAction: callBackAfterLogin })
    }
    return false
  } else {
    resetNavCounter()
    return true
  }
}

const checkAuth = async () => {
  const AUTH = await AsyncStorage.getItem('token')
  console.log('AUTH :', AUTH)
  if (!AUTH) {
    console.log('unauth')
    return false
  } else {
    return true
  }
}

const doResolveLoginRouteTab = async (callBackAfterLogin = null) => {
  const AUTH = await AsyncStorage.getItem('token')
  console.log('AUTH :', AUTH)
  if (!AUTH) {
    if (!callBackAfterLogin) {
      NavigationService.navigate('LoginScreen')
    } else {
      // NavigationService.navigate('Home')
      addNavCounter()
      NavigationService.navigate('LoginScreen', { loginAction: callBackAfterLogin })
    }
    return false
  } else {
    resetNavCounter()
    return true
  }
}

const unAuthenticateCallBack = async (err) => {
  let response = {
    Error: {},
  }
  console.log(err)
  if (err.response) {
    console.log(err.response)
    if (err.response.status === 401) {
      response.Error.status = 401
      response.Error.message = 'unauthorize'
      return response
    } else {
      response.Error.status = err.response.status
      response.Error.message = 'Please Contact Customer Support'
      return response
    }
  }
}

export { defineHeaders, doResolveLoginRoute, unAuthenticateCallBack, doResolveLoginRouteTab, checkAuth }
