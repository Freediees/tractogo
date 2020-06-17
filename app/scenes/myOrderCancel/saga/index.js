import { call, put } from 'redux-saga/effects'
import { orderService } from 'services/orderService'
import OrderCancelAction from 'scenes/myOrderCancel/store/actions'

function* fetchMasterReason() {
  yield put(OrderCancelAction.orderCancelLoading())

  try {
    const json = yield call(orderService.getMasterReason)
    //console.log(json)

    if (json.Status === 200) {
      alert('done')
      yield put(OrderCancelAction.orderCancelSuccess(json.Data))
    } else {
      // alert("error")
      yield put(OrderCancelAction.orderCancelFailure(json.data.ErrorMessage))
    }
  } catch (error) {
    console.log('error')
    yield put(
      OrderCancelAction.orderCancelFailure('Oops! something went wrong! ' + JSON.stringify(error))
    )
  }
}

export { fetchMasterReason }
