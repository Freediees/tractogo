import { call, put } from 'redux-saga/effects'
import ImageAction from '../store/actions'
import HomeActions from 'scenes/home/store/actions'
import { putImages } from 'services/profileService'
import NavigationService from 'services/navigationService'
import { Alert } from 'react-native'

export function* putImage({ payload }) {
  console.log(payload)
  console.log(payload.Id)

  const dataPayload = {
    ImageSelfie: payload.ImageSelfie,
    ImageKTP: payload.ImageKTP,
    ImageSIM: payload.ImageSIM,
  }

  yield put(ImageAction.putImageLoading())
  try {
    const create = yield call(putImages, dataPayload, payload.Id)
    // console.log(JSON.stringify(create))

    if (create.Status === 200) {
      let dataObj = payload.user
      dataObj.InReviewKYC = 1
      yield put(ImageAction.putImageSuccess())
      yield put(HomeActions.fetchUserSuccess(dataObj))

      Alert.alert('Image Saved')

      yield NavigationService.navigateAndReset('ProfileScreen')
      console.log('Success')
    } else {
      console.log('error')
    }
  } catch (error) {}
}
