

import { INITIAL_STATE } from './initialState';
import { createReducer } from 'reduxsauce'
import { PutphonenoTypes } from './actions'

export const putPhonenoSuccess = (state, { phoneno }) => ({
  ...state,
  phonenoSuccess: phoneno,
  phonenoIsLoading: false,
  profileErrorMessage: null,
})

export const putPhonenoFailure = (state, { errorMessage }) => ({
  ...state,
  phonenoSuccess: [],
  phonenoIsLoading: false,
  phonenoErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [PutphonenoTypes.PUT_PHONENO_SUCCESS]: putPhonenoSuccess,
  [PutphonenoTypes.PUT_PHONENO_FAILURE]: putPhonenoFailure,
})
