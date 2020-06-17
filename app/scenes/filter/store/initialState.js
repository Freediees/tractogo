/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
  cityCoverages: [],
  cityCoveragesIsLoading: false,
  cityCoveragesErrorMessage: null,
  rentDurations: [],
  rentDurationsIsLoading: false,
  rentDurationsErrorMessage: null,
  adjustmentRetails: [],
  adjustmentRetailsIsLoading: false,
  adjustmentRetailsErrorMessage: null,
  rentPackages: [],
  selectedHour: '10',
  selectedMinute: '00',
  selectedCity: {},
  selectedDate: new Date(),
  selectedPackage: {},
  selectedPackageIndex: 0,
  durations: [],
  selectedDuration: {},
  selectedDurationIndex: {},
  endDate: new Date(),
  activeTab: 0,
  productId: 'PRD006',
}
