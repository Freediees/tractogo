import axios from 'axios'
import { Config, USER,  NOTIFICATION_BY_USER } from 'config'
import { is, curryN, gte } from 'ramda'
import { objectToQueryString } from 'function'
import AsyncStorage from '@react-native-community/async-storage'
import NavigationService from 'services/navigationService'

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number)
  return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
})
const in200s = isWithin(200, 299)

/**
 * This is an example of a service that connects to a 3rd party API.
 *
 * Feel free to remove this example from your application.
 */
const userApiClient = axios.create({
  /**
   * Import the config from the app/Config/index.js file
   */
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

function fetchUser() {
  // Simulate an error 50% of the time just for testing purposes
  if (Math.random() > 0.5) {
    return new Promise(function (resolve, reject) {
      resolve(null)
    })
  }

  let number = Math.floor(Math.random() / 0.1) + 1

  return userApiClient.get(number.toString()).then((response) => {
    if (in200s(response.status)) {
      return response.data
    }

    return null
  })
}

const getUserProfile = async (payload) => {
  const AUTH = await AsyncStorage.getItem('token')
  console.log(AUTH)
  const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  console.log(headers)
  console.log(USER)
  return axios
    .get(`${USER}`, {
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

const getNotificationByUser = async (type) => {
  const AUTH = await AsyncStorage.getItem('token')
  const userFromStorage = await AsyncStorage.getItem('user')
  const user = JSON.parse(userFromStorage)
  console.log(AUTH)
  // const LANG = await AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    // 'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = `Bearer ${AUTH}`
  console.log({ user })
  return axios
    .get(`${NOTIFICATION_BY_USER}${user.Id}&Type=${type}`, {
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

export const userService = {
  fetchUser,
  getUserProfile,
  getNotificationByUser,
}
