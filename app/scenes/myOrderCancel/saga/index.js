import { call, put } from 'redux-saga/effects'
import { orderService } from 'services/orderService'
import { paymentService } from 'services/paymentService'
import OrderCancelAction from 'scenes/myOrderCancel/store/actions'
import NavigationService from 'services/navigationService'

function* fetchMasterReason() {
  yield put(OrderCancelAction.orderCancelLoading())

  try {
    const json = yield call(orderService.getMasterReason)
    console.log(json)

    const reasons = []
    if (json.Data) {
      json.Data.forEach((v) => {
        const newData = {
          label: v.Description,
          item: v,
          checked: false,
        }
        reasons.push(newData)
      })
      yield put(OrderCancelAction.orderCancelSuccess(reasons))
    }
  } catch (error) {
    console.log('error')
    yield put(
      OrderCancelAction.orderCancelFailure('Oops! something went wrong! ' + JSON.stringify(error))
    )
  }
}

function* fetchBankData() {
  yield put(OrderCancelAction.fetchBankDataLoading())
  try {
    const json = yield call(paymentService.getPaymentMethods)
    if (json) {
      console.log(json)
      if (json.Data) {
        console.log(json.Data)
        json.Data.forEach((v) => {
          if (v.details) {
            v.details.forEach((y) => {
              y.PaymentMethodId = v.PaymentMethodId
              y.PaymentMethodName = v.PaymentMethodName
              y.bankid = y.MsBankCode
              y.imageUri = y.Images
            })
          }
        })
        let bankDataTemp = []
        json.Data.forEach((v) => {
          if (v.PaymentMethodName === 'Virtual Account' && v.Status === '1') {
            v.details.forEach((y) => {
              bankDataTemp.push(y.MsBankName)
            })
          }
        })
        yield put(OrderCancelAction.fetchBankDataSuccess(bankDataTemp))
      }
    }
  } catch (error) {
    yield put(OrderCancelAction.fetchBankDataFailure(error))
  }
}

function* postReservationCancel({ payload }) {
  console.log('post cancel')
  yield put(OrderCancelAction.postReservationCancelLoading())
  console.log('test post cancel')
  const json = yield call(orderService.postReservationCancel, payload)
  if (json) {
    alert('Order has been Cancelled')
    yield put(OrderCancelAction.postReservationCancelSuccess(json))
    NavigationService.navigateAndResetNoParam('MainScreen')
  } else {
    yield put(OrderCancelAction.postReservationCancelFailure('Error'))
  }
}

export { fetchMasterReason, fetchBankData, postReservationCancel }
