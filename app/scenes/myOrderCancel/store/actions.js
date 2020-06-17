import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchMasterReason: null,
  orderCancelLoading: null,
  orderCancelSuccess: ['payload'],
  orderCancelFailure: ['errorMessage'],
})

export const MyOrderCancelTypes = Types
export default Creators
