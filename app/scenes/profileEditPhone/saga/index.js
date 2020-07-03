import { put, call, all } from 'redux-saga/effects'
import ProfileEditPhoneActions from 'scenes/profileEditPhone/store/actions'
import NavigationService from 'services/navigationService'
import HomeActions from 'scenes/home/store/actions'

import { putPhoneNumber } from 'services/profileService'

function* fetchPhoneNumber({ payload }) {
  yield put(ProfileEditPhoneActions.fetchPhoneNumberLoading())

  var dataPayload = {
    OtpCode: payload.OtpCode,
    NoHandphone: payload.NoHandphone,
    UpdateNoHandphone: payload.UpdateNoHandphone,
  }
  console.log('payload:', dataPayload)
  const json = yield call(putPhoneNumber, dataPayload)
  //ProfileEditPhoneActions.fetchPhoneNumberFailure('Invalid verification code, please try again')
  if (json) {
    if (json.Error) {
      yield put(
        ProfileEditPhoneActions.fetchPhoneNumberFailure(
          'Invalid verification code, please try again'
        )
      )
    } else {
      if (json.Data) {
        if (json.Status == 200) {
          let dataObj = payload.user
          dataObj.NoHandphone = dataPayload.UpdateNoHandphone
          yield put(HomeActions.fetchUserSuccess(dataObj))
          alert('Saved')
          yield NavigationService.navigateAndReset('ProfileScreen')
        }
      }
    }
  } else {
    yield put(
      ProfileEditPhoneActions.fetchPhoneNumberFailure('Invalid verification code, please try again')
    )
  }
}

export { fetchPhoneNumber }
