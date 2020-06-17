import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchCartDetails: null,
  fetchCartDetailsLoading: null,
  fetchCartDetailsSuccess: ['cartDetails'],
  fetchCartDetailsFailure: ['errorMessage'],
  deleteCartDetails: ['payload'],
  deleteCartDetailsLoading: null,
  deleteCartDetailsSuccess: ['successMessage'],
  deleteCartDetailsFailure: ['errorMessage'],
  changeCartDetails: ['payload'],
  checkoutValidation: ['payload'],
  checkoutValidationCart: ['payload'],
  checkoutValidationLoading: null,
  checkoutValidationSuccess: ['checkoutValidation'],
  checkoutValidationFailure: ['errorMessage'],
  navigateToCheckout: ['payload'],
  changeInitialize: ['payload'],
})

export const CartScreenTypes = Types
export default Creators
