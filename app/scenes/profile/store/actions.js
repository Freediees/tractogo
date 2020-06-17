import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchProfile: ['payload'],
  fetchProfileSuccess: ['profile'],
  fetchProfileFailure: ['errorMessage'],
  doLogout: null,
})

export const ProfileTypes = Types
export default Creators
