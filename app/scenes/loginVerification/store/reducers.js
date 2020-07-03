import { INITIAL_STATE } from './initialState'
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

export const fetchLoginLoading = (state) => ({
  ...state,
  loginVerifyIsLoading: true,
})

export const sendingDeviceTokenSuccess = (state, {sendingTokenSuccess}) => ({
  ...state,
  tokenSuccess: sendingTokenSuccess,
  tokenIsLoading: false,
  tokenErrorMessage: null,
})

export const sendingDeviceTokenFailure = (state, {errorMessage}) => ({
  ...state,
  tokenSuccess: null,
  tokenIsLoading: false,
  tokenErrorMessage: errorMessage,
})

export const sendingDeviceTokenLoading = (state) => ({
  ...state,
  tokenIsLoading: true,
})

export const reducer = createReducer(INITIAL_STATE, {
  [LoginVerifyTypes.FETCH_LOGIN_VERIFY_SUCCESS]: fetchLoginVerifySuccess,
  [LoginVerifyTypes.FETCH_LOGIN_VERIFY_FAILURE]: fetchLoginVerifyFailure,
  [LoginVerifyTypes.FETCH_LOGIN_LOADING]: fetchLoginLoading,
})
