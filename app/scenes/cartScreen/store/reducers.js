import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { CartScreenTypes } from './actions'

export const changeCartDetails = (state, { payload }) => ({
  ...state,
  cartDetails: payload,
})

export const changeInitialize = (state, { payload }) => ({
  ...state,
  isInitialize: payload,
})

export const fetchCartDetailsLoading = (state) => ({
  ...state,
  cartDetails: [],
  cartDetailsIsLoading: true,
  cartDetailsErrorMessage: null,
})

export const fetchCartDetailsFailure = (state, { errorMessage }) => ({
  ...state,
  cartDetails: [],
  cartDetailsIsLoading: false,
  cartDetailsErrorMessage: errorMessage,
})

export const fetchCartDetailsSuccess = (state, { cartDetails }) => ({
  ...state,
  cartDetails: cartDetails,
  cartDetailsIsLoading: false,
  cartDetailsErrorMessage: null,
})

export const deleteCartDetailsLoading = (state) => ({
  ...state,
  deleteCartDetailsSuccessMessage: null,
  deleteCartDetailsIsLoading: true,
  deleteCartDetailsErrorMessage: null,
})

export const deleteCartDetailsFailure = (state, { errorMessage }) => ({
  ...state,
  deleteCartDetailsSuccessMessage: null,
  deleteCartDetailsIsLoading: false,
  deleteCartDetailsErrorMessage: errorMessage,
})

export const deleteCartDetailsSuccess = (state, { successMessage }) => ({
  ...state,
  deleteCartDetailsSuccessMessage: successMessage,
  deleteCartDetailsIsLoading: false,
  deleteCartDetailsErrorMessage: null,
})

export const checkoutValidationLoading = (state) => ({
  ...state,
  checkoutValidationIsLoading: true,
  checkoutValidationErrorMessage: null,
})

export const checkoutValidationFailure = (state, { errorMessage }) => ({
  ...state,
  checkoutValidationIsLoading: false,
  checkoutValidationErrorMessage: errorMessage,
})

export const checkoutValidationSuccess = (state, { checkoutValidation }) => ({
  ...state,
  checkoutValidationIsLoading: false,
  checkoutValidationErrorMessage: null,
})

export const reducer = createReducer(INITIAL_STATE, {
  [CartScreenTypes.FETCH_CART_DETAILS_SUCCESS]: fetchCartDetailsSuccess,
  [CartScreenTypes.FETCH_CART_DETAILS_FAILURE]: fetchCartDetailsFailure,
  [CartScreenTypes.FETCH_CART_DETAILS_LOADING]: fetchCartDetailsLoading,
  [CartScreenTypes.DELETE_CART_DETAILS_SUCCESS]: deleteCartDetailsSuccess,
  [CartScreenTypes.DELETE_CART_DETAILS_FAILURE]: deleteCartDetailsFailure,
  [CartScreenTypes.DELETE_CART_DETAILS_LOADING]: deleteCartDetailsLoading,
  [CartScreenTypes.CHECKOUT_VALIDATION_LOADING]: checkoutValidationLoading,
  [CartScreenTypes.CHECKOUT_VALIDATION_FAILURE]: checkoutValidationFailure,
  [CartScreenTypes.CHECKOUT_VALIDATION_SUCCESS]: checkoutValidationSuccess,
  [CartScreenTypes.CHANGE_CART_DETAILS]: changeCartDetails,
  [CartScreenTypes.CHANGE_INITIALIZE]: changeInitialize,
})
