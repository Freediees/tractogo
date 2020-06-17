/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { CarFilterScreenTypes } from './actions'

export const fetchCityCoveragesLoading = (state) => ({
  ...state,
  cityCoveragesIsLoading: true,
  cityCoveragesErrorMessage: null,
})

export const fetchCityCoveragesSuccess = (state, { cityCoverages }) => ({
  ...state,
  cityCoverages: cityCoverages,
  cityCoveragesIsLoading: false,
  cityCoveragesErrorMessage: null,
})

export const fetchCityCoveragesFailure = (state, { errorMessage }) => ({
  ...state,
  cityCoverages: [],
  cityCoveragesIsLoading: false,
  cityCoveragesErrorMessage: errorMessage,
})

export const fetchRentDurationsLoading = (state) => ({
  ...state,
  rentDurationsIsLoading: true,
  rentDurationsErrorMessage: null,
})

export const fetchRentDurationsSuccess = (state, { rentDurations }) => ({
  ...state,
  rentDurations: rentDurations,
  rentDurationsIsLoading: false,
  rentDurationsErrorMessage: null,
})

export const fetchRentDurationsFailure = (state, { errorMessage }) => ({
  ...state,
  rentDurations: [],
  rentDurationsIsLoading: false,
  rentDurationsErrorMessage: errorMessage,
})

export const fetchAdjustmentRetailsLoading = (state) => ({
  ...state,
  adjustmentRetailsIsLoading: true,
  adjustmentRetailsErrorMessage: null,
})

export const fetchAdjustmentRetailsSuccess = (state, { adjustmentRetails }) => ({
  ...state,
  adjustmentRetails: adjustmentRetails,
  adjustmentRetailsIsLoading: false,
  adjustmentRetailsErrorMessage: null,
})

export const fetchAdjustmentRetailsFailure = (state, { errorMessage }) => ({
  ...state,
  adjustmentRetails: [],
  adjustmentRetailsIsLoading: false,
  adjustmentRetailsErrorMessage: errorMessage,
})

export const changeRentPackages = (state, { payload }) => ({
  ...state,
  rentPackages: payload,
})

export const changeSelectedHour = (state, { payload }) => ({
  ...state,
  selectedHour: payload,
})

export const changeSelectedMinute = (state, { payload }) => ({
  ...state,
  selectedMinute: payload,
})

export const changeSelectedCity = (state, { payload }) => ({
  ...state,
  selectedCity: payload,
})

export const changeSelectedDate = (state, { payload }) => ({
  ...state,
  selectedDate: payload,
})

export const changeSelectedPackage = (state, { payload }) => ({
  ...state,
  selectedPackage: payload,
})

export const changeSelectedPackageIndex = (state, { payload }) => ({
  ...state,
  selectedPackageIndex: payload,
})

export const changeDurations = (state, { payload }) => ({
  ...state,
  durations: payload,
})

export const changeSelectedDuration = (state, { payload }) => ({
  ...state,
  selectedDuration: payload,
})

export const changeSelectedDurationIndex = (state, { payload }) => ({
  ...state,
  selectedDurationIndex: payload,
})

export const changeEndDate = (state, { payload }) => ({
  ...state,
  endDate: payload,
})

export const changeActiveTab = (state, { payload }) => ({
  ...state,
  activeTab: payload,
})

export const changeProductId = (state, { payload }) => ({
  ...state,
  productId: payload,
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [CarFilterScreenTypes.FETCH_CITY_COVERAGES_LOADING]: fetchCityCoveragesLoading,
  [CarFilterScreenTypes.FETCH_CITY_COVERAGES_SUCCESS]: fetchCityCoveragesSuccess,
  [CarFilterScreenTypes.FETCH_CITY_COVERAGES_FAILURE]: fetchCityCoveragesFailure,
  [CarFilterScreenTypes.FETCH_RENT_DURATIONS_LOADING]: fetchRentDurationsLoading,
  [CarFilterScreenTypes.FETCH_RENT_DURATIONS_SUCCESS]: fetchRentDurationsSuccess,
  [CarFilterScreenTypes.FETCH_RENT_DURATIONS_FAILURE]: fetchRentDurationsFailure,
  [CarFilterScreenTypes.FETCH_ADJUSTMENT_RETAILS_LOADING]: fetchAdjustmentRetailsLoading,
  [CarFilterScreenTypes.FETCH_ADJUSTMENT_RETAILS_SUCCESS]: fetchAdjustmentRetailsSuccess,
  [CarFilterScreenTypes.FETCH_ADJUSTMENT_RETAILS_FAILURE]: fetchAdjustmentRetailsFailure,
  [CarFilterScreenTypes.CHANGE_RENT_PACKAGES]: changeRentPackages,
  [CarFilterScreenTypes.CHANGE_SELECTED_HOUR]: changeSelectedHour,
  [CarFilterScreenTypes.CHANGE_SELECTED_MINUTE]: changeSelectedMinute,
  [CarFilterScreenTypes.CHANGE_SELECTED_CITY]: changeSelectedCity,
  [CarFilterScreenTypes.CHANGE_SELECTED_DATE]: changeSelectedDate,
  [CarFilterScreenTypes.CHANGE_SELECTED_PACKAGE]: changeSelectedPackage,
  [CarFilterScreenTypes.CHANGE_SELECTED_PACKAGE_INDEX]: changeSelectedPackageIndex,
  [CarFilterScreenTypes.CHANGE_DURATIONS]: changeDurations,
  [CarFilterScreenTypes.CHANGE_SELECTED_DURATION]: changeSelectedDuration,
  [CarFilterScreenTypes.CHANGE_SELECTED_DURATION_INDEX]: changeSelectedDurationIndex,
  [CarFilterScreenTypes.CHANGE_END_DATE]: changeEndDate,
  [CarFilterScreenTypes.CHANGE_ACTIVE_TAB]: changeActiveTab,
  [CarFilterScreenTypes.CHANGE_PRODUCT_ID]: changeProductId,
})
