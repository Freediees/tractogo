import axios from 'axios'
import { Config } from 'config/index.dev'
import { PUT_PHONE_NUMBER, PUT_UPDATE_PROFILE, PUT_KYC_IMAGES } from 'config'
import { objectToQueryString } from 'function'
import AsyncStorage from '@react-native-community/async-storage'
import NavigationService from 'services/navigationService'

export const putPhoneNumber = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }

  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  const url = `${PUT_PHONE_NUMBER}`

  console.log(url)
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

export const putImages = async (payload, id) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }

  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  const url = `${PUT_KYC_IMAGES}${id}`

  
  return axios
    .put(url, payload, {
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

// export const putPhoneNumber = async (payload) => {
//   return await axios
//     .put(
//       `${Config.API_URL}user-profile/change-number-phone`, // login-phone-number`,
//       {
//         OtpCode: '1234', // sementara sampai id nexmo
//         NoHandphone: payload.NoHandphone,
//         UpdateNoHandphone: payload.UpdateNoHandphone,
//       },
//       {
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${payload.token}`,
//         },
//       }
//     )
//     .then((response) => response)
//     .catch((error) => error)
// }

// export const fetchProfileRequest = async (payload) => {
//   console.log('fetchProfileRequest: ', JSON.stringify(payload))
//   return await axios
//     .get(
//       `${Config.API_URL}user-profile/detail/${payload.userId}`, // login-phone-number`,
//       {
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${payload.token}`,
//         },
//       }
//     )
//     .then((response) => response)
//     .catch((error) => error)
// }

export const fetchUpdateProfile = async (payload, id) => {
  const AUTH = await AsyncStorage.getItem('token')
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }

  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  const url = `${PUT_UPDATE_PROFILE}${id}`

  console.log(url)

  // console.log('hai')
  // console.log(url)
  // console.log(JSON.stringify(payload))
  // console.log(headers)

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
