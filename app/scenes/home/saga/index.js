import { put, call } from 'redux-saga/effects'
import { Alert } from 'react-native'
import HomeActions from 'scenes/home/store/actions'
import { commonService } from 'services/commonService'
import { userService } from 'services/userService'
import { saveUserProfileObject } from 'function'
import NavigationService from 'services/navigationService'
import { Padding, Margin, Row } from 'theme'
import AsyncStorage from '@react-native-community/async-storage'
import { CAR_RENTAL, AIRPORT_TRANSFER, BUS_RENTAL } from 'config'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
function* fetchUser() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(HomeActions.fetchUserLoading())

  // Fetch user informations from an API
  const json = yield call(userService.getUserProfile)
  if (json) {
    if (json.Data) {
      console.log('naruto')
      console.log(json.Data)
      yield saveUserProfileObject(json.Data)
      yield put(HomeActions.fetchUserSuccess(json.Data))
    }
  } else {
    yield put(HomeActions.fetchUserFailure('There was an error while fetching user informations.'))
  }
}

function* fetchProducts() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(HomeActions.fetchProductsLoading())

  // Fetch user informations from an API
  const json = yield call(commonService.getMasterProduct)
  if (json) {
    const dataArr = []
    if (json.Data) {
      json.Data.forEach((item) => {
        if (item.BusinessUnitId !== null && item.MsProductId !== null) {
          let newData = {
            name: item.MsProductName,
            icon: item.Icon,
            item: item,
          }
          if (item.MsProductId === CAR_RENTAL) {
            newData.onPress = async function() {
              await AsyncStorage.setItem('buID', item.BusinessUnitId)
              await AsyncStorage.setItem('prdID', item.MsProductId)
              NavigationService.navigate('CarFilterScreen')
            }
          } else if (item.MsProductId === BUS_RENTAL) {
            newData.onPress = function() {
              Alert.alert('to be developed')
            }
          } else if (item.MsProductId === AIRPORT_TRANSFER) {
            newData.onPress = async function() {
              await AsyncStorage.setItem('buID', item.BusinessUnitId)
              await AsyncStorage.setItem('prdID', item.MsProductId)
              NavigationService.navigate('AirportFilterScreen')
            }
          }
          dataArr.push(newData)
        }
      })
      yield put(HomeActions.fetchProductsSuccess(dataArr))
    } else {
      yield put(
        HomeActions.fetchProductsFailure('There was an error while fetching products informations.')
      )
    }
  }
}

function* fetchPromos() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(HomeActions.fetchPromosLoading())

  // Fetch user informations from an API
  const json = yield call(commonService.getPromoRequest)
  if (json) {
    const dataArr = []
    if (json.Data) {
      json.Data.forEach((item) => {
        let newData = {
          text: item.Title,
          image: item.ImageBanner,
          item: item,
        }
        dataArr.push(newData)
      })
    }
    yield put(HomeActions.fetchPromosSuccess(dataArr))
  } else {
    yield put(
      HomeActions.fetchPromosFailure('There was an error while fetching promos informations.')
    )
  }
}

function* fetchNews() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(HomeActions.fetchNewsLoading())

  // Fetch user informations from an API
  const json = yield call(commonService.getNewsRequest)
  if (json) {
    const dataArr = []
    if (json.Data) {
      json.Data.forEach((item) => {
        let newData = {
          text: item.lead,
          image: item.image,
          item: item,
        }
        dataArr.push(newData)
      })
    }
    yield put(HomeActions.fetchNewsSuccess(dataArr))
  } else {
    yield put(HomeActions.fetchNewsFailure('There was an error while fetching news informations.'))
  }
}

export { fetchUser, fetchProducts, fetchPromos, fetchNews }
