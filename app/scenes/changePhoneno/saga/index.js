import { call, put } from 'redux-saga/effects'
import updatePhoneno from '../store/actions'
import { putPhoneNumber } from 'services/profileService'

export function* putPhoneno({ payload }) {
  try {
    const create = yield call(putPhoneNumber, payload)
    console.log('putUserToServer', JSON.stringify(create.data))
    if (create.data.Status === 200) {
      yield put(updatePhoneno.putPhonenoSuccess(create.data.Data))
      // NavigationAction.navigate('RegisterVerify')
    } else {
      yield put(updatePhoneno.putPhonenoFailure(create.data.ErrorMessage))
    }
  } catch (error) {
    yield put(
      updatePhoneno.putPhonenoFailure('Oops! something went wrong! ' + JSON.stringify(error))
    )
  }
}
