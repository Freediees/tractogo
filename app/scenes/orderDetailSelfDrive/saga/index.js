import { put, call } from 'redux-saga/effects'
import OrderDetailSelfDriveAction from 'scenes/orderDetailSelfDrive/store/actions'
import { orderService } from 'services/orderService'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
function* fetchExtrasSelfDrive({ payload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(OrderDetailSelfDriveAction.fetchExtrasSelfDriveLoading())

  console.log(payload)
  // Fetch user informations from an API
  const json = yield call(orderService.getExtrasRequest, payload.payload)
  if (json) {
    // create the object here
    const dataArr = []
    if (json.Data) {
      console.log(json.Data)
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
              : parseInt(item.Price ? item.Price.replace('.00', '') : 0),
          count: 0,
          total: 0,
          type: item.extras.ValueType,
          item: item,
          stockType: item.extras.StockType,
          availability: item.Availability,
          unit: item.extras.ValueType === 'boolean' ? 'Hari' : 'Item',
        }
        if (item.Status === '1') {
          if (newData.item.Price === null) {
            newData.item.Price = 0
          }
          dataArr.push(newData)
        }
      })
      if (
        payload.item.priceInformation.PriceDiscount &&
        payload.item.priceInformation.PriceDiscount.category_name
      ) {
        dataArr.push({
          name: payload.item.priceInformation.PriceDiscount.category_name,
          value: payload.item.priceAmount - payload.item.discountedPrice,
          unit: 'Item',
          count: 1,
          total:
            (payload.item.priceAmount - payload.item.discountedPrice) *
            -1 *
            parseInt(payload.item.duration),
          type: 'discount',
          stockType: '0',
          availability: 0,
        })
      }
      dataArr.push({
        name: 'Expedition Pick Up',
        value: 0,
        unit: 'Item',
        count: 0,
        total: 0,
        type: '-',
        stockType: '0',
        availability: 0,
      })
      dataArr.push({
        name: 'Expedition Drop Off',
        value: 0,
        unit: 'Item',
        count: 0,
        total: 0,
        type: '-',
        stockType: '0',
        availability: 0,
      })
      console.log(dataArr)
    }
    yield put(OrderDetailSelfDriveAction.changeAdditionalItems(dataArr))
    yield put(OrderDetailSelfDriveAction.fetchExtrasSelfDriveSuccess(dataArr))
  } else {
    yield put(
      OrderDetailSelfDriveAction.fetchExtrasSelfDriveFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

export { fetchExtrasSelfDrive }
