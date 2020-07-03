import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchPaymentDetail: ['payload'],
  fetchPaymentDetailLoading: null,
  fetchPaymentDetailSuccess: ['paymentDetail'],
  fetchPaymentDetailFailure: ['errorMessage'],
})

export const MyOrderDetailTypes = Types
export default Creators
