import axios from 'axios'
import { Config } from 'config/index.dev'
import { PUT_PHONE_NUMBER, PUT_UPDATE_PROFILE, PUT_KYC_IMAGES, GET_RATING_INFO } from 'config'
import { objectToQueryString } from 'function'
import AsyncStorage from '@react-native-community/async-storage'
import NavigationService from 'services/navigationService'
import { defineHeaders, unAuthenticateCallBack } from 'function/apiRequest'

export const putPhoneNumber = async (payload) => {
  const headers = await defineHeaders()
  const url = `${PUT_PHONE_NUMBER}`

  return axios
    .put(
      url,
      {
        OtpCode: payload.OtpCode, // sementara sampai id nexmo
        NoHandphone: payload.NoHandphone,
        UpdateNoHandphone: payload.UpdateNoHandphone,
      },
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
      return unAuthenticateCallBack(err)
    })
}

export const putImages = async (payload, id) => {
  const headers = await defineHeaders()

  const url = `${PUT_KYC_IMAGES}${id}`

  return axios
    .put(url, payload, {
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
      return unAuthenticateCallBack(err)
    })
}

export const fetchUpdateProfile = async (payload, id) => {
  const headers = await defineHeaders()
  const url = `${PUT_UPDATE_PROFILE}${id}`

  return axios
    .put(url, payload, {
      headers,
    })
    .then((response) => {
      console.log(response)
      if (response.status === 401) {
        AsyncStorage.removeItem('token')
      }
      return response.data
    })
    .catch((err) => {
      return unAuthenticateCallBack(err)
    })
}

export const fetchRatingData = async () => {
  const token = await AsyncStorage.getItem('token')
  console.log(token)
  const headers = await defineHeaders()
  const url = `${GET_RATING_INFO}`
  console.log(GET_RATING_INFO)
  console.log(headers)

  const head = {
    Authorization: `Bearer ${token}`,
  }
  console.log(head)
  return axios
    .get(GET_RATING_INFO)
    .then((response) => {
      console.log('response:', response)
      return response
    })
    .catch((err) => {
      console.log('error')
      return err
    })
}
