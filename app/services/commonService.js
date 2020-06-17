import axios from 'axios'
import {
  RENTAL_DURATION_CAR_RENTAL,
  CITY_COVERAGE,
  MASTER_AIRPORT,
  AIRPORT_COVERAGE,
  BRANCH,
  CID,
  GOOGLE_PLACE_AUTOCOMPLETE,
  GOOGLE_PLACE_DETAIL,
  BANK,
  LIST_CAR_TYPE,
  LIST_PRODUCT,
  LIST_STOCK,
  SM_APP_KEY,
  PROMO,
  CONTENT_ARTICLE,
  ADJUSTMENT_TIME,
  GOOGLE_GET_DISTANCE_MATRIX,
  GOOGLE_FIND_PLACE,
  ZONE,
} from 'config'
import NavigationService from 'services/navigationService'
import { objectToQueryString } from 'function'
import AsyncStorage from '@react-native-community/async-storage'

const getStocksRequest = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
    // 'App-Key': SM_APP_KEY,
  }
  // console.log('SM_APP_KEY', SM_APP_KEY)
  console.log(`${LIST_STOCK}?${objectToQueryString(payload)}`)
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  const url = `${LIST_STOCK}?${objectToQueryString(payload)}`
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

const getRentalDuration = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(RENTAL_DURATION_CAR_RENTAL, {
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

const getCityCoverage = async (payload) => {
  const buID = await AsyncStorage.getItem('buID')
  const prdID = await AsyncStorage.getItem('prdID')
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  console.log('url', CITY_COVERAGE)
  return axios
    .get(`${CITY_COVERAGE([CID, buID, prdID])}`, {
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

const getMasterAirport = async () => {
  // const buID = await AsyncStorage.getItem('buID')
  // const prdID = await AsyncStorage.getItem('prdID')
  const AUTH = await AsyncStorage.getItem('token')
  // const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    // 'Accept-Language': LANG || 'id',
  }
  console.log({ MASTER_AIRPORT })
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(MASTER_AIRPORT, {
      headers,
    })
    .then((response) => {
      console.log('response status', response.status)
      console.log({ response })
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

const getAirportCoverage = async (airportCode) => {
  // const buID = await AsyncStorage.getItem('buID')
  // const prdID = await AsyncStorage.getItem('prdID')
  const AUTH = await AsyncStorage.getItem('token')
  // const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    // 'Accept-Language': LANG || 'id',
  }
  console.log( AIRPORT_COVERAGE + airportCode.payload)
  console.log({ airportCode })
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(AIRPORT_COVERAGE + airportCode.payload, {
      headers,
    })
    .then((response) => {
      console.log('response status', response.status)
      console.log({ response })
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

const getAdjustmentRetails = async () => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(`${ADJUSTMENT_TIME}`, {
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

const getDistanceMatrixRequest = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  // payload origins=-6.2,122.2132&destinations=-6.23,102.120391
  return axios
    .get(`${GOOGLE_GET_DISTANCE_MATRIX}?${objectToQueryString(payload)}`, {
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

const getDistanceMatrixRequestByAddress = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  // payload origins=-6.2,122.2132&destinations=-6.23,102.120391
  console.log({ payload })
  return axios
    .get(
      `${GOOGLE_GET_DISTANCE_MATRIX}?origins=${payload.origin}&destinations=${payload.destination}`,
      {
        headers,
      }
    )
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

const getPlaceCoordinate = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  // payload origins=-6.2,122.2132&destinations=-6.23,102.120391
  console.log(`${GOOGLE_FIND_PLACE}?input=${payload}`)
  return axios
    .get(`${GOOGLE_FIND_PLACE}?input=${payload}`, {
      headers,
    })
    .then((response) => {
      console.log('response coordinate', response)
      if (response.status === 401) {
        // refresh token here
        AsyncStorage.removeItem('token')
      }
      return response.data
    })
    .catch((err) => {
      console.log('error coordinate')
      console.log({ err })
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

const getZone = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(`${ZONE([payload.buID, payload.prdID, payload.distance])}`, {
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

const getAddressRequest = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(`${GOOGLE_PLACE_AUTOCOMPLETE}?input=${payload}`, {
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

const getAddressDetailRequest = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(`${GOOGLE_PLACE_DETAIL}?${objectToQueryString(payload)}`, {
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

const getBranchRequest = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(`${BRANCH}/${payload}`, {
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

const getMasterBankRequest = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(`${BANK}?${objectToQueryString(payload)}`, {
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

const getCarTypeRequest = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(`${LIST_CAR_TYPE}/${payload}`, {
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

const getMasterProduct = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(LIST_PRODUCT, {
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

const getPromoRequest = async () => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(PROMO, {
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

const getNewsRequest = async () => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  return axios
    .get(CONTENT_ARTICLE, {
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

export const commonService = {
  getRentalDuration,
  getCityCoverage,
  getAddressRequest,
  getBranchRequest,
  getMasterBankRequest,
  getCarTypeRequest,
  getMasterProduct,
  getPromoRequest,
  getNewsRequest,
  getStocksRequest,
  getAddressDetailRequest,
  getAdjustmentRetails,
  getDistanceMatrixRequest,
  getMasterAirport,
  getAirportCoverage,
  getPlaceCoordinate,
  getDistanceMatrixRequestByAddress,
  getZone,
}
