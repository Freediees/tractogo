import { call, put } from 'redux-saga/effects'
import ProfileAction from 'scenes/profileSetting/store/actions'
import HomeActions from 'scenes/home/store/actions'
import NavigationService from 'services/navigationService'
import { fetchUpdateProfile } from 'services/profileService'

export function* putProfile({ payload }) {
  yield put(ProfileAction.putProfileLoading())

  const dataPayload = {
    FirstName: payload.dataPayload.firstName,
    LastName: payload.dataPayload.lastName,
    Address: '',
    Gender: payload.dataPayload.nameTitle,
    BirthDate: payload.dataPayload.birthDateContent,
    ImagePath:
      'data:image/gif;base64,R0lGODlhEAAOALMAAOazToeHh0tLS/7LZv/0jvb29t/f3//Ub//ge8WSLf/rhf/3kdbW1mxsbP//mf///yH5BAAAAAAALAAAAAAQAA4AAARe8L1Ekyky67QZ1hLnjM5UUde0ECwLJoExKcppV0aCcGCmTIHEIUEqjgaORCMxIC6e0CcguWw6aFjsVMkkIr7g77ZKPJjPZqIyd7sJAgVGoEGv2xsBxqNgYPj/gAwXEQA7',
  }

  let dataObj = payload.user
  dataObj.FirstName = payload.dataPayload.firstName
  dataObj.LastName = payload.dataPayload.lastName
  dataObj.Gender = payload.dataPayload.nameTitle
  dataObj.BirthDate = payload.dataPayload.birthDateContent

  console.log(dataPayload)
  const json = yield call(fetchUpdateProfile, dataPayload, payload.dataPayload.Id)
  console.log(json)
  if (json) {
    if (json.Error) {
      if (json.Error.status === 401) {
        yield AsyncStorage.removeItem('token')
      } else {
        yield put(ProfileAction.putProfileFailure(json.Error.message))
      }
    } else {
      if (json.Data) {
        alert('saved')
        yield put(HomeActions.fetchUserSuccess(dataObj))
        yield NavigationService.navigateAndReset('ProfileScreen')
        yield put(ProfileAction.putProfileSuccess(json.Data))
      }
    }
  } else {
    yield put(ProfileAction.putProfileFailure('There was an error while fetching informations.'))
  }
}
