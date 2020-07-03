import React, { useState, useEffect, useCallback } from 'react'
import { Linking } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Moment from 'moment'
import MyOrderDetailActions from 'scenes/myOrderDetail/store/actions'
import { doResolveLoginRoute } from 'function/apiRequest'
import DetailItemMyOrder from 'components/organism/detailItemMyOrder'
import NavigationService from 'services/navigationService'

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const MyOrderDetailContainer = ({
  navigation,
  paymentDetail,
  paymentDetailIsLoading,
  paymentDetailErrorMessage,
  fetchPaymentDetail,
}) => {
  const forceUpdate = useForceUpdate()
  const { item, reservation } = navigation.state.params
  const [modalCancel, changeModalCancel] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerCalc, setIsTimerCalc] = useState(0)

  useEffect(() => {
    async function initialize() {
      fetchPaymentDetail(reservation.noReservasiLabel)
      console.log(reservation)
    }
    if (paymentDetail && paymentDetail.detail && paymentDetail.detail.WaitingForPaymentTime) {
      const timerCalcTemp =
        (parseInt(
          new Date(
            Moment(paymentDetail.detail.WaitingForPaymentTime, 'YYYY-MM-DD hh:mm:ss.SSS')
          ).getTime()
        ) -
          parseInt(new Date().getTime())) /
        1000
      if (timerCalcTemp > 0) {
        setIsTimerCalc(timerCalcTemp)
        setIsTimerRunning(true)
      }
    }
    initialize()
  }, [])

  return (
    <DetailItemMyOrder
      onIconLeftPress={() => navigation.goBack()}
      item={item}
      paymentDetail={paymentDetail}
      timer={timerCalc}
      isTimerRunning={isTimerRunning}
      onPressEReceipt={async () => {
        await Linking.openURL(reservation.eReceipt)
      }}
      onPressAction={() => {
        navigation.navigate('MyOrderCancel', { item: item, reservation: reservation })
      }}
      onClosePress={() => changeModalCancel(false)}
      modalCancel={modalCancel}
      changeModalCancel={changeModalCancel}
      onPressCancel={() => {
        changeModalCancel(true)
      }}
      onPressPayment={() => {
        if (item[0].paymentStatusLabel === 'WAITING_FOR_PAYMENT') {
          console.log('klik payment')
          navigation.navigate('OrderPaymentDetail', { paymentItem: paymentDetail })
        }
      }}
    />
  )
}

MyOrderDetailContainer.defaultProps = {
  paymentDetail: {},
}

MyOrderDetailContainer.propTypes = {
  paymentDetail: PropTypes.shape({}),
  paymentDetailIsLoading: PropTypes.bool,
  paymentDetailErrorMessage: PropTypes.string,
  fetchPaymentDetail: PropTypes.func,
}

const mapStateToProps = (state) => ({
  paymentDetail: state.orderDetail.paymentDetail,
  paymentDetailIsLoading: state.orderDetail.paymentDetailIsLoading,
  paymentDetailErrorMessage: state.orderDetail.paymentDetailErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchPaymentDetail: (value) => dispatch(MyOrderDetailActions.fetchPaymentDetail(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOrderDetailContainer)
