import { call, put } from 'redux-saga/effects'
import { getCartDetailsRequest } from 'services/orderService'
import { userService } from 'services/userService'
import NotificationScreenAction from 'scenes/notificationListScreen/store/actions'

function* fetchTransactionNotifications() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(NotificationScreenAction.fetchNotificationsTransactionLoading())

  // Fetch user informations from an API
  // isi seperti ini
  // const json = yield call(commonService.getStocksRequest, payload)
  console.log('otw fetch notif transaction')
  const json = yield call(userService.getNotificationByUser, 'transaction')
  if (json) {
    // create the object here
    const dataArr = []
    if (json.Data) {
      json.Data.forEach((item) => {
        let newData = {
          titleText: item.Title,
          contentText: item.Message,
          dateText: item.created_at,
          item: item,
        }
        dataArr.push(newData)
      })
      yield put(NotificationScreenAction.fetchNotificationsTransactionSuccess(dataArr))
    }
  } else {
    yield put(
      NotificationScreenAction.fetchNotificationsTransactionFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

function* fetchUpdateNotifications() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(NotificationScreenAction.fetchNotificationsUpdateLoading())

  // Fetch user informations from an API
  // isi seperti ini
  // const json = yield call(commonService.getStocksRequest, payload)
  console.log('otw fetch notif update')
  const json = yield call(userService.getNotificationByUser, 'update')
  if (json) {
    // create the object here
    const dataArr = []
    if (json.Data) {
      json.Data.forEach((item) => {
        let newData = {
          titleText: item.Title,
          contentText: item.Message,
          dateText: item.created_at,
          item: item,
        }
        dataArr.push(newData)
      })
      yield put(NotificationScreenAction.fetchNotificationsUpdateSuccess(dataArr))
    }
  } else {
    yield put(
      NotificationScreenAction.fetchNotificationsUpdateFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

function* updateNotifications({ payload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(NotificationScreenAction.updateNotificationsLoading())

  // Fetch user informations from an API
  // const json = yield call(orderService.postAddCart, payload)
  const json = null
  if (json) {
    // create the object here
    if (json) {
      if (json.Status === 201) {
        if (json.ErrorMessage !== null && json.ErrorMessage !== '') {
          yield put(NotificationScreenAction.updateNotificationsFailure(json.ErrorMessage))
        } else {
          yield put(NotificationScreenAction.updateNotificationsSuccess('Success adding to cart'))
        }
      }
    }
  } else {
    yield put(
      NotificationScreenAction.updateNotificationsFailure(
        'There was an error while fetching data informations.'
      )
    )
  }
}

export { fetchTransactionNotifications, fetchUpdateNotifications, updateNotifications }
