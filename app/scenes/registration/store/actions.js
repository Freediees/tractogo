import { createActions } from 'reduxsauce'
const { Types, Creators } = createActions({
  fetchRegister: ['payload'],
  fetchRegisterLoading: null,
  fetchRegisterSuccess: ['register'],
  fetchRegisterFailure: ['errorMessage'],
})

export const RegisterTypes = Types
export default Creators
