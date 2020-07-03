import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { MyOrderDetailTypes } from './actions'

export const fetchPaymentDetailLoading = (state) => ({
  ...state,
  paymentDetail: {},
  paymentDetailIsLoading: false,
  paymentDetailErrorMessage: null,
})

export const fetchPaymentDetailFailure = (state, { errorMessage }) => ({
  ...state,
  paymentDetail: {},
  paymentDetailIsLoading: false,
  paymentDetailErrorMessage: errorMessage,
})

export const fetchPaymentDetailSuccess = (state, { paymentDetail }) => ({
  ...state,
  paymentDetail: paymentDetail,
  paymentDetailIsLoading: false,
  paymentDetailErrorMessage: null,
})

export const reducer = createReducer(INITIAL_STATE, {
  [MyOrderDetailTypes.FETCH_PAYMENT_DETAIL_SUCCESS]: fetchPaymentDetailSuccess,
  [MyOrderDetailTypes.FETCH_PAYMENT_DETAIL_FAILURE]: fetchPaymentDetailFailure,
  [MyOrderDetailTypes.FETCH_PAYMENT_DETAIL_LOADING]: fetchPaymentDetailLoading,
})
