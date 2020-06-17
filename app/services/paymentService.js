import axios from 'axios'
import { PAYMENT_METHOD, REDEEM_VOUCHER } from 'config'
import { objectToQueryString } from 'function'
import NavigationService from 'services/navigationService'
import AsyncStorage from '@react-native-community/async-storage'

const getPaymentMethods = async (payload) => {
  const buID = await AsyncStorage.getItem('buID')
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(`${PAYMENT_METHOD}?BusinessUnitId=${buID}`, {
      headers,
    })
    .then((response) => {
      if (response.status === 401) {
        // refresh token here
        AsyncStorage.removeItem('token')
      }
      return response.data
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 401) {
          NavigationService.logout()
        } else {
          const error = {
            message: 'Please Contact Customer Support',
          }
          return error
        }
      }
    })
}

const getRedeemVoucher = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  const url = `${REDEEM_VOUCHER(payload.voucher)}?${objectToQueryString(payload.params)}`
  return axios
    .get(url, {
      headers,
    })
    .then((response) => {
      console.log(response)
      if (response.status === 401) {
        // refresh token here
        AsyncStorage.removeItem('token')
      }
      return response.data
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 401) {
          NavigationService.logout()
        } else {
          const error = {
            message: 'Please Contact Customer Support',
          }
          return error
        }
      }
    })
}

export const paymentService = {
  getPaymentMethods,
  getRedeemVoucher,
}
