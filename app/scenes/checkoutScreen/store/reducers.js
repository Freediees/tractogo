import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { CheckoutScreenTypes } from './actions'

export const postCheckoutLoading = (state) => ({
  ...state,
  postCheckoutIsLoading: true,
  postCheckoutErrorMessage: null,
  postCheckoutSuccessMessage: null,
})

export const postCheckoutFailure = (state, { errorMessage }) => ({
  ...state,
  postCheckoutIsLoading: false,
  postCheckoutErrorMessage: errorMessage,
  postCheckoutSuccessMessage: null,
})

export const postCheckoutSuccess = (state, { successMessage }) => ({
  ...state,
  postCheckoutSuccessMessage: successMessage,
  postCheckoutIsLoading: false,
  postCheckoutErrorMessage: null,
})

export const postCheckoutWithoutCartLoading = (state) => ({
  ...state,
  postCheckoutWithoutCartIsLoading: true,
  postCheckoutWithoutCartErrorMessage: null,
  postCheckoutWithoutCartSuccessMessage: null,
})

export const postCheckoutWithoutCartFailure = (state, { errorMessage }) => ({
  ...state,
  postCheckoutWithoutCartIsLoading: false,
  postCheckoutWithoutCartErrorMessage: errorMessage,
  postCheckoutWithoutCartSuccessMessage: null,
})

export const postCheckoutWithoutCartSuccess = (state, { successMessage }) => ({
  ...state,
  postCheckoutWithoutCartSuccessMessage: successMessage,
  postCheckoutWithoutCartIsLoading: false,
  postCheckoutWithoutCartErrorMessage: null,
})

export const fetchPaymentMethodsLoading = (state) => ({
  ...state,
  paymentMethods: [],
  paymentMethodsIsLoading: true,
  paymentMethodsErrorMessage: null,
})

export const fetchPaymentMethodsFailure = (state, { errorMessage }) => ({
  ...state,
  paymentMethods: [],
  paymentMethodsIsLoading: false,
  paymentMethodsErrorMessage: errorMessage,
})

export const fetchPaymentMethodsSuccess = (state, { paymentMethods }) => ({
  ...state,
  paymentMethods: paymentMethods,
  paymentMethodsIsLoading: false,
  paymentMethodsErrorMessage: null,
})

export const changeSelectedPayment = (state, { payload }) => ({
  ...state,
  selectedPayment: payload,
})

export const changeCartItems = (state, { payload }) => ({
  ...state,
  cartItems: payload,
})

export const changePaymentDetailItems = (state, { payload }) => ({
  ...state,
  paymentDetailItems: payload,
})

export const changePaymentDetailItemsTemp = (state, { payload }) => ({
  ...state,
  paymentDetailItemsTemp: payload,
})

export const checkVoucherLoading = (state) => ({
  ...state,
  checkVoucherSuccessMessage: null,
  checkVoucherIsLoading: true,
  checkVoucherErrorMessage: null,
})

export const checkVoucherFailure = (state, { errorMessage }) => ({
  ...state,
  checkVoucherSuccessMessage: null,
  checkVoucherIsLoading: false,
  checkVoucherErrorMessage: errorMessage,
})

export const checkVoucherSuccess = (state, { successMessage }) => ({
  ...state,
  checkVoucherSuccessMessage: successMessage,
  checkVoucherIsLoading: false,
  checkVoucherErrorMessage: null,
})

export const resetVoucher = (state) => ({
  ...state,
  checkVoucherSuccessMessage: null,
  checkVoucherIsLoading: false,
  checkVoucherErrorMessage: null,
})

export const changeTotal = (state, { payload }) => ({
  ...state,
  total: payload,
})

export const reducer = createReducer(INITIAL_STATE, {
  [CheckoutScreenTypes.POST_CHECKOUT_SUCCESS]: postCheckoutSuccess,
  [CheckoutScreenTypes.POST_CHECKOUT_FAILURE]: postCheckoutFailure,
  [CheckoutScreenTypes.POST_CHECKOUT_LOADING]: postCheckoutLoading,
  [CheckoutScreenTypes.FETCH_PAYMENT_METHODS_SUCCESS]: fetchPaymentMethodsSuccess,
  [CheckoutScreenTypes.FETCH_PAYMENT_METHODS_FAILURE]: fetchPaymentMethodsFailure,
  [CheckoutScreenTypes.FETCH_PAYMENT_METHODS_LOADING]: fetchPaymentMethodsLoading,
  [CheckoutScreenTypes.CHANGE_SELECTED_PAYMENT]: changeSelectedPayment,
  [CheckoutScreenTypes.CHANGE_CART_ITEMS]: changeCartItems,
  [CheckoutScreenTypes.CHANGE_PAYMENT_DETAIL_ITEMS]: changePaymentDetailItems,
  [CheckoutScreenTypes.CHANGE_PAYMENT_DETAIL_ITEMS_TEMP]: changePaymentDetailItemsTemp,
  [CheckoutScreenTypes.CHECK_VOUCHER_SUCCESS]: checkVoucherSuccess,
  [CheckoutScreenTypes.CHECK_VOUCHER_FAILURE]: checkVoucherFailure,
  [CheckoutScreenTypes.CHECK_VOUCHER_LOADING]: checkVoucherLoading,
  [CheckoutScreenTypes.RESET_VOUCHER]: resetVoucher,
  [CheckoutScreenTypes.CHANGE_TOTAL]: changeTotal,
})
