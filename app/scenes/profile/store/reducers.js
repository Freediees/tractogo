

import { INITIAL_STATE } from './initialState';
import { createReducer } from 'reduxsauce'
import { ProfileTypes } from './actions'

export const fetchProfileSuccess = (state, { profile }) => ({
  ...state,
  profileSuccess: profile,
  profileIsLoading: false,
  profileErrorMessage: null,
})

export const fetchProfileFailure = (state, { errorMessage }) => ({
  ...state,
  profileSuccess: [],
  profileIsLoading: false,
  profileErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [ProfileTypes.FETCH_PROFILE_SUCCESS]: fetchProfileSuccess,
  [ProfileTypes.FETCH_PROFILE_FAILURE]: fetchProfileFailure,
})
