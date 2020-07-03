import { call, put } from 'redux-saga/effects'
import RegisterVerifyAction from '../store/actions'
import { postRegisterVerify, postRetryOTP } from 'services/auth'
import { addNavCounter } from 'function'
import NavigationService from 'services/navigationService'

export function* fetchRegisterVerify({ payload }) {
  yield put(RegisterVerifyAction.fetchRegisterVerifyLoading())
  const json = yield call(postRegisterVerify, payload.payload)

  if (json) {
    if (json.Error) {
      yield put(RegisterVerifyAction.fetchRegisterVerifyFailure(json.Error))
    } else {
      if (json.data) {
        if (json.status === 201) {
          yield put(RegisterVerifyAction.fetchRegisterVerifySuccess(json.data))
          alert('Registration Success')
          if (payload.callback) {
            addNavCounter()
            yield NavigationService.navigateAndReset('LoginScreen', {
              loginAction: payload.callback,
            })
          } else {
            yield NavigationService.navigateAndReset('LoginScreen')
          }
        } else {
          yield put(
            RegisterVerifyAction.fetchRegisterVerifyFailure(
              'There was an error while fetching informations.'
            )
          )
        }
      } else {
        yield put(
          RegisterVerifyAction.fetchRegisterVerifyFailure(
            'There was an error while fetching informations.'
          )
        )
      }
    }
  } else {
    yield put(
      RegisterVerifyAction.fetchRegisterVerifyFailure(
        'There was an error while fetching informations.'
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
