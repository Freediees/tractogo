/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { PaymentScreenTypes } from './actions'

export const fetchPaymentMethodsLoading = (state) => ({
  ...state,
  paymentMethods: [],
  bankData: [],
  vaData: [],
  paymentMethodsIsLoading: false,
  paymentMethodsErrorMessage: null,
})

export const changeVaData = (state, { payload }) => ({
  ...state,
  vaData: payload,
})

export const changeBankData = (state, { payload }) => ({
  ...state,
  bankData: payload,
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

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [PaymentScreenTypes.FETCH_PAYMENT_METHODS_SUCCESS]: fetchPaymentMethodsSuccess,
  [PaymentScreenTypes.FETCH_PAYMENT_METHODS_FAILURE]: fetchPaymentMethodsFailure,
  [PaymentScreenTypes.FETCH_PAYMENT_METHODS_LOADING]: fetchPaymentMethodsLoading,
  [PaymentScreenTypes.CHANGE_VA_DATA]: changeVaData,
  [PaymentScreenTypes.CHANGE_BANK_DATA]: changeBankData,
})
