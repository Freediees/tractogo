import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchOrdersActive: null,
  fetchOrdersActiveLoading: null,
  fetchOrdersActiveSuccess: ['ordersActive'],
  fetchOrdersActiveFailure: ['errorMessage'],
  fetchOrdersComplete: null,
  fetchOrdersCompleteLoading: null,
  fetchOrdersCompleteSuccess: ['ordersComplete'],
  fetchOrdersCompleteFailure: ['errorMessage'],
  fetchOrdersCancel: null,
  fetchOrdersCancelLoading: null,
  fetchOrdersCancelSuccess: ['ordersCancel'],
  fetchOrdersCancelFailure: ['errorMessage'],
})

export const MyOrderScreenTypes = Types
export default Creators
