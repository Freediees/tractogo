import { call, put } from 'redux-saga/effects'
import { orderService } from 'services/orderService'
import CartScreenAction from 'scenes/cartScreen/store/actions'
import AsyncStorage from '@react-native-community/async-storage'
import NavigationService from 'services/navigationService'
import Moment from 'moment'
import {
  CAR_RENTAL,
  AIRPORT_TRANSFER,
  BUS_RENTAL,
  SERVICE_ID_SELF_DRIVE,
  SERVICE_ID_WITH_DRIVER,
} from 'config'

function* fetchCartDetails() {
  yield put(CartScreenAction.fetchCartDetailsLoading())
  try {
    const json = yield call(orderService.getCartDetailsRequest)
    if (json) {
      console.log(json)
      if (json.Data) {
        const dataArr = []
        yield AsyncStorage.setItem('buID', json.Data[0].BusinessUnitId)
        json.Data[0].cart_details.forEach(async (item) => {
          let carRentalLabel = ''
          console.log('abcdef')
          if (item.MsProductId === CAR_RENTAL) {
            carRentalLabel = 'Sewa Mobil'
          } else if (item.MsProductId === AIRPORT_TRANSFER) {
            carRentalLabel = 'Transfer Bandara'
          } else if (item.MsProductId === BUS_RENTAL) {
            carRentalLabel = 'Sewa Bus'
          }
          let rentalDriverLabel = ''
          if (item.MsProductServiceId === SERVICE_ID_WITH_DRIVER) {
            rentalDriverLabel = 'Dengan Sopir'
          } else if (item.MsProductServiceId === SERVICE_ID_SELF_DRIVE) {
            rentalDriverLabel = 'Tanpa Sopir'
          }
          console.log('abcdef1234')
          let newData = {
            cardTitle: item.UnitTypeName || 'TOYOTA CARS',
            seatAmount: item.TotalSeat || 0,
            suitcaseAmount: item.TotalLuggage || 0,
            transmision: item.IsTransmissionManual === '1' ? 'MANUAL' : 'AUTOMATIC',
            uriImage: item.VehicleImage,
            priceUnit: ' / Hari',
            totalLabel: ' Total',
            priceAmount: parseInt(item.SubTotal),
            id: item.Id,
            item: item,
            carRentalLabel: carRentalLabel,
            rentalDriverLabel: rentalDriverLabel,
            placeLabel: item.CityName,
            discountedPrice: null,
            discountPercent: null,
            dateLabel: `${Moment(new Date(item.StartDate)).format('DD')} - ${Moment(
              new Date(item.EndDate)
            ).format('DD MMMM YYYY')}`,
            selected: false,
            errors: [],
          }
          dataArr.push(newData)
        })
        console.log('abcdef1234567')
        const cartInfos = json.Data[0]
        cartInfos.CartDetail = cartInfos.cart_details
        cartInfos.CartDetail.forEach(async (v) => {
          console.log('aaaaaa')
          v.Passengers = v.cart_passengers
          v.cart_drop_locations.forEach(async (y) => {
            y.PriceExpedition = y.expedition_cart_drop_location
            delete y.expedition_cart_drop_location
          })
          v.cart_pickup_locations.forEach(async (y) => {
            y.PriceExpedition = y.expedition_cart_pick_up_location
            delete y.expedition_cart_pick_up_location
          })
          v.StartDate = JSON.parse(v.StartDateArray)
          v.EndDate = JSON.parse(v.EndDateArray)
          v.FlightDetail = v.cart_flight_details || []
          v.DropLocation = v.cart_drop_locations || []
          v.PickupLocation = v.cart_pickup_locations || []
          v.ReservationPromo = v.cart_promos || []
          v.ReservationExtras =
            v.cart_extras && v.cart_extras[0] ? v.cart_extras[0].cart_extras_details : []
          v.ReservationExtras.forEach((y) => {
            y.ExtrasId = y.CartExtrasId
            delete y.CartExtrasId
          })

          delete v.StartDateArray
          delete v.EndDateArray
          delete v.cart_flight_details
          delete v.cart_extras
          delete v.cart_passengers
          delete v.cart_drop_locations
          delete v.cart_pickup_locations
          delete v.cart_promos
          delete v.cart_reservation_extras
        })

        delete cartInfos.cart_details
        console.log('testttt12345')
        console.log(cartInfos)
        yield AsyncStorage.setItem('cartInfos', JSON.stringify(cartInfos))
        const newPayload = {
          payload: {
            payload: cartInfos,
            data: dataArr,
          },
        }
        console.log(newPayload)
        yield call(checkoutValidationCart, newPayload)
      }
    }
  } catch (error) {
    yield put(CartScreenAction.fetchCartDetailsFailure(error))
  }
}

function* deleteCartDetails({ payload }) {
  yield put(CartScreenAction.deleteCartDetailsLoading())
  try {
    const json = yield call(orderService.deleteCartDetails, payload)
    if (json) {
      console.log(json)
      if (json.Data) {
        yield put(CartScreenAction.deleteCartDetailsSuccess('' + json.Data))
      }
    }
  } catch (error) {
    yield put(CartScreenAction.deleteCartDetailsFailure(error))
  }
}

function* checkoutValidation({ payload }) {
  yield put(CartScreenAction.checkoutValidationLoading())

  // Fetch user informations from an API
  const json = yield call(orderService.postCheckoutValidation, payload)
  if (json) {
    // create the object here
    if (json) {
      console.log(json)
      if (json.Data === false && json.ErrorMessage !== null && json.ErrorMessage !== '') {
        yield put(CartScreenAction.checkoutValidationFailure(json.ErrorMessage))
      } else {
        yield put(CartScreenAction.checkoutValidationSuccess('Success'))
      }
    }
  } else {
    yield put(
      CartScreenAction.checkoutValidationFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

function* checkoutValidationCart({ payload }) {
  yield put(CartScreenAction.checkoutValidationLoading())

  // Fetch user informations from an API
  const json = yield call(orderService.postCheckoutValidation, payload.payload)
  if (json) {
    // create the object here
    console.log('validate cart')
    console.log(json)
    console.log(payload)
    if (json.Data === false) {
      if (json.ErrorMessage !== null && json.ErrorMessage !== '') {
        console.log('try')
        yield put(CartScreenAction.checkoutValidationFailure(json.ErrorMessage))
        if (json.ErrorMessage) {
          console.log(json.ErrorMessage)
          const tempCarts = payload.data
          if (json.ErrorMessage.backDateError) {
            const error = json.ErrorMessage.backDateError
            if (error && error.length > 0) {
              error.forEach((v) => {
                if (!tempCarts[v.index].errors.includes(v.message)) {
                  tempCarts[v.index].errors.push(v.message)
                }
              })
            }
          }
          if (json.ErrorMessage.discountError) {
            const error = json.ErrorMessage.discountError
            if (error && error.length > 0) {
              error.forEach((v) => {
                if (!tempCarts[v.index].errors.includes(v.message)) {
                  tempCarts[v.index].errors.push(v.message)
                }
              })
            }
          }
          if (json.ErrorMessage.priceError) {
            const error = json.ErrorMessage.priceError
            if (error && error.length > 0) {
              error.forEach((v) => {
                if (!tempCarts[v.index].errors.includes(v.message)) {
                  tempCarts[v.index].errors.push(v.message)
                }
              })
            }
          }
          if (json.ErrorMessage.stockError) {
            const error = json.ErrorMessage.stockError
            if (error && error.length > 0) {
              error.forEach((v) => {
                if (!tempCarts[v.index].errors.includes(v.message)) {
                  tempCarts[v.index].errors.push(v.message)
                }
              })
            }
          }
          yield put(CartScreenAction.fetchCartDetailsSuccess(tempCarts))
        }
      }
    } else {
      yield put(CartScreenAction.fetchCartDetailsSuccess(payload.data))
      yield put(CartScreenAction.checkoutValidationSuccess('Success'))
    }
  } else {
    yield put(
      CartScreenAction.checkoutValidationFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

function* navigateToCheckout({ payload }) {
  const json = yield AsyncStorage.getItem('cartInfos')
  yield NavigationService.navigate('CheckoutScreen', { cartItem: JSON.parse(json) })
}

export {
  fetchCartDetails,
  deleteCartDetails,
  navigateToCheckout,
  checkoutValidation,
  checkoutValidationCart,
}
