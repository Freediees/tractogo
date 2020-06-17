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

  //
  //   var payload = {
  //     OtpCode: '1234', // sementara sampai id nexmo
  //     NoHandphone: '+628123491376',
  //     UpdateNoHandphone: '+6200000',
  //   }

  console.log(payload)
  const json = yield call(putPhoneNumber, dataPayload)
  console.log(json)
  if (json.Status == 200) {
    let dataObj = payload.user
    dataObj.NoHandphone = dataPayload.UpdateNoHandphone
    yield put(HomeActions.fetchUserSuccess(dataObj))
    alert('Saved')
    yield NavigationService.navigateAndReset('ProfileScreen')
  }
}

export { fetchPhoneNumber }
