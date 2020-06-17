import { call, put } from 'redux-saga/effects'
import LoginVerifyAction from '../store/actions'
import { localStorageEncrypt } from 'function/storage'
import { postLoginVerify } from 'services/auth'
import { NavigationActions } from 'react-navigation'
import * as NavigationAction from 'services/navigationService'

function* fetchLoginVerify({ payload }) {
  try {
    const create = yield call(postLoginVerify, payload)
    // console.log(JSON.stringify(payload))
    console.log(create)
    if (create.data && create.data.Status === 200) {
      yield put(LoginVerifyAction.fetchLoginVerifySuccess(create.data))
      yield localStorageEncrypt('user', create.data.Data)
      yield localStorageEncrypt('token', create.data.token)
      yield NavigationAction.default.navigate('routeTwo')
    } else {
      yield put(LoginVerifyAction.fetchLoginVerifyFailure(create))
    }
  } catch (error) {
    yield put(
      LoginVerifyAction.fetchLoginVerifyFailure(
        'Oops! something went wrong! ' + JSON.stringify(error)
      )
    )
  }
}

export { fetchLoginVerify }
