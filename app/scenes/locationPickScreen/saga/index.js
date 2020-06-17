import { put, call, all } from 'redux-saga/effects'
import LocationPickScreenAction from 'scenes/locationPickScreen/store/actions'
import { commonService } from 'services/commonService'
import NavigationService from 'services/navigationService'
import { Padding, Margin, Row } from 'theme'
import AsyncStorage from '@react-native-community/async-storage'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
function* fetchPredictions({ payload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(LocationPickScreenAction.fetchPredictionsLoading())

  // Fetch user informations from an API
  const json = yield call(commonService.getAddressRequest, payload)
  if (json) {
    // create the object here
    if (json.data.predictions && json.data.predictions.length > 0) {
      yield put(LocationPickScreenAction.fetchPredictionsSuccess(json.data.predictions.slice(0, 3)))
    }
  } else {
    yield put(
      LocationPickScreenAction.fetchPredictionsFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

function* fetchPlaceDetail({ payload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(LocationPickScreenAction.fetchPlaceDetailLoading())

  // Fetch user informations from an API
  const data = {
    placeid: payload.placeid
  }
  console.log(payload)
  const json = yield call(commonService.getAddressDetailRequest, data)
  if (json) {
    console.log({ json })
    // create the object here
    if (json.data.result) {
      const result = json.data.result
      const tempItem = payload.items
      tempItem[payload.index].location.name = result.name
      tempItem[payload.index].location.lat = result.geometry.location.lat
      tempItem[payload.index].location.lon = result.geometry.location.lng
      payload.changeItems(tempItem)
      yield put(LocationPickScreenAction.fetchPlaceDetailSuccess(json.data.result))
    }
  } else {
    yield put(
      LocationPickScreenAction.fetchPlaceDetailFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

export { fetchPredictions, fetchPlaceDetail }
