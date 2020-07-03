import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { MyOrderCancelTypes } from './actions'

export const orderCancelLoading = (state) => ({
  ...state,
  masterReason: [],
  orderCancelLoading: true,
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

export const fetchBankDataLoading = (state) => ({
  ...state,
  bankData: [],
  bankDataIsLoading: true,
  bankDataErrorMessage: null,
})

export const fetchBankDataFailure = (state, { errorMessage }) => ({
  ...state,
  bankData: [],
  bankDataIsLoading: false,
  bankDataErrorMessage: errorMessage,
})

export const fetchBankDataSuccess = (state, { payload }) => ({
  ...state,
  bankData: payload,
  bankDataIsLoading: false,
  bankDataErrorMessage: null,
})

export const postReservationCancelLoading = (state) => ({
  ...state,
  postReservationIsLoading: true,
  postReservationErrorMessage: null,
  postReservationSuccessMessage: null,
})

export const postReservationCancelFailure = (state, { errorMessage }) => ({
  ...state,
  postReservationIsLoading: false,
  postReservationErrorMessage: errorMessage,
  postReservationSuccessMessage: null,
})

export const postReservationCancelSuccess = (state, { successMessage }) => ({
  ...state,
  postReservationIsLoading: false,
  postReservationErrorMessage: null,
  postReservationSuccessMessage: successMessage,
})

export const changeBankData = (state, { payload }) => ({
  ...state,
  bankData: payload,
})

export const changeReasons = (state, { payload }) => ({
  ...state,
  masterReason: payload,
})

export const reducer = createReducer(INITIAL_STATE, {
  [MyOrderCancelTypes.ORDER_CANCEL_SUCCESS]: orderCancelSuccess,
  [MyOrderCancelTypes.ORDER_CANCEL_FAILURE]: orderCancelFailure,
  [MyOrderCancelTypes.ORDER_CANCEL_LOADING]: orderCancelLoading,
  [MyOrderCancelTypes.FETCH_BANK_DATA_SUCCESS]: fetchBankDataSuccess,
  [MyOrderCancelTypes.FETCH_BANK_DATA_FAILURE]: fetchBankDataFailure,
  [MyOrderCancelTypes.FETCH_BANK_DATA_LOADING]: fetchBankDataLoading,
  [MyOrderCancelTypes.POST_RESERVATION_CANCEL_SUCCESS]: postReservationCancelSuccess,
  [MyOrderCancelTypes.POST_RESERVATION_CANCEL_FAILURE]: postReservationCancelFailure,
  [MyOrderCancelTypes.POST_RESERVATION_CANCEL_LOADING]: postReservationCancelLoading,
  [MyOrderCancelTypes.CHANGE_BANK_DATA]: changeBankData,
  [MyOrderCancelTypes.CHANGE_REASONS]: changeReasons,
})
