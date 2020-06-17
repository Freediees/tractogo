import { call, put } from 'redux-saga/effects'
import RegisterAction from 'scenes/registration/store/actions'
import Axios from 'axios'
import { Config } from 'config/index.dev'
import { localStorageEncrypt } from 'function/storage'
import { postRegisterRequest } from 'services/auth'
import * as NavigationAction from 'services/navigationService'

export function* fetchRegister({ payload }) {
  try {
    yield put(RegisterAction.fetchRegisterLoading())
    const create = yield call(postRegisterRequest, payload)
    console.log(JSON.stringify(payload))

    console.log('create', create)

    if (create.data.Status === 201) {
      console.log('register success')
      console.log({ create })
      yield put(RegisterAction.fetchRegisterSuccess(create.data))
      localStorageEncrypt('user', create.data.Data)
      // localStorageEncrypt('token', create.data.token)
      console.log('payload', payload.NoHandphone)
      NavigationAction.default.navigateAndReset('RegisterVerifyScreen', {
        noHandPhone: payload.NoHandphone,
      })
    } else {
      alert(create.data.ErrorMessage)
      yield put(RegisterAction.fetchRegisterFailure(create))
    }
  } catch (error) {
    alert('Oops! something went wrong!')
    //console.log('register fail', error)
    yield put(
      RegisterAction.fetchRegisterFailure('Oops! something went wrong! ' + JSON.stringify(error))
    )
  }
}
