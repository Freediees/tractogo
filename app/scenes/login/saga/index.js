import { call, put } from 'redux-saga/effects'
import LoginAction from '../store/actions'
import { localStorageEncrypt } from 'function/storage'
import { postLoginRequest, postLoginSocialiteRequest } from 'services/auth'
import NavigationService from 'services/navigationService'

function* fetchLogin({ payload }) {
  try {
    const create = yield call(postLoginRequest, payload)
    console.log(JSON.stringify(create.data.token))
    if (create.data.Status === 200) {
      yield put(LoginAction.fetchLoginSuccess(create.data.Data))
      localStorageEncrypt('user', create.data.Data)
      localStorageEncrypt('token', create.data.token)
      NavigationService.navigateAndReset('LoginVerifyScreen')
    } else {
      yield put(LoginAction.fetchLoginFailure(create.data.ErrorMessage))
    }
  } catch (error) {
    yield put(LoginAction.fetchLoginFailure('Oops! something went wrong! ' + JSON.stringify(error)))
  }
}

function* fetchLoginSocialite({ payload }) {
  try {
    const create = yield call(postLoginSocialiteRequest, payload)
    console.log(JSON.stringify(create.data.token))
    if (create.data.Status === 200) {
      yield put(LoginAction.fetchLoginSocialiteSuccess(create.data.Data))
      localStorageEncrypt('user', create.data.Data)
      localStorageEncrypt('token', create.data.token)
      NavigationService.navigate('routeTwo')
    } else {
      yield put(LoginAction.fetchLoginSocialiteFailure(create.data.ErrorMessage))
    }
  } catch (error) {
    yield put(
      LoginAction.fetchLoginSocialiteFailure('Oops! something went wrong! ' + JSON.stringify(error))
    )
  }
}

export { fetchLogin, fetchLoginSocialite }
