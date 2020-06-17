import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { MyOrderCancelTypes } from './actions'

export const orderCancelLoading = (state) => ({
  ...state,
  masterReason: [],
  orderCancelLoading: false,
  orderCancelErrorMessage: null,
})

export const orderCancelFailure = (state, { errorMessage }) => ({
  ...state,
  masterReason: [],
  orderCancelLoading: false,
  orderCancelErrorMessage: errorMessage,
})

export const orderCancelSuccess = (state, { payload }) => ({
  ...state,
  masterReason: payload,
  orderCancelLoading: false,
  orderCancelErrorMessage: null,
})

export const reducer = createReducer(INITIAL_STATE, {
  [MyOrderCancelTypes.ORDER_CANCEL_SUCCESS]: orderCancelSuccess,
  [MyOrderCancelTypes.ORDER_CANCEL_FAILURE]: orderCancelFailure,
  [MyOrderCancelTypes.ORDER_CANCEL_LOADING]: orderCancelLoading,
})
