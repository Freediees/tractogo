import { createActions } from 'reduxsauce'

  const { Types, Creators } = createActions({
    putPhoneno: ['payload'],  
    putPhonenoSuccess: ['phoneno'],
    putPhonenoFailure: ['errorMessage'],
  })
  
  export const PutphonenoTypes = Types
  export default Creators