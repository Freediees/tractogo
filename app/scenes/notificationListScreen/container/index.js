import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import Moment from 'moment'
import NotificationScreenActions from 'scenes/notificationListScreen/store/actions'
import CarFilterScreenActions from 'scenes/filter/store/actions'
import AsyncStorage from '@react-native-community/async-storage'
import NotificationScreen from 'components/organism/notificationScreen'
import { saveFilterFunc, saveFilterObject, getFilterObject, pad } from 'function'

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const NotificationListScreen = ({
  navigation,
  fetchNotificationsTransaction,
  notificationsTransaction,
  notificationsTransactionIsLoading,
  notificationsTransactionErrorMessage,
  fetchNotificationsUpdate,
  notificationsUpdate,
  notificationsUpdateIsLoading,
  notificationsUpdateErrorMessage,
  updateNotifications,
  updateNotificationsIsLoading,
  updateNotificationsSuccessMessage,
  updateNotificationsErrorMessage,
}) => {
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    async function initialize() {
      fetchNotificationsTransaction()
      fetchNotificationsUpdate()
    }
    initialize()
  }, [])

  return (
    <NotificationScreen
      onIconLeftPress={() => navigation.goBack()}
      transactionItems={notificationsTransaction}
      updateItems={notificationsUpdate}
      screenTitle={'Notification'}
      tab1Label={`Transaction ${
        notificationsTransaction && notificationsTransaction.length > 0
          ? `(${notificationsTransaction.length})`
          : ''
      }`}
      tab2Label={`Update ${
        notificationsUpdate && notificationsUpdate.length > 0
          ? `(${notificationsUpdate.length})`
          : ''
      }`}
    />
  )
}

NotificationListScreen.defaultProps = {
  notificationsTransaction: [],
  notificationsUpdate: [],
}

NotificationListScreen.propTypes = {
  notificationsTransaction: PropTypes.arrayOf(PropTypes.shape({})),
  notificationsTransactionIsLoading: PropTypes.bool,
  notificationsTransactionErrorMessage: PropTypes.string,
  notificationsUpdate: PropTypes.arrayOf(PropTypes.shape({})),
  notificationsUpdateIsLoading: PropTypes.bool,
  notificationsUpdateErrorMessage: PropTypes.string,
  fetchNotificationsTransaction: PropTypes.func,
  fetchNotificationsUpdate: PropTypes.func,
  updateNotifications: PropTypes.func,
  updateNotificationsIsLoading: PropTypes.bool,
  updateNotificationsSuccessMessage: PropTypes.string,
  updateNotificationsErrorMessage: PropTypes.string,
}

const mapStateToProps = (state) => ({
  notificationsTransaction: state.notification.notificationsTransaction,
  notificationsTransactionIsLoading: state.notification.notificationsTransactionIsLoading,
  notificationsTransactionErrorMessage: state.notification.notificationsTransactionErrorMessage,
  notificationsUpdate: state.notification.notificationsUpdate,
  notificationsUpdateIsLoading: state.notification.notificationsUpdateIsLoading,
  notificationsUpdateErrorMessage: state.notification.notificationsUpdateErrorMessage,
  updateNotificationsIsLoading: state.notification.updateNotificationsIsLoading,
  updateNotificationsSuccessMessage: state.notification.updateNotificationsSuccessMessage,
  updateNotificationsErrorMessage: state.notification.updateNotificationsErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchNotificationsTransaction: () =>
    dispatch(NotificationScreenActions.fetchNotificationsTransaction()),
  fetchNotificationsUpdate: () => dispatch(NotificationScreenActions.fetchNotificationsUpdate()),
  updateNotifications: (payload) =>
    dispatch(NotificationScreenActions.updateNotifications(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationListScreen)
