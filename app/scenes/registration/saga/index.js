import { call, put } from 'redux-saga/effects'
import { Alert } from 'react-native'
import RegisterAction from 'scenes/registration/store/actions'
import Axios from 'axios'
import { Config } from 'config/index.dev'
import { localStorageEncrypt } from 'function/storage'
import { postRegisterRequest, postRegisterGoogleRequest } from 'services/auth'
import { addNavCounter } from 'function'
import * as NavigationAction from 'services/navigationService'
import NavigationService from 'services/navigationService'

export function* fetchRegister({ payload }) {
  console.log('masuk function')
  yield put(RegisterAction.fetchRegisterLoading())

  console.log(payload)
  const json = yield call(postRegisterRequest, payload.payload)
  console.log(json)
  if (json) {
    if (json.Error) {
      yield put(RegisterAction.fetchRegisterFailure(json.Error))
    } else {
      if (json.data) {
        if (json.data.Status === 201) {
          yield put(RegisterAction.fetchRegisterSuccess(json.data.Data))
          localStorageEncrypt('user', json.data.Data)
          if (payload.callback) {
            addNavCounter()
            NavigationAction.default.navigate('RegisterVerifyScreen', {
              noHandPhone: payload.payload.payload.NoHandphone,
              loginAction: payload.callback,
            })
          } else {
            NavigationAction.default.navigate('RegisterVerifyScreen', {
              noHandPhone: payload.payload.payload.NoHandphone,
            })
          }
        } else {
          yield put(RegisterAction.fetchRegisterFailure(json))
        }
      } else {
        Alert.alert('This email is already registered')
        yield put(RegisterAction.fetchRegisterFailure(json))
      }
    }
  } else {
    alert('Something wrong')
    yield put(
      RegisterAction.fetchRegisterFailure('There was an error while fetching informations.')
    )
  }

  // try {
  //   yield put(RegisterAction.fetchRegisterLoading())
  //   const create = yield call(postRegisterRequest, payload.payload)
  //   console.log(JSON.stringify(payload))

  //   console.log('create', create)

  //   if (create.data.Status === 201) {
  //     console.log('register success')
  //     console.log({ create })
  //     yield put(RegisterAction.fetchRegisterSuccess(create.data))
  //     localStorageEncrypt('user', create.data.Data)
  //     // localStorageEncrypt('token', create.data.token)
  //     if (payload.callback) {
  //       NavigationAction.default.navigate('RegisterVerifyScreen', {
  //         noHandPhone: payload.payload.NoHandphone,
  //         loginAction: payload.callback,
  //       })
  //     } else {
  //       NavigationAction.default.navigate('RegisterVerifyScreen', {
  //         noHandPhone: payload.payload.NoHandphone,
  //       })
  //     }
  //   } else {
  //     alert(create.data.ErrorMessage)
  //     yield put(RegisterAction.fetchRegisterFailure(create))
  //   }
  // } catch (error) {
  //   alert('Oops! something went wrong!')
  //   //console.log('register fail', error)
  //   yield put(
  //     RegisterAction.fetchRegisterFailure('Oops! something went wrong! ' + JSON.stringify(error))
  //   )
  // }
}

export function* updateRegisterGoogle(payload) {
  //console.log('masuk function')
  //yield put(RegisterAction.fetchRegisterLoading())

  console.log('callback :', payload.payload.payload.callback)
  console.log('payload: ', payload.payload.payload.payload.NoHandphone)

  const json = yield call(postRegisterGoogleRequest, payload.payload)
  console.log(json)
  if (json) {
    if (json.Error) {
      yield put(RegisterAction.fetchRegisterFailure(json.Error))
    } else {
      if (json.data) {
        if (json.data.Status === 200) {
          yield put(RegisterAction.fetchRegisterSuccess(json.data.Data))
          //localStorageEncrypt('user', json.data.Data)
          if (payload.payload.payload.callback) {
            addNavCounter()
            let values = {
              NoHandphone: payload.payload.payload.payload.NoHandphone,
            }
            NavigationService.navigate('LoginVerifyScreen', {
              loginAction: payload.payload.payload.callback,
              payload: values,
            })
          } else {
            let values = {
              NoHandphone: payload.payload.payload.payload.NoHandphone,
            }
            NavigationService.navigate('LoginVerifyScreen', {
              payload: values,
            })
          }
        } else {
          yield put(RegisterAction.fetchRegisterFailure(json))
        }
      } else {
        alert(json)
        yield put(RegisterAction.fetchRegisterFailure(json))
      }
    }
  } else {
    alert('Something wrong')
    yield put(
      RegisterAction.fetchRegisterFailure('There was an error while fetching informations.')
    )
  }
}
