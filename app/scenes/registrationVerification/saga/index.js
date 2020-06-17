import { call, put } from 'redux-saga/effects'
import RegisterVerifyAction from '../store/actions'
import { postRegisterVerify, postRetryOTP } from 'services/auth'
import NavigationService from 'services/navigationService'

export function* fetchRegisterVerify({ payload }) {
  try {
    yield put(RegisterVerifyAction.fetchRegisterVerifyLoading())
    const create = yield call(postRegisterVerify, payload)
    // console.log(JSON.stringify(payload))
    console.log({ create })
    if (create.data.Status === 201) {
      yield put(RegisterVerifyAction.fetchRegisterVerifySuccess(create.data))
      yield NavigationService.navigateAndReset('LoginScreen')
    } else {
      yield put(RegisterVerifyAction.fetchRegisterVerifyFailure(create))
    }
  } catch (error) {
    yield put(
      RegisterVerifyAction.fetchRegisterVerifyFailure(
        'Oops! something went wrong! ' + JSON.stringify(error)
      )
    )
  }
}

// export function* sentOTP({ payload }) {
//   try {
//     const create = yield call(postRetryOTP, payload);
//     if (create.data.Status === 200) {

//     }
//   }
// }
