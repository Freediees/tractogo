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
  SEND_DEVICE_TOKEN,
} from 'config'
import NavigationService from 'services/navigationService'
import { objectToQueryString } from 'function'
import { defineHeaders, unAuthenticateCallBack } from 'function/apiRequest'
import AsyncStorage from '@react-native-community/async-storage'

const getStocksRequest = async (payload) => {
  const headers = await defineHeaders()
  // console.log('SM_APP_KEY', SM_APP_KEY)
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
      return unAuthenticateCallBack(err)
    })
}

const getRentalDuration = async (payload) => {
  const headers = await defineHeaders()
  return axios
    .get(RENTAL_DURATION_CAR_RENTAL, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      if (err.response) {
        return unAuthenticateCallBack(err)
      }
    })
}

const getCityCoverage = async (payload) => {
  const buID = await AsyncStorage.getItem('buID')
  const prdID = await AsyncStorage.getItem('prdID')
  const headers = await defineHeaders()
  return axios
    .get(`${CITY_COVERAGE([CID, buID, prdID])}`, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getMasterAirport = async () => {
  // const buID = await AsyncStorage.getItem('buID')
  // const prdID = await AsyncStorage.getItem('prdID')
  const headers = await defineHeaders()
  return axios
    .get(MASTER_AIRPORT, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getAirportCoverage = async (airportCode) => {
  // const buID = await AsyncStorage.getItem('buID')
  // const prdID = await AsyncStorage.getItem('prdID')
  const headers = await defineHeaders()
  return axios
    .get(AIRPORT_COVERAGE + airportCode.payload, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getAdjustmentRetails = async () => {
  const headers = await defineHeaders()
  return axios
    .get(`${ADJUSTMENT_TIME}`, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getDistanceMatrixRequest = async (payload) => {
  const headers = await defineHeaders()
  return axios
    .get(`${GOOGLE_GET_DISTANCE_MATRIX}?${objectToQueryString(payload)}`, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getDistanceMatrixRequestByAddress = async (payload) => {
  const headers = await defineHeaders()
  console.log({ payload })
  return axios
    .get(
      `${GOOGLE_GET_DISTANCE_MATRIX}?origins=${payload.origin}&destinations=${payload.destination}`,
      {
        headers,
      }
    )
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getPlaceCoordinate = async (payload) => {
  const headers = await defineHeaders()
  // payload origins=-6.2,122.2132&destinations=-6.23,102.120391
  console.log(`${GOOGLE_FIND_PLACE}?input=${payload}`)
  return axios
    .get(`${GOOGLE_FIND_PLACE}?input=${payload}`, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getZone = async (payload) => {
  const headers = await defineHeaders()
  return axios
    .get(`${ZONE([payload.buID, payload.prdID, payload.distance])}`, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getAddressRequest = async (payload) => {
  const headers = await defineHeaders()
  return axios
    .get(`${GOOGLE_PLACE_AUTOCOMPLETE}?input=${payload}`, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getAddressDetailRequest = async (payload) => {
  const headers = await defineHeaders()
  return axios
    .get(`${GOOGLE_PLACE_DETAIL}?${objectToQueryString(payload)}`, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getBranchRequest = async (payload) => {
  const headers = await defineHeaders()
  return axios
    .get(`${BRANCH}/${payload}`, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getMasterBankRequest = async (payload) => {
  const headers = await defineHeaders()
  return axios
    .get(`${BANK}?${objectToQueryString(payload)}`, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getCarTypeRequest = async (payload) => {
  const headers = await defineHeaders()
  return axios
    .get(`${LIST_CAR_TYPE}/${payload}`, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getMasterProduct = async (payload) => {
  const headers = await defineHeaders()
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
      return unAuthenticateCallBack(err)
    })
}

const getPromoRequest = async () => {
  const headers = await defineHeaders()
  return axios
    .get(PROMO, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const getNewsRequest = async () => {
  const headers = await defineHeaders()
  return axios
    .get(CONTENT_ARTICLE, {
      headers,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

const sentDeviceToken = async (payload) => {
  const headers = await defineHeaders()
  return axios
    .post(
      SEND_DEVICE_TOKEN,
      {
        Type: payload.type,
        TokenDevice: payload.deviceToken,
      },
      {
        headers,
      }
    )
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((error) => {
      console.log(error)
      return error
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
  sentDeviceToken,
}
