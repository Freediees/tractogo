import { put, call } from 'redux-saga/effects'
import CarFilterScreenAction from 'scenes/filter/store/actions'
import { commonService } from 'services/commonService'
import { Padding, Margin, Row } from 'theme'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
function* fetchCityCoverages() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(CarFilterScreenAction.fetchCityCoveragesLoading())

  // Fetch user informations from an API
  const json = yield call(commonService.getCityCoverage)
  console.log('fetching data car rental')
  if (json) {
    console.log({ json })
    // create the object here
    const dataArr = []
    if (json.Data) {
      json.Data.forEach((item) => {
        let newData = {
          cityName: item.MsCityName,
          item: item,
        }
        dataArr.push(newData)
      })
      console.log(dataArr)
      yield put(CarFilterScreenAction.fetchCityCoveragesSuccess(dataArr))
    }
  } else {
    yield put(
      CarFilterScreenAction.fetchCityCoveragesFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

function* fetchRentDurations() {
  yield put(CarFilterScreenAction.fetchRentDurationsLoading())

  // Fetch user informations from an API
  const json = yield call(commonService.getRentalDuration)
  if (json) {
    if (json.Data) {
      // create the object here
      yield put(CarFilterScreenAction.fetchRentDurationsSuccess(json.Data))
    }
  } else {
    yield put(
      CarFilterScreenAction.fetchRentDurationsFailure(
        'There was an error while fetching rent durations informations.'
      )
    )
  }
}

function* fetchAdjustmentRetails() {
  yield put(CarFilterScreenAction.fetchAdjustmentRetailsLoading())

  // Fetch user informations from an API
  const json = yield call(commonService.getAdjustmentRetails)
  if (json) {
    if (json.Data) {
      // create the object here
      yield put(CarFilterScreenAction.fetchAdjustmentRetailsSuccess(json.Data))
    }
  } else {
    yield put(
      CarFilterScreenAction.fetchAdjustmentRetailsFailure(
        'There was an error while fetching adjustment retails informations.'
      )
    )
  }
}

export { fetchCityCoverages, fetchRentDurations, fetchAdjustmentRetails }
