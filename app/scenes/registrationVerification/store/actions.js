import { createActions } from 'reduxsauce'
const { Types, Creators } = createActions({
    fetchRegisterVerify: ['payload'],
    fetchRegisterVerifyLoading: null,
    fetchRegisterVerifySuccess: ['verify'],
    fetchRegisterVerifyFailure: ['errorMessage'],
  })
  
  export const RegisterVerifyTypes = Types
  export default Creators
