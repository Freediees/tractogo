/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { OrderDetailWithDriverTypes } from './actions'

export const fetchExtrasLoading = (state) => ({
  ...state,
  extrasIsLoading: true,
  extrasErrorMessage: null,
})

export const fetchExtrasSuccess = (state, { extras }) => ({
  ...state,
  extras: extras,
  extrasIsLoading: false,
  extrasErrorMessage: null,
})

export const fetchExtrasFailure = (state, { errorMessage }) => ({
  ...state,
  extras: [],
  extrasIsLoading: false,
  extrasErrorMessage: errorMessage,
})

export const addCartLoading = (state) => ({
  ...state,
  addCartIsLoading: true,
  addCartErrorMessage: null,
  addCartSuccessMessage: null,
})

export const addCartSuccess = (state, { successMessage }) => ({
  ...state,
  addCartIsLoading: false,
  addCartErrorMessage: null,
  addCartSuccessMessage: successMessage,
})

export const addCartFailure = (state, { errorMessage }) => ({
  ...state,
  addCartIsLoading: false,
  addCartErrorMessage: errorMessage,
  addCartSuccessMessage: null,
})

export const changeAdditionalItems = (state, { payload }) => ({
  ...state,
  additionalItems: payload,
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [OrderDetailWithDriverTypes.FETCH_EXTRAS_LOADING]: fetchExtrasLoading,
  [OrderDetailWithDriverTypes.FETCH_EXTRAS_SUCCESS]: fetchExtrasSuccess,
  [OrderDetailWithDriverTypes.FETCH_EXTRAS_FAILURE]: fetchExtrasFailure,
  [OrderDetailWithDriverTypes.ADD_CART_LOADING]: addCartLoading,
  [OrderDetailWithDriverTypes.ADD_CART_SUCCESS]: addCartSuccess,
  [OrderDetailWithDriverTypes.ADD_CART_FAILURE]: addCartFailure,
  [OrderDetailWithDriverTypes.CHANGE_ADDITIONAL_ITEMS]: changeAdditionalItems,
})
