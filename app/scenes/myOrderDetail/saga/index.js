import { call, put } from 'redux-saga/effects'
import { orderService } from 'services/orderService'
import MyOrderDetailAction from 'scenes/myOrderDetail/store/actions'

function* fetchPaymentDetail(reservasiId) {
  yield put(MyOrderDetailAction.fetchPaymentDetailLoading())
  try {
    const json = yield call(orderService.getOrdersPaymentRequest, reservasiId)
    if (json) {
      console.log(`test` + json.Data)
      if (json.Data) {
        yield put(MyOrderDetailAction.fetchPaymentDetailSuccess(json.Data))
      }
    }
  } catch (error) {
    yield put(MyOrderDetailAction.fetchPaymentDetailFailure(error))
  }
}

export { fetchPaymentDetail }
