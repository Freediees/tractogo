import { call, put } from 'redux-saga/effects'
import ProfileAction from 'scenes/profile/store/actions'
import { fetchProfileRequest } from 'services/profileService'
import NavigationService from 'services/navigationService'
import AsyncStorage from '@react-native-community/async-storage'

function* fetchProfile({ payload }) {
  const json = yield call(fetchProfileRequest, payload)

  if (json) {
    if (json.Error) {
      if (json.Error.status === 401) {
        yield AsyncStorage.removeItem('token')
      } else {
        yield put(ProfileAction.fetchProfileFailure(create.data.ErrorMessage))
      }
    } else {
      if (json.Data) {
        if (json.data.Status === 200) {
          yield put(ProfileAction.fetchProfileSuccess(json.data.Data))
        } else {
          yield put(ProfileAction.fetchProfileFailure(json.data.ErrorMessage))
        }
      } else {
        yield put(
          ProfileAction.fetchProfileFailure('Oops! something went wrong! ' + JSON.stringify(error))
        )
      }
    }
  }
}

function* doLogout() {
  try {
    yield AsyncStorage.removeItem('token')
    yield AsyncStorage.removeItem('userProfile')
    yield NavigationService.navigate('routeOne')
  } catch (err) {}
}

export { fetchProfile, doLogout }
