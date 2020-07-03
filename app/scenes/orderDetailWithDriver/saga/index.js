import { put, call, all } from 'redux-saga/effects'
import OrderDetailWithDriverAction from 'scenes/orderDetailWithDriver/store/actions'
import { orderService } from 'services/orderService'
import NavigationService from 'services/navigationService'
import { Padding, Margin, Row } from 'theme'
import AsyncStorage from '@react-native-community/async-storage'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
function* fetchExtras({ payload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(OrderDetailWithDriverAction.fetchExtrasLoading())

  console.log(payload)
  // Fetch user informations from an API
  const json = yield call(orderService.getExtrasRequest, payload.payload)
  if (json) {
    // create the object here
    const dataArr = []
    if (json.Data) {
      json.Data.forEach((item) => {
        let newData = {
          name: item.extras.Name,
          value:
            item.extras.Name === 'Add Hours'
              ? parseInt(
                  payload.item.priceInformation.configuration_price_product_retail_details[0].AdditionalPrice.replace(
                    '.00',
                    ''
                  )
                )
              : parseInt(item.Price.replace('.00', '')),
          count: 0,
          total: 0,
          type: item.extras.ValueType,
          item: item,
          stockType: item.extras.StockType,
          availability: item.Availability,
          unit: item.extras.ValueType === 'boolean' ? 'Hari' : 'Item',
        }
        if (item.Status === '1') {
          dataArr.push(newData)
        }
      })
      if (payload.item.priceInformation.PriceDiscount) {
        if (payload.item.priceInformation.PriceDiscount.category_name) {
          dataArr.push({
            name: payload.item.priceInformation.PriceDiscount.category_name,
            value: payload.item.priceAmount - payload.item.discountedPrice,
            unit: 'Item',
            count: 1,
            total: (payload.item.priceAmount - payload.item.discountedPrice) * -1 * parseInt(payload.item.duration),
            type: 'discount',
            stockType: '0',
            availability: 0,
          })
        }
      }
    }
    yield put(OrderDetailWithDriverAction.changeAdditionalItems(dataArr))
    yield put(OrderDetailWithDriverAction.fetchExtrasSuccess(dataArr))
  } else {
    yield put(
      OrderDetailWithDriverAction.fetchExtrasFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

function* addCart({ payload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(OrderDetailWithDriverAction.addCartLoading())

  // Fetch user informations from an API
  const json = yield call(orderService.postAddCart, payload)
  if (json) {
    // create the object here
    if (json) {
      if (json.ErrorMessage !== null && json.ErrorMessage !== '') {
        yield put(OrderDetailWithDriverAction.addCartFailure(json.ErrorMessage))
      } else {
        console.log(json.Data)
        if (json.Data) {
          console.log('testttt123123')
          yield AsyncStorage.setItem('cartHeaderId', '' + json.Data.CartHeaderId)
        }
        yield put(OrderDetailWithDriverAction.addCartSuccess('Success adding to cart'))
      }
    }
  } else {
    yield put(
      OrderDetailWithDriverAction.addCartFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

function* navigateHome() {
  yield NavigationService.navigateAndReset('Home')
  yield NavigationService.navigateAndReset('Cart')
}

export { fetchExtras, addCart, navigateHome }
