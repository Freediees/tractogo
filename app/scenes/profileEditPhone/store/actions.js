import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    fetchPhoneNumber: ['payload'],
    fetchPhoneNumberLoading: null,
    fetchPhoneNumberSuccess: ['value'],
    fetchPhoneNumberFailure: ['message'],
})

export const ProfileEditPhoneTypes = Types
export default Creators