import { call, put } from 'redux-saga/effects'
import ProfileAction from 'scenes/profile/store/actions'
import { fetchProfileRequest } from 'services/profileService'
import NavigationService from 'services/navigationService'
import AsyncStorage from '@react-native-community/async-storage'

function* fetchProfile({ payload }) {
  try {
    const create = yield call(fetchProfileRequest, payload)
    if (create.data.Status === 200) {
      yield put(ProfileAction.fetchProfileSuccess(create.data.Data))
    } else {
      yield put(ProfileAction.fetchProfileFailure(create.data.ErrorMessage))
    }
  } catch (error) {
    yield put(
      ProfileAction.fetchProfileFailure('Oops! something went wrong! ' + JSON.stringify(error))
    )
  }
}

function* doLogout() {
  try {
    yield AsyncStorage.removeItem('token')
    yield NavigationService.navigate('routeOne')
  } catch (err) {}
}

export { fetchProfile, doLogout }
