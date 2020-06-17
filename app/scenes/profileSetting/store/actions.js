import { createActions } from 'reduxsauce'
const { Types, Creators } = createActions({
    putProfile: ['payload'],
    putProfileSuccess: ['profile'],
    putProfileFailure: ['errorMessage'],
    putProfileLoading: null,
  })
  
  export const PutprofileTypes = Types
  export default Creators
