import { createActions } from 'reduxsauce'
const { Types, Creators } = createActions({
  fetchLoginVerify: ['payload'],
  fetchLoginVerifySuccess: ['verify'],
  fetchLoginVerifyFailure: ['errorMessage'],
  fetchLoginLoading: null,
  sendingDeviceToken: ['payload'],
  sendingDeviceTokenSuccess: ['sendingTokenSuccess'],
  sendingDeviceTokenFailure: ['errorMessage'],
  sendingDeviceTokenLoading: null,
})

export const LoginVerifyTypes = Types
export default Creators
