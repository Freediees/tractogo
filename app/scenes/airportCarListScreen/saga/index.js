import { put, call, all } from 'redux-saga/effects'
import AirportCarListScreenAction from 'scenes/airportCarListScreen/store/actions'
import { commonService } from 'services/commonService'
import { orderService } from 'services/orderService'
import { ONE_WAY, AIRPORT_TRANSFER } from 'config'
import { Padding, Margin, Row } from 'theme'
import AsyncStorage from '@react-native-community/async-storage'
import Moment from 'moment'
import NavigationService from 'services/navigationService'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */

function* fetchAirportStocks({ payload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  console.log('cari airport stock')
  yield put(AirportCarListScreenAction.fetchAirportStocksLoading())
  // console.log({ payload })
  // Fetch user informations from an API
  const json = yield call(commonService.getStocksRequest, payload.payload)
  if (json) {
    console.log({ json })
    // create the object here
    const dataArr = []
    if (json.Data) {
      json.Data.forEach((item) => {
        let newData = {
          cardTitle: item.vehicleTypeDesc,
          seatAmount: item.totalSeat,
          suitcaseAmount: item.totalLuggage,
          transmision: null,
          uriImage: item.vehicleImage,
          priceUnit: ' / Trip',
          totalLabel: ' Total',
          item: item,
          style: {
            flex: 1,
            ...Padding.pt_12,
          },
        }
        dataArr.push(newData)
      })
      yield put(AirportCarListScreenAction.fetchAirportStocksSuccess(dataArr))
      const searchPayloads = []
      dataArr.forEach(function(v) {
        const searchPricePayload = {
          payload: {
            VehicleTypeId: v.item.vehicleTypeId,
            BusinessUnitId: v.item.businessUnitId,
            MsAirportCode: payload.reservationDetails.airport.Code,
            MsZoneId: payload.reservationDetails.zone.MsZoneId,
            MsProductId: AIRPORT_TRANSFER,
            ProductServiceId: ONE_WAY,
            StartDate: payload.payload.StartDate,
            EndDate: payload.payload.EndDate,
          },
          stock: v,
        }
        searchPayloads.push(searchPricePayload)
      })
      const newPayload = {
        payload: {
          payload: searchPayloads,
          reservationDetails: payload.reservationDetails,
          isFromAirport: payload.isFromAirport,
          forceUpdate: payload.forceUpdate,
        },
      }
      console.log({ newPayload })
      yield call(fetchAirportStocksWithPrice, newPayload)
    }
  } else {
    yield put(
      AirportCarListScreenAction.fetchAirportStocksFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

function* fetchAirportStocksWithPrice({ payload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Fetch user informations from an API
  // console.log('fetchAirportStocksWithPrice payload', payload)

  yield put(AirportCarListScreenAction.fetchAirportStocksWithPriceLoading())
  yield all(
    payload.payload.map((v, i) => {
      const payloadObject = {
        payload: {
          payload: v.payload,
          stock: v.stock,
          reservationDetails: payload.reservationDetails,
          isFromAirport: payload.isFromAirport,
        },
      }
      console.log('fetching price')
      console.log(payloadObject.payload)

      return call(fetchAirportStockWithPrice, payloadObject)
    })
  )
  yield put(AirportCarListScreenAction.fetchAirportStocksWithPriceComplete())
  payload.forceUpdate()
}

function* fetchAirportStockWithPrice({ payload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html

  // Fetch user informations from an API
  console.log('fetchAirportStockWithPrice', payload)
  const json = yield call(orderService.getStockPriceCarRentalRequest, payload.payload)
  if (json) {
    // create the object here
    console.log({ json })
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
          // if (payload.payload.ProductServiceId === SERVICE_ID_WITH_DRIVER) {
          //   newStock.onPress = function() {
          //     NavigationService.navigate('OrderDetailWithDriverScreen', { item: newStock })
          //   }
          // } else {
          newStock.onPress = function() {
            NavigationService.navigate('OrderDetailAirportScreen', {
              item: newStock,
              isFromAirport: payload.isFromAirport,
              reservationDetails: payload.reservationDetails,
            })
          }
          // }
          dataArr.push(newStock)
          insert = true
        }
      })
    }
    if (insert) yield put(AirportCarListScreenAction.fetchAirportStocksWithPriceSuccess(newStock))
  } else {
    yield put(
      AirportCarListScreenAction.fetchAirportStocksWithPriceFailure(
        'There was an error while fetching price informations.'
      )
    )
  }
}

function* fetchAirportStockPrice({ payload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(AirportCarListScreenAction.fetchAirportStockPriceLoading())

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
    yield put(AirportCarListScreenAction.fetchAirportStockPriceSuccess(dataArr))
  } else {
    yield put(
      AirportCarListScreenAction.fetchAirportStockPriceFailure(
        'There was an error while fetching price informations.'
      )
    )
  }
}

export {
  fetchAirportStocks,
  fetchAirportStockPrice,
  fetchAirportStocksWithPrice,
  fetchAirportStockWithPrice,
}
