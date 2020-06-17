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
  CHECKOUT,
  CART_CHECKOUT,
  MY_ORDERS_CANCEL_MASTER_REASON,
} from 'config'
import { objectToQueryString } from 'function'
import NavigationService from 'services/navigationService'
import AsyncStorage from '@react-native-community/async-storage'

const getStockRequest = async (payload) => {
  const tempParam =
    '?BusinessUnitId=0104&BranchId=SR01&CityId=KTID-3606&StartDate=2020-04-21T07:00:00.000Z&EndDate=2020-04-21T07:00:00.000Z&IsWithDriver=1&RentalDuration=4&RentalPackage=4&Uom=hr&ServiceTypeId=STID-003&ValidateAttribute=1'
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
    'App-Key': SM_APP_KEY,
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  const url = `${LIST_STOCK}?${objectToQueryString(payload)}`
  const tempUrl = `${LIST_STOCK}${tempParam}`
  return axios
    .get(url, {
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

const getStockPriceCarRentalRequest = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  console.log(`${PRICE_PRODUCT_CAR_RENTAL}?${objectToQueryString(payload)}`)
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  const url = `${PRICE_PRODUCT_CAR_RENTAL}?${objectToQueryString(payload)}`
  return axios
    .get(url, {
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
      console.log('err', err)
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

const getExtrasRequest = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  const url = `${EXTRAS}?${objectToQueryString(payload)}`
  console.log(url)
  return axios
    .get(url, {
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

const postAddCart = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .post(ADD_CART, payload, {
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
      console.log(err)
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

const deleteCartDetails = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .delete(DELETE_CART, {
      headers,
      data: payload,
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

const getPriceExpedition = async (payload) => {
  const buID = await AsyncStorage.getItem('buID')
  const prdID = await AsyncStorage.getItem('prdID')
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(PRICE_EXPEDITION(buID, prdID, payload.distance), {
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

const getCartDetailsRequest = async () => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const cartHeaderId = await AsyncStorage.getItem('cartHeaderId')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  console.log(cartHeaderId)
  if (cartHeaderId) {
    return axios
      .get(CART_DETAIL(cartHeaderId), {
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
  } else {
    return { Data: [] }
  }
}

const postCheckoutValidation = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  console.log('checkout validate')
  return axios
    .post(CHECKOUT_VALIDATION, payload, {
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
      console.log(err)
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

const postCheckoutWithoutCart = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  console.log('checkout without cart')
  console.log(CHECKOUT)
  console.log(payload)
  return axios
    .post(CHECKOUT, payload, {
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
      console.log({ err })
      console.log(err.response)
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

const postCheckout = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  console.log('checkout with cart')
  console.log(payload)
  console.log(CART_CHECKOUT)
  return axios
    .post(CART_CHECKOUT, payload, {
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
      console.log(err)
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

const getOrdersActiveRequest = async () => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(MY_ORDERS_ACTIVE, {
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
      console.log(err.response)
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

const getOrdersCompleteRequest = async () => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(MY_ORDERS_COMPLETE, {
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
      console.log(err.response)
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

const getOrdersCancelRequest = async () => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(MY_ORDERS_CANCEL, {
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
      console.log(err.response)
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

const getMasterReason = async () => {

  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(MY_ORDERS_CANCEL_MASTER_REASON, {
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
      console.log(err.response)
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
  postCheckout,
  postCheckoutWithoutCart,
  getMasterReason,
}
