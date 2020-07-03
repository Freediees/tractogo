import axios from 'axios'
import { Config, USER, NOTIFICATION_BY_USER } from 'config'
import { is, curryN, gte } from 'ramda'
import { defineHeaders, unAuthenticateCallBack } from 'function/apiRequest'
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
    return new Promise(function(resolve, reject) {
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
  const headers = await defineHeaders()
  return axios
    .get(`${USER}`, {
      headers,
    })
    .then((response) => {
      console.log('respon: ', response)
      return response.data
    })
    .catch((err) => {
      console.log(err)
      console.log('Fetch user profile error')
      return unAuthenticateCallBack(err)
    })
}

const getNotificationByUser = async (type) => {
  const userFromStorage = await AsyncStorage.getItem('user')
  const user = JSON.parse(userFromStorage)
  const headers = await defineHeaders()
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
      console.log(err)
      console.log('Fetch user notification error')
      return unAuthenticateCallBack(err)
    })
}

export const userService = {
  fetchUser,
  getUserProfile,
  getNotificationByUser,
}
