import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { ProfileEditPhoneTypes } from './actions'

export const fetchPhoneNumberLoading = (state) => ({
  ...state,
  phoneNumberIsLoading: true,
  phoneNumberErrorMessage: null,
})

export const fetchPhoneNumberSuccess = (state, { value }) => ({
  ...state,
  phoneNumber: value,
  extrasIsLoading: false,
  extrasErrorMessage: null,
})

export const fetchPhoneNumberFailure = (state, { message }) => ({
  ...state,
  phoneNumber: '+62',
  extrasIsLoading: false,
  extrasErrorMessage: message,
})

export const reducer = createReducer(INITIAL_STATE, {
  [ProfileEditPhoneTypes.FETCH_PHONE_NUMBER_LOADING]: fetchPhoneNumberLoading,
  [ProfileEditPhoneTypes.FETCH_PHONE_NUMBER_SUCCESS]: fetchPhoneNumberSuccess,
  [ProfileEditPhoneTypes.FETCH_PHONE_NUMBER_FAILURE]: fetchPhoneNumberFailure,
})
