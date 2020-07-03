import axios from 'axios'
import {
  LIST_STOCK,
  PRICE_PRODUCT_CAR_RENTAL,
  SM_APP_KEY,
  EXTRAS,
  ADD_CART,
  CART_DETAIL,
  DELETE_CART,
  PRICE_EXPEDITION,
  CHECKOUT_VALIDATION,
  MY_ORDERS_ACTIVE,
  MY_ORDERS_COMPLETE,
  MY_ORDERS_CANCEL,
  MY_ORDERS_PAYMENT,
  CHECKOUT,
  CART_CHECKOUT,
  MY_ORDERS_CANCEL_MASTER_REASON,
  RESERVATION_CANCEL,
  CART,
} from 'config'
import { defineHeaders, unAuthenticateCallBack } from 'function/apiRequest'
import { objectToQueryString } from 'function'
import NavigationService from 'services/navigationService'
import AsyncStorage from '@react-native-community/async-storage'

const getStockRequest = async (payload) => {
  const tempParam =
    '?BusinessUnitId=0104&BranchId=SR01&CityId=KTID-3606&StartDate=2020-04-21T07:00:00.000Z&EndDate=2020-04-21T07:00:00.000Z&IsWithDriver=1&RentalDuration=4&RentalPackage=4&Uom=hr&ServiceTypeId=STID-003&ValidateAttribute=1'
  const headers = await defineHeaders()
  headers['App-Key'] = SM_APP_KEY
  const url = `${LIST_STOCK}?${objectToQueryString(payload)}`
  const tempUrl = `${LIST_STOCK}${tempParam}`
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

const getStockPriceCarRentalRequest = async (payload) => {
  const headers = await defineHeaders()
  const url = `${PRICE_PRODUCT_CAR_RENTAL}?${objectToQueryString(payload)}`
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

const getExtrasRequest = async (payload) => {
  const headers = await defineHeaders()
  const url = `${EXTRAS}?${objectToQueryString(payload)}`
  console.log(url)
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

const postAddCart = async (payload) => {
  const headers = await defineHeaders()
  return axios
    .post(ADD_CART, payload, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const deleteCartDetails = async (payload) => {
  const headers = await defineHeaders()
  return axios
    .delete(DELETE_CART, {
      headers,
      data: payload,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getPriceExpedition = async (payload) => {
  const buID = await AsyncStorage.getItem('buID')
  const prdID = await AsyncStorage.getItem('prdID')
  const headers = await defineHeaders()
  return axios
    .get(PRICE_EXPEDITION(buID, prdID, payload.distance), {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getCartDetailsRequest = async () => {
  const cartHeaderId = await AsyncStorage.getItem('cartHeaderId')
  const headers = await defineHeaders()
  if (cartHeaderId) {
    return axios
      .get(CART_DETAIL(cartHeaderId), {
        headers,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        return unAuthenticateCallBack(err)
      })
  } else {
    return { Data: [] }
  }
}

const getCartRequest = async () => {
  console.log('cart request')
  const headers = await defineHeaders()
  console.log(CART)
  return axios
    .get(CART, {
      headers,
    })
    .then((response) => {
      console.log(response)
      return response.data
    })
    .catch((err) => {
      console.log(err)
      return unAuthenticateCallBack(err)
    })
}

const postCheckoutValidation = async (payload) => {
  const headers = await defineHeaders()
  console.log(CHECKOUT_VALIDATION)
  console.log('validate api')
  console.log(payload)
  return axios
    .post(CHECKOUT_VALIDATION, payload, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const postCheckoutWithoutCart = async (payload) => {
  const headers = await defineHeaders()
  return axios
    .post(CHECKOUT, payload, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const postCheckout = async (payload) => {
  const headers = await defineHeaders()
  return axios
    .post(CART_CHECKOUT, payload, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getOrdersActiveRequest = async () => {
  const headers = await defineHeaders()
  return axios
    .get(MY_ORDERS_ACTIVE, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getOrdersCompleteRequest = async () => {
  const headers = await defineHeaders()
  return axios
    .get(MY_ORDERS_COMPLETE, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getOrdersCancelRequest = async () => {
  const headers = await defineHeaders()
  return axios
    .get(MY_ORDERS_CANCEL, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getOrdersPaymentRequest = async (reservasiId) => {
  console.log(reservasiId.payload)
  const headers = await defineHeaders()
  return axios
    .get(MY_ORDERS_PAYMENT(reservasiId.payload), {
      headers,
    })
    .then((response) => {
      console.log(response)
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getMasterReason = async () => {
  const headers = await defineHeaders()
  return axios
    .get(MY_ORDERS_CANCEL_MASTER_REASON, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const postReservationCancel = async (payload) => {
  const headers = await defineHeaders()
  return axios
    .put(RESERVATION_CANCEL, payload, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

export const orderService = {
  getStockRequest,
  getStockPriceCarRentalRequest,
  getExtrasRequest,
  postAddCart,
  getCartDetailsRequest,
  deleteCartDetails,
  getPriceExpedition,
  postCheckoutValidation,
  getOrdersActiveRequest,
  getOrdersCompleteRequest,
  getOrdersCancelRequest,
  getOrdersPaymentRequest,
  postCheckout,
  postCheckoutWithoutCart,
  getMasterReason,
  postReservationCancel,
  getCartRequest,
}
