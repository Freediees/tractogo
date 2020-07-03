import { INITIAL_STATE } from './initialState';
import { createReducer } from 'reduxsauce'
import { RegisterTypes } from './actions'

export const fetchRegisterSuccess = (state, { register }) => ({
  ...state,
  registerSuccess: register,
  registerIsLoading: false,
  registerErrorMessage: null,
})

export const fetchRegisterFailure = (state, { errorMessage }) => ({
  ...state,
  registerSuccess: [],
  registerIsLoading: false,
  registerErrorMessage: errorMessage,
})

export const fetchRegisterLoading = (state) => ({
  ...state,
  registerSuccess: [],
  registerIsLoading: true,
  registerErrorMessage: null,
})

export const reducer = createReducer(INITIAL_STATE, {
  [RegisterTypes.FETCH_REGISTER_SUCCESS]: fetchRegisterSuccess,
  [RegisterTypes.FETCH_REGISTER_FAILURE]: fetchRegisterFailure,
  [RegisterTypes.FETCH_REGISTER_LOADING]: fetchRegisterLoading,
})
