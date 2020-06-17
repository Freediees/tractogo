/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { OrderDetailSelfDriveTypes } from './actions'

export const fetchExtrasSelfDriveLoading = (state) => ({
  ...state,
  extrasSelfDriveIsLoading: true,
  extrasSelfDriveErrorMessage: null,
})

export const fetchExtrasSelfDriveSuccess = (state, { extras }) => ({
  ...state,
  extrasSelfDrive: extras,
  extrasSelfDriveIsLoading: false,
  extrasSelfDriveErrorMessage: null,
})

export const fetchExtrasSelfDriveFailure = (state, { errorMessage }) => ({
  ...state,
  extrasSelfDrive: [],
  extrasSelfDriveIsLoading: false,
  extrasSelfDriveErrorMessage: errorMessage,
})

export const changeAdditionalItems = (state, { payload }) => ({
  ...state,
  additionalItems: payload,
})

export const reducer = createReducer(INITIAL_STATE, {
  [OrderDetailSelfDriveTypes.FETCH_EXTRAS_SELF_DRIVE_LOADING]: fetchExtrasSelfDriveLoading,
  [OrderDetailSelfDriveTypes.FETCH_EXTRAS_SELF_DRIVE_SUCCESS]: fetchExtrasSelfDriveSuccess,
  [OrderDetailSelfDriveTypes.FETCH_EXTRAS_SELF_DRIVE_FAILURE]: fetchExtrasSelfDriveFailure,
  [OrderDetailSelfDriveTypes.CHANGE_ADDITIONAL_ITEMS]: changeAdditionalItems,
})
