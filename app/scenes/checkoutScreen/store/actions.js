import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  postCheckout: ['payload'],
  postCheckoutCC: ['payload'],
  postCheckoutLoading: null,
  postCheckoutSuccess: ['successMessage'],
  postCheckoutFailure: ['errorMessage'],
  postCheckoutWithoutCart: ['payload'],
  postCheckoutWithoutCartCC: ['payload'],
  postCheckoutWithoutCartLoading: null,
  postCheckoutWithoutCartSuccess: ['successMessage'],
  postCheckoutWithoutCartFailure: ['errorMessage'],
  fetchPaymentMethods: null,
  fetchPaymentMethodsLoading: null,
  fetchPaymentMethodsSuccess: ['paymentMethods'],
  fetchPaymentMethodsFailure: ['errorMessage'],
  changeSelectedPayment: ['payload'],
  changeCartItems: ['payload'],
  resetVoucher: null,
  checkVoucher: ['payload'],
  checkVoucherLoading: null,
  checkVoucherSuccess: ['successMessage'],
  checkVoucherFailure: ['errorMessage'],
  changePaymentDetailItems: ['payload'],
  changePaymentDetailItemsTemp: ['payload'],
  changeTotal: ['payload'],
})

export const CheckoutScreenTypes = Types
export default Creators
