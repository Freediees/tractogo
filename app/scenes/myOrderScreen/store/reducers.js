import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { MyOrderScreenTypes } from './actions'

export const fetchOrdersActiveLoading = (state) => ({
  ...state,
  ordersActive: [],
  ordersActiveIsLoading: false,
  ordersActiveErrorMessage: null,
})

export const fetchOrdersActiveFailure = (state, { errorMessage }) => ({
  ...state,
  ordersActive: [],
  ordersActiveIsLoading: false,
  ordersActiveErrorMessage: errorMessage,
})

export const fetchOrdersActiveSuccess = (state, { ordersActive }) => ({
  ...state,
  ordersActive: ordersActive,
  ordersActiveIsLoading: false,
  ordersActiveErrorMessage: null,
})

export const fetchOrdersCompleteLoading = (state) => ({
  ...state,
  ordersComplete: [],
  ordersCompleteIsLoading: false,
  ordersCompleteErrorMessage: null,
})

export const fetchOrdersCompleteFailure = (state, { errorMessage }) => ({
  ...state,
  ordersComplete: [],
  ordersCompleteIsLoading: false,
  ordersCompleteErrorMessage: errorMessage,
})

export const fetchOrdersCompleteSuccess = (state, { ordersComplete }) => ({
  ...state,
  ordersComplete: ordersComplete,
  ordersCompleteIsLoading: false,
  ordersCompleteErrorMessage: null,
})

export const fetchOrdersCancelLoading = (state) => ({
  ...state,
  ordersCancel: [],
  ordersCancelIsLoading: false,
  ordersCancelErrorMessage: null,
})

export const fetchOrdersCancelFailure = (state, { errorMessage }) => ({
  ...state,
  ordersCancel: [],
  ordersCancelIsLoading: false,
  ordersCancelErrorMessage: errorMessage,
})

export const fetchOrdersCancelSuccess = (state, { ordersCancel }) => ({
  ...state,
  ordersCancel: ordersCancel,
  ordersCancelIsLoading: false,
  ordersCancelErrorMessage: null,
})

export const reducer = createReducer(INITIAL_STATE, {
  [MyOrderScreenTypes.FETCH_ORDERS_ACTIVE_SUCCESS]: fetchOrdersActiveSuccess,
  [MyOrderScreenTypes.FETCH_ORDERS_ACTIVE_FAILURE]: fetchOrdersActiveFailure,
  [MyOrderScreenTypes.FETCH_ORDERS_ACTIVE_LOADING]: fetchOrdersActiveLoading,
  [MyOrderScreenTypes.FETCH_ORDERS_COMPLETE_SUCCESS]: fetchOrdersCompleteSuccess,
  [MyOrderScreenTypes.FETCH_ORDERS_COMPLETE_FAILURE]: fetchOrdersCompleteFailure,
  [MyOrderScreenTypes.FETCH_ORDERS_COMPLETE_LOADING]: fetchOrdersCompleteLoading,
  [MyOrderScreenTypes.FETCH_ORDERS_CANCEL_SUCCESS]: fetchOrdersCancelSuccess,
  [MyOrderScreenTypes.FETCH_ORDERS_CANCEL_FAILURE]: fetchOrdersCancelFailure,
  [MyOrderScreenTypes.FETCH_ORDERS_CANCEL_LOADING]: fetchOrdersCancelLoading,

})
