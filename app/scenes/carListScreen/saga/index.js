import { put, call, all } from 'redux-saga/effects'
import CarListScreenAction from 'scenes/carListScreen/store/actions'
import { commonService } from 'services/commonService'
import { orderService } from 'services/orderService'
import NavigationService from 'services/navigationService'
import { Padding, Margin, Row } from 'theme'
import AsyncStorage from '@react-native-community/async-storage'
import Moment from 'moment'
import {
  getUserProfileObject,
} from 'function'
import { SERVICE_ID_WITH_DRIVER, SERVICE_ID_SELF_DRIVE } from 'config'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
function* fetchCityCoverages() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(CarListScreenAction.fetchCityCoveragesLoading())

  // Fetch user informations from an API
  const json = yield call(commonService.getCityCoverage)
  if (json) {
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
      yield put(CarListScreenAction.fetchCityCoveragesSuccess(dataArr))
    }
  } else {
    yield put(
      CarListScreenAction.fetchCityCoveragesFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

function* fetchStocks({ payload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  console.log('cari stock')
  yield put(CarListScreenAction.fetchStocksLoading())

  // Fetch user informations from an API
  const json = yield call(commonService.getStocksRequest, payload.payload)
  if (json) {
    console.log({ json })
    // create the object here
    const dataArr = []
    if (json.Data || json.Data !== '') {
      if (json.Data.length > 0) {
        json.Data.forEach((item) => {
          let newData = {
            cardTitle: item.vehicleTypeDesc,
            seatAmount: item.totalSeat,
            suitcaseAmount: item.totalLuggage,
            transmision: item.isTransmissionManual ? 'MANUAL' : 'AUTOMATIC',
            uriImage: item.vehicleImage,
            priceUnit: ' / Hari',
            totalLabel: ' Total',
            item: item,
            style: {
              flex: 1,
              ...Padding.pt_12,
            },
          }
          dataArr.push(newData)
        })
        console.log('success fetchStock')
        yield put(CarListScreenAction.fetchStocksSuccess(dataArr))
        const searchPayloads = []
        dataArr.forEach(function(v) {
          const searchPricePayload = {
            payload: {
              VehicleTypeId: v.item.vehicleTypeId,
              BusinessUnitId: v.item.businessUnitId,
            },
            stock: v,
          }
          searchPayloads.push(searchPricePayload)
        })
        const newPayload = {
          payload: {
            payload: searchPayloads,
            forceUpdate: payload.forceUpdate,
            changeAlertVisible: payload.changeAlertVisible,
          },
        }
        console.log(searchPayloads)
        yield call(fetchStocksWithPrice, newPayload)
      }
    } else {
      console.log('testtt json data')
      if (json.ErrorMessage) {
        yield put(CarListScreenAction.fetchStocksFailure(json.ErrorMessage))
        yield put(CarListScreenAction.fetchStocksWithPriceComplete())
        payload.forceUpdate()
      }
    }
  } else {
    yield put(
      CarListScreenAction.fetchStocksFailure('There was an error while fetching data informations.')
    )
  }
}

function* fetchStockPrice({ payload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(CarListScreenAction.fetchStockPriceLoading())

  // Fetch user informations from an API
  const json = yield call(orderService.getStockPriceCarRentalRequest, payload)
  if (json) {
    // create the object here
    const dataArr = []
    if (json.Data) {
      json.Data.forEach((item) => {
        let newData = {
          priceData: item.configuration_price_product_retail_details,
        }
        dataArr.push(newData)
      })
    }
    yield put(CarListScreenAction.fetchStockPriceSuccess(dataArr))
  } else {
    yield put(
      CarListScreenAction.fetchStockPriceFailure(
        'There was an error while fetching price informations.'
      )
    )
  }
}

function* fetchStockWithPrice({ payload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html

  // Fetch user informations from an API
  const json = yield call(orderService.getStockPriceCarRentalRequest, payload.payload)
  const user = yield call(getUserProfileObject)
  if (json) {
    // create the object here
    console.log(json)
    const dataArr = []
    const newStock = payload.stock
    let insert = false
    if (json.Data) {
      json.Data.forEach((item) => {
        if (
          item.configuration_price_product_retail_details &&
          item.configuration_price_product_retail_details.length > 0
        ) {
          newStock.priceInformation = item
          newStock.priceData = item.configuration_price_product_retail_details[0]
          newStock.priceAmount = item.configuration_price_product_retail_details[0].BasePrice.replace(
            '.00',
            ''
          )
          console.log('cek diskon')
          if (item.PriceDiscount) {
            console.log('diskon ada')
            if (item.PriceDiscount.type_value === 'percentage') {
              console.log('testtt 12345')
              newStock.discountPercent = parseInt(item.PriceDiscount.value)
              newStock.discountedPrice =
                parseInt(
                  item.configuration_price_product_retail_details[0].BasePrice.replace('.00', '')
                ) -
                (parseInt(item.PriceDiscount.value) / 100) *
                  parseInt(
                    item.configuration_price_product_retail_details[0].BasePrice.replace('.00', '')
                  )
            } else {
              newStock.discountedPrice =
                parseInt(
                  item.configuration_price_product_retail_details[0].BasePrice.replace('.00', '')
                ) - parseInt(item.PriceDiscount.value)
            }
          } else {
            newStock.discountPercent = null
            newStock.discountedPrice = null
          }
          if (payload.payload.ProductServiceId === SERVICE_ID_WITH_DRIVER) {
            newStock.onPress = function() {
              NavigationService.navigate('OrderDetailWithDriverScreen', { item: newStock })
            }
          } else {
            if (user && (user.IsMember === 0 || user.IsMember === '0')) {
              newStock.onPress = function() {
                console.log('test')
                payload.changeAlertVisible(true)
              }
            } else {
              newStock.onPress = function() {
                NavigationService.navigate('OrderDetailSelfDriveScreen', { item: newStock })
              }
            }
          }
          dataArr.push(newStock)
          insert = true
        }
      })
    }
    if (insert) yield put(CarListScreenAction.fetchStocksWithPriceSuccess(newStock))
  } else {
    yield put(
      CarListScreenAction.fetchStocksWithPriceFailure(
        'There was an error while fetching price informations.'
      )
    )
  }
}

function* fetchStocksWithPrice({ payload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Fetch user informations from an API
  const Duration = yield AsyncStorage.getItem('rentalPackage')
  const day = yield AsyncStorage.getItem('rentalDuration')
  const CityId = yield AsyncStorage.getItem('cityId')
  const MsProductId = yield AsyncStorage.getItem('prdID')
  const StartDateJSON = yield AsyncStorage.getItem('selectedDate')
  const EndDateJSON = yield AsyncStorage.getItem('selectedEndDate')
  const selectedCityJSON = yield AsyncStorage.getItem('selectedCity')
  const ProductServiceId = yield AsyncStorage.getItem('productServiceId')
  const StartDate = JSON.parse(StartDateJSON)
  const EndDate = JSON.parse(EndDateJSON)
  const City = JSON.parse(selectedCityJSON)
  yield put(CarListScreenAction.fetchStocksWithPriceLoading())
  let newDuration = Duration
  if (ProductServiceId === SERVICE_ID_SELF_DRIVE) {
    newDuration = '24'
  }
  yield all(
    payload.payload.map((v, i) => {
      v.payload.Duration = newDuration
      v.payload.CityId = CityId
      v.payload.MsProductId = MsProductId
      v.payload.StartDate = Moment(StartDate).format('YYYY-MM-DD 00:00:00')
      v.payload.EndDate = Moment(new Date(EndDate)).format('YYYY-MM-DD 00:00:00')
      v.payload.BranchId = City.item.BranchId
      v.payload.ProductServiceId = ProductServiceId
      v.stock.duration = parseInt(day)
      v.stock.priceUnit = ` / ${Duration} Hour`
      const payloadObject = {
        payload: {
          payload: v.payload,
          stock: v.stock,
          changeAlertVisible: payload.changeAlertVisible,
        },
      }
      console.log(payloadObject.payload)

      return call(fetchStockWithPrice, payloadObject)
    })
  )
  yield put(CarListScreenAction.fetchStocksWithPriceComplete())
  payload.forceUpdate()
}

export { fetchCityCoverages, fetchStocks, fetchStockPrice, fetchStocksWithPrice }
