import { call, put } from 'redux-saga/effects'
import ImageAction from '../store/actions'
import HomeActions from 'scenes/home/store/actions'
import { putImages } from 'services/profileService'
import NavigationService from 'services/navigationService'
import { Alert } from 'react-native'

export function* putImage({ payload }) {
  const dataPayload = {
    ImageSelfie: payload.ImageSelfie,
    ImageKTP: payload.ImageKTP,
    ImageSIM: payload.ImageSIM,
    KTPName: payload.KTPName,
    SIMName: payload.SIMName,
    NoKTP: payload.NoKTP,
    NoSIM: payload.NoSIM,
  }

  yield put(ImageAction.putImageLoading())
  const json = yield call(putImages, dataPayload, payload.Id)
  console.log(json)
  if (json) {
    if (json.Error) {
      console.log(json.Error)
    } else {
      if (json.Data) {
        if (json.Status === 200) {
          let dataObj = payload.user
          dataObj.InReviewKYC = 1
          yield put(ImageAction.putImageSuccess())
          yield put(HomeActions.fetchUserSuccess(dataObj))
        } else {
          console.log('error')
        }
      } else {
        console.log('error')
      }
    }
  } else {
    console.log('error')
  }
}
