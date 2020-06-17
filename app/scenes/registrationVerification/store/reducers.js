import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { RegisterVerifyTypes } from './actions'

export const fetchRegisterVerifySuccess = (state, { verify }) => ({
  ...state,
  registerVerifySuccess: verify,
  registerVerifyIsLoading: false,
  registerVerifyErrorMessage: null,
})

export const fetchRegisterVerifyFailure = (state, { errorMessage }) => ({
  ...state,
  registerVerifySuccess: [],
  registerVerifyIsLoading: false,
  registerVerifyErrorMessage: errorMessage,
})

export const fetchRegisterVerifyLoading = (state) => ({
  ...state,
  registerVerifySuccess: [],
  registerVerifyIsLoading: true,
  registerVerifyErrorMessage: null,
})

export const reducer = createReducer(INITIAL_STATE, {
  [RegisterVerifyTypes.FETCH_REGISTER_VERIFY_SUCCESS]: fetchRegisterVerifySuccess,
  [RegisterVerifyTypes.FETCH_REGISTER_VERIFY_FAILURE]: fetchRegisterVerifyFailure,
  [RegisterVerifyTypes.FETCH_REGISTER_VERIFY_LOADING]: fetchRegisterVerifyLoading,
})
