import { call, put } from 'redux-saga/effects'
import LoginAction from '../store/actions'
import { localStorageEncrypt } from 'function/storage'
import { postLoginRequest, postLoginSocialiteRequest } from 'services/auth'
import { addNavCounter } from 'function'
import NavigationService from 'services/navigationService'

function* fetchLogin({ payload }) {
  try {
    const create = yield call(postLoginRequest, payload.payload)
    console.log(JSON.stringify(create.data.token))
    if (create.data.Status === 200) {
      yield put(LoginAction.fetchLoginSuccess(create.data.Data))
      yield localStorageEncrypt('user', create.data.Data)
      yield localStorageEncrypt('userProfile', create.data.Data)
      yield localStorageEncrypt('token', create.data.token)
      if (payload.callback) {
        addNavCounter()
        console.log('adding counter nav')
        NavigationService.navigate('LoginVerifyScreen', { loginAction: payload.callback })
      } else {
        NavigationService.navigate('LoginVerifyScreen')
      }
    } else {
      yield put(LoginAction.fetchLoginFailure(create.data.ErrorMessage))
    }
  } catch (error) {
    yield put(LoginAction.fetchLoginFailure('Oops! something went wrong! ' + JSON.stringify(error)))
  }
}

function* fetchLoginSocialite({ payload }) {
  console.log('payloadnyah: ', payload)
  try {
    const create = yield call(postLoginSocialiteRequest, payload.payload)
    console.log(JSON.stringify(create.data.Data))
    if (create.data.Status === 200) {
      console.log('sini mang')
      yield put(LoginAction.fetchLoginSocialiteSuccess(create.data.Data))
      //localStorageEncrypt('user', create.data.Data)
      //localStorageEncrypt('token', create.data.token)
      if (payload.payload.callback) {
        if (create.data.Data.NoHandphone) {
          console.log('handphone true')
          let values = {
            NoHandphone: create.data.Data.NoHandphone,
          }
          NavigationService.navigate('LoginVerifyScreen', {
            loginAction: payload.payload.callback,
            payload: values,
          })
        } else {
          console.log('handphone null')
          let values = {
            user: create.data.Data,
            token: create.data.token,
          }
          NavigationService.navigate('RegistrationGoogleScreen', {
            loginAction: payload.payload.callback,
            payload: values,
          })
        }

        //payload.payload.callback()
        //NavigationService.navigate('LoginVerifyScreen')
        //NavigationService.navigate('LoginVerifyScreen', { loginAction: payload.payload.callback })
        console.log('adding counter nav')
      } else {
        NavigationService.navigate('LoginVerifyScreen')
        //NavigationService.navigate('routeTwo')
      }
    } else {
      alert('Not Registered')
      yield put(LoginAction.fetchLoginSocialiteFailure(create.data.ErrorMessage))
    }
  } catch (error) {
    yield put(
      LoginAction.fetchLoginSocialiteFailure('Oops! something went wrong! ' + JSON.stringify(error))
    )
  }
}

export { fetchLogin, fetchLoginSocialite }
