import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchLogin: ['payload'],
  fetchLoginSuccess: ['user'],
  fetchLoginFailure: ['errorMessage'],
  fetchLoginSocialite: ['payload'],
  fetchLoginSocialiteSuccess: ['user'],
  fetchLoginSocialiteFailure: ['errorMessage'],
})

export const LoginTypes = Types
export default Creators
