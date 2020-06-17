import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { NotificationScreenTypes } from './actions'

export const fetchNotificationsTransactionLoading = (state) => ({
  ...state,
  notificationsTransaction: [],
  notificationsIsLoading: true,
  notificationsErrorMessage: null,
})

export const fetchNotificationsTransactionSuccess = (state, { transaction }) => ({
  ...state,
  notificationsTransaction: transaction,
  notificationsTransactionIsLoading: false,
  notificationsTransactionErrorMessage: null,
})

export const fetchNotificationsTransactionFailure = (state, { errorMessageTransaction }) => ({
  ...state,
  notificationsTransaction: [],
  notificationsTransactionIsLoading: false,
  notificationsTransactionErrorMessage: errorMessageTransaction,
})

export const fetchNotificationsUpdateLoading = (state) => ({
  ...state,
  notificationsUpdate: [],
  notificationsUpdateIsLoading: true,
  notificationsUpdateErrorMessage: null,
})

export const fetchNotificationsUpdateSuccess = (state, { update }) => ({
  ...state,
  notificationsUpdate: update,
  notificationsUpdateIsLoading: false,
  notificationsUpdateErrorMessage: null,
})

export const fetchNotificationsUpdateFailure = (state, { errorMessageIpdate }) => ({
  ...state,
  notificationsUpdate: [],
  notificationsUpdateIsLoading: false,
  notificationsUpdateErrorMessage: errorMessageIpdate,
})

export const updateNotificationsLoading = (state) => ({
  ...state,
  updateNotificationsSuccess: null,
  updateNotificationsIsLoading: true,
  updateNotificationsErrorMessage: null,
})

export const updateNotificationsSuccess = (state, { successMessage }) => ({
  ...state,
  updateNotificationsSuccess: successMessage,
  updateNotificationsIsLoading: false,
  updateNotificationsErrorMessage: null,
})

export const updateNotificationsFailure = (state, { errorMessage }) => ({
  ...state,
  updateNotificationsSuccess: null,
  updateNotificationsIsLoading: false,
  updateNotificationsErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [NotificationScreenTypes.FETCH_NOTIFICATIONS_TRANSACTION_LOADING]: fetchNotificationsTransactionLoading,
  [NotificationScreenTypes.FETCH_NOTIFICATIONS_TRANSACTION_SUCCESS]: fetchNotificationsTransactionSuccess,
  [NotificationScreenTypes.FETCH_NOTIFICATIONS_TRANSACTION_FAILURE]: fetchNotificationsTransactionFailure,
  [NotificationScreenTypes.FETCH_NOTIFICATIONS_UPDATE_LOADING]: fetchNotificationsUpdateLoading,
  [NotificationScreenTypes.FETCH_NOTIFICATIONS_UPDATE_SUCCESS]: fetchNotificationsUpdateSuccess,
  [NotificationScreenTypes.FETCH_NOTIFICATIONS_UPDATE_FAILURE]: fetchNotificationsUpdateFailure,
  [NotificationScreenTypes.UPDATE_NOTIFICATIONS_LOADING]: updateNotificationsLoading,
  [NotificationScreenTypes.UPDATE_NOTIFICATIONS_SUCCESS]: updateNotificationsSuccess,
  [NotificationScreenTypes.UPDATE_NOTIFICATIONS_FAILURE]: updateNotificationsFailure,
})
