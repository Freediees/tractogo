import { call, put } from 'redux-saga/effects'
import AirportFilterScreenAction from 'scenes/airportFilterScreen/store/actions'
import { commonService } from 'services/commonService'

function* fetchAirports() {
  yield put(AirportFilterScreenAction.fetchAirportsLoading())
  try {
    // panggil method service di sini
    const json = yield call(commonService.getMasterAirport)
    // const json = null
    if (json) {
      console.log({ json })
      const dataArr = []
      if (json.Data) {
        json.Data.forEach((item) => {
          let newData = {
            cityName: `${item.CityName} (${item.Airport})`,
            item: item,
          }
          dataArr.push(newData)
        })
        yield put(AirportFilterScreenAction.fetchAirportsSuccess(dataArr))
      }
    }
  } catch (error) {
    console.log(error)
    yield put(AirportFilterScreenAction.fetchAirportsFailure(error))
  }
}

function* fetchAirportCoverages(airportCode) {
  yield put(AirportFilterScreenAction.fetchAirportCoveragesLoading())
  try {
    // panggil method service di sini
    const json = yield call(commonService.getAirportCoverage, airportCode)
    // const json = null
    if (json) {
      var dataArr = []
      if (json.Data) {
        json.Data.forEach((item) => {
          let newData = {
            cityName: item.CityName,
            item: item,
          }
          dataArr.push(newData)
        })
        yield put(AirportFilterScreenAction.fetchAirportCoveragesSuccess(dataArr))
      }
    }
  } catch (error) {
    console.log(error)
    yield put(AirportFilterScreenAction.fetchAirportCoveragesFailure(error))
  }
}

function* fetchAirportPlaceDetail({ payload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(AirportFilterScreenAction.fetchAirportPlaceDetailLoading())

  // Fetch user informations from an API
  const data = {
    placeid: payload.placeid,
  }
  console.log(payload)
  const json = yield call(commonService.getAddressDetailRequest, data)
  if (json) {
    console.log('placeDetail')
    console.log({ json })
    // create the object here
    if (json.data.result) {
      const result = json.data.result
      const tempItem = payload.items
      tempItem.location.name = result.name
      tempItem.location.lat = result.geometry.location.lat
      tempItem.location.lon = result.geometry.location.lng
      payload.changeItems(tempItem)
      yield put(AirportFilterScreenAction.fetchAirportPlaceDetailSuccess(json.data.result))
    }
  } else {
    yield put(
      AirportFilterScreenAction.fetchAirportPlaceDetailFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

function* fetchAirportPlaceCoordinate(payload) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(AirportFilterScreenAction.fetchAirportPlaceCoordinateLoading())
  console.log('fetchAirportPlaceCoordinate payload ', payload.payload)
  const json = yield call(commonService.getPlaceCoordinate, payload.payload)
  if (json) {
    console.log('coordinate')
    console.log({ json })
    // create the object here
    if (json.data) {
      yield put(AirportFilterScreenAction.fetchAirportPlaceCoordinateSuccess(json.data.candidates))
    }
  } else {
    yield put(
      AirportFilterScreenAction.fetchAirportPlaceCoordinateFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

function* fetchDistanceBetweenOriginAndDestination(payload) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(AirportFilterScreenAction.fetchDistanceBetweenOriginAndDestinationLoading())
  const json = yield call(commonService.getDistanceMatrixRequestByAddress, payload.payload)
  if (json) {
    // create the object here
    if (json.data && json.data.destination_addresses[0] !== '') {
      yield put(
        AirportFilterScreenAction.fetchDistanceBetweenOriginAndDestinationSuccess(json.data)
      )
    }
  } else {
    yield put(
      AirportFilterScreenAction.fetchDistanceBetweenOriginAndDestinationFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

function* fetchZone(payload) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(AirportFilterScreenAction.fetchZoneLoading())
  // console.log('payload zone', payload)
  const json = yield call(commonService.getZone, payload.payload)
  if (json) {
    //   console.log('zone')
    //   console.log({ json })
    // create the object here
    if (json.Data) {
      yield put(AirportFilterScreenAction.fetchZoneSuccess(json.Data))
    }
  } else {
    yield put(
      AirportFilterScreenAction.fetchZoneFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

export {
  fetchAirports,
  fetchAirportCoverages,
  fetchAirportPlaceDetail,
  fetchAirportPlaceCoordinate,
  fetchDistanceBetweenOriginAndDestination,
  fetchZone,
}
