import { call, put } from 'redux-saga/effects'
import LocationPickScreenSelfDriveAction from '../store/actions'
import { localStorageEncrypt } from 'function/storage'
import { orderService } from 'services/orderService'
import { commonService } from 'services/commonService'
import { round } from 'function/math'

function* fetchDistance({ payload }) {
  yield put(LocationPickScreenSelfDriveAction.fetchDistanceLoading())

  // Fetch user informations from an API
  const json = yield call(commonService.getDistanceMatrixRequest, payload.data)
  if (json) {
    // create the object here
    const dataArr = []
    console.log(json)
    if (json) {
      const newPayload = {
        distance: round(json.data.rows[0].elements[0].distance.value / 1000, 1),
      }
      const data = yield call(orderService.getPriceExpedition, newPayload)
      if (data && data.Data) {
        const newData = {
          Id: data.Data.Id,
          Distance: newPayload.distance,
          BasePrice: data.Data.BasePrice,
          TotalPrice: data.Data.Price,
        }
        payload.items[0].price = newData.TotalPrice
        payload.items[0].priceExpedition = []
        payload.items[0].priceExpedition.push(newData)
        payload.refreshItems(payload.items)
        yield put(LocationPickScreenSelfDriveAction.fetchDistanceSuccess(newData))
      }
    }
  } else {
    yield put(
      LocationPickScreenSelfDriveAction.fetchDistanceFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

function* fetchPriceExpedition({ payload }) {
  yield put(LocationPickScreenSelfDriveAction.fetchPriceExpeditionLoading())

  // Fetch user informations from an API
  if (json) {
    // create the object here
    const dataArr = []
    console.log(json)
    if (json.Data) {
      yield put(LocationPickScreenSelfDriveAction.fetchPriceExpeditionSuccess(dataArr))
    }
  } else {
    yield put(
      LocationPickScreenSelfDriveAction.fetchPriceExpeditionFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

export { fetchDistance, fetchPriceExpedition }
