import { call, put } from 'redux-saga/effects'
import LoginVerifyAction from '../store/actions'
import { localStorageEncrypt } from 'function/storage'
import { postLoginVerify } from 'services/auth'
import { NavigationActions } from 'react-navigation'
import { addNavCounter } from 'function'
import * as NavigationAction from 'services/navigationService'
import { commonService } from 'services/commonService'

function* fetchLoginVerify({ payload }) {
  console.log('masuk function')
  console.log('payload login verification : ', payload)
  yield put(LoginVerifyAction.fetchLoginLoading())
  try {
    const create = yield call(postLoginVerify, payload.payload)
    if (create.data && create.data.Status === 200) {
      yield put(LoginVerifyAction.fetchLoginVerifySuccess(create.data))
      yield localStorageEncrypt('user', create.data.Data)
      yield localStorageEncrypt('userProfile', create.data.Data)
      yield localStorageEncrypt('token', create.data.token)
      yield call(sendDeviceTokenToServer, payload)
      if (payload.payload.callback) {
        addNavCounter()
        console.log('adding counter nav')
        yield NavigationAction.default.backAfterLogin()
        payload.payload.callback()
      } else {
        console.log('route two')
        yield NavigationAction.default.navigate('routeTwo')
      }
    } else {
      yield put(
        LoginVerifyAction.fetchLoginVerifyFailure('Unregistered Phone Number')
      )
    }
  } catch (error) {
    alert('masuk catch')
    yield put(
      LoginVerifyAction.fetchLoginVerifyFailure('Invalid verification code, please try again')
    )
  }
}

function* sendDeviceTokenToServer({ payload }) {
  console.log({ payload })
  yield put(LoginVerifyAction.sendingDeviceTokenLoading())
  try {
    const create = yield call(commonService.sentDeviceToken, payload.device)
    if (create.data && create.data.Status === 200) {
      LoginVerifyAction.sendingDeviceTokenSuccess(create.data.Data)
      console.log('success sent device token')
    }
  } catch (error) {
    console.log({ error })
    yield put(LoginVerifyAction.sendingDeviceTokenFailure(error))
  }
}

export { fetchLoginVerify, sendDeviceTokenToServer }
