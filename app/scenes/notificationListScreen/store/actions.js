import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchNotificationsTransaction: [],
  fetchNotificationsTransactionLoading: null,
  fetchNotificationsTransactionSuccess: ['transaction'],
  fetchNotificationsTransactionFailure: ['errorMessageTransaction'],
  fetchNotificationsUpdate: [],
  fetchNotificationsUpdateLoading: null,
  fetchNotificationsUpdateSuccess: ['update'],
  fetchNotificationsUpdateFailure: ['errorMessageUpdate'],
  updateNotifications: ['payload'],
  updateNotificationsLoading: null,
  updateNotificationsSuccess: ['successMessage'],
  updateNotificationsFailure: ['errorMessage'],
})

export const NotificationScreenTypes = Types
export default Creators
