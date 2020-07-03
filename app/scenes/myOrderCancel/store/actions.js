import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchMasterReason: null,
  orderCancelLoading: null,
  orderCancelSuccess: ['payload'],
  orderCancelFailure: ['errorMessage'],
  changeBankData: ['payload'],
  fetchBankData: null,
  fetchBankDataLoading: null,
  fetchBankDataSuccess: ['payload'],
  fetchBankDataFailure: ['errorMessage'],
  changeReasons: ['payload'],
  postReservationCancel: ['payload'],
  postReservationCancelLoading: null,
  postReservationCancelFailure: ['errorMessage'],
  postReservationCancelSuccess: ['successMessage'],
})

export const MyOrderCancelTypes = Types
export default Creators
