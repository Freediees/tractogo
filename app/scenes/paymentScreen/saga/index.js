import { call, put } from 'redux-saga/effects'
import { paymentService } from 'services/paymentService'
import PaymentScreenAction from 'scenes/paymentScreen/store/actions'

function* fetchPaymentMethods() {
  yield put(PaymentScreenAction.fetchPaymentMethodsLoading())
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
        let vaDataTemp = []
        json.Data.forEach((v) => {
          if (v.PaymentMethodName === 'Virtual Account' && v.Status === '1') {
            bankDataTemp = v.details
          } else if (v.PaymentMethodName === 'E-Wallet' && v.Status === '1') {
            vaDataTemp = v.details
          }
        })
        yield put(PaymentScreenAction.changeBankData(bankDataTemp))
        yield put(PaymentScreenAction.changeVaData(vaDataTemp))
        yield put(PaymentScreenAction.fetchPaymentMethodsSuccess(json.Data))
      }
    }
  } catch (error) {
    yield put(PaymentScreenAction.fetchPaymentMethodsFailure(error))
  }
}

export { fetchPaymentMethods }
