import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchDistance: ['payload'],
  fetchDistanceLoading: null,
  fetchDistanceSuccess: ['data'],
  fetchDistanceFailure: ['errorMessage'],
  clearDistance: null,
  fetchPriceExpedition: ['payload'],
  fetchPriceExpeditionLoading: null,
  fetchPriceExpeditionSuccess: ['data'],
  fetchPriceExpeditionFailure: ['errorMessage'],
  clearPriceExpedition: null,
})

export const LocationPickScreenSelfDriveTypes = Types
export default Creators
