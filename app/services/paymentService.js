import axios from 'axios'
import { PAYMENT_METHOD, REDEEM_VOUCHER } from 'config'
import { objectToQueryString } from 'function'
import NavigationService from 'services/navigationService'
import AsyncStorage from '@react-native-community/async-storage'
import { unAuthenticateCallBack, defineHeaders } from 'function/apiRequest'

const getPaymentMethods = async (payload) => {
  const buID = await AsyncStorage.getItem('buID')
  const headers = await defineHeaders()
  return axios
    .get(`${PAYMENT_METHOD}?BusinessUnitId=${buID}`, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getRedeemVoucher = async (payload) => {
  const headers = await defineHeaders()
  const url = `${REDEEM_VOUCHER(payload.voucher)}?${objectToQueryString(payload.params)}`
  return axios
    .get(url, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

export const paymentService = {
  getPaymentMethods,
  getRedeemVoucher,
}
