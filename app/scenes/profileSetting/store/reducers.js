

import { INITIAL_STATE } from './initialState';
import { createReducer } from 'reduxsauce'
import { PutprofileTypes } from './actions'

export const putProfileLoading = (state) => ({
  ...state,
  profileIsLoading: true,
})

export const putProfileSuccess = (state, { profile }) => ({
  ...state,
  profileSuccess: profile,
  profileIsLoading: false,
  profileErrorMessage: null,
})

export const putProfileFailure = (state, { errorMessage }) => ({
  ...state,
  profileSuccess: [],
  profileIsLoading: false,
  profileErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [PutprofileTypes.PUT_PROFILE_SUCCESS]: putProfileSuccess,
  [PutprofileTypes.PUT_PROFILE_FAILURE]: putProfileFailure,
  [PutprofileTypes.PUT_PROFILE_LOADING]: putProfileLoading,
})
