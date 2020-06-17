import { INITIAL_STATE } from './initialState';
import { createReducer } from 'reduxsauce'
import { LoginVerifyTypes } from './actions'

export const fetchLoginVerifySuccess = (state, { verify }) => ({
  ...state,
  loginVerifySuccess: verify,
  loginVerifyIsLoading: false,
  loginVerifyErrorMessage: null,
})

export const fetchLoginVerifyFailure = (state, { errorMessage }) => ({
  ...state,
  loginVerifySuccess: null,
  loginVerifyIsLoading: false,
  loginVerifyErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [LoginVerifyTypes.FETCH_LOGIN_VERIFY_SUCCESS]: fetchLoginVerifySuccess,
  [LoginVerifyTypes.FETCH_LOGIN_VERIFY_FAILURE]: fetchLoginVerifyFailure,
})
