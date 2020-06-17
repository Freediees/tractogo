import { createActions } from 'reduxsauce'
const { Types, Creators } = createActions({
  fetchLoginVerify: ['payload'],
  fetchLoginVerifySuccess: ['verify'],
  fetchLoginVerifyFailure: ['errorMessage'],
})

export const LoginVerifyTypes = Types
export default Creators
