import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { LoginTypes } from './actions'

export const fetchLoginSuccess = (state, { user }) => ({
  ...state,
  loginSuccess: user,
  loginIsLoading: false,
  loginErrorMessage: null,
})

export const fetchLoginFailure = (state, { errorMessage }) => ({
  ...state,
  loginSuccess: [],
  loginIsLoading: false,
  loginErrorMessage: errorMessage,
})

export const fetchLoginSocialiteSuccess = (state, { user }) => ({
  ...state,
  loginSuccess: user,
  loginIsLoading: false,
  loginErrorMessage: null,
})

export const fetchLoginSocialiteFailure = (state, { errorMessage }) => ({
  ...state,
  loginSuccess: [],
  loginIsLoading: false,
  loginErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [LoginTypes.FETCH_LOGIN_SUCCESS]: fetchLoginSuccess,
  [LoginTypes.FETCH_LOGIN_FAILURE]: fetchLoginFailure,
  [LoginTypes.FETCH_LOGIN_SOCIALITE_SUCCESS]: fetchLoginSocialiteSuccess,
  [LoginTypes.FETCH_LOGIN_SOCIALITE_FAILURE]: fetchLoginSocialiteFailure,
})
