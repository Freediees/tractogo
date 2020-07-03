import React, { useState, useEffect, useCallback } from 'react'
import { Alert, Linking } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import Moment from 'moment'
import PaymentScreenActions from 'scenes/paymentScreen/store/actions'
import PaymentScreenSuccess from 'components/organism/paymentSuccessScreen'
import AsyncStorage from '@react-native-community/async-storage'
import { saveFilterFunc, saveFilterObject, getFilterObject, pad } from 'function'
import { RENTAL_TIMEBASE } from 'config'

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const OrderDetailPayment = ({ navigation }) => {
  const forceUpdate = useForceUpdate()

  const { paymentItem } = navigation.state.params
  const [timer, changeTimer] = useState(14000)
  const [isRunning, changeIsRunning] = useState(false)

  useEffect(() => {
    async function initialize() {
      console.log(paymentItem)
      console.log(
        new Date(Moment(paymentItem.detail.WaitingForPaymentTime, 'YYYY-MM-DD hh:mm:ss.SSS')).getTime()
      )
      console.log(new Date().getTime())
      const timerCalc =
        (parseInt(
          new Date(Moment(paymentItem.detail.WaitingForPaymentTime, 'YYYY-MM-DD hh:mm:ss.SSS')).getTime()
        ) -
          parseInt(new Date().getTime())) /
        1000
      changeTimer(parseInt(timerCalc))
      changeIsRunning(true)
      forceUpdate()
      console.log(timerCalc)
      if (paymentItem.checkout_url) {
        const supported = await Linking.canOpenURL(paymentItem.checkout_url)

        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(paymentItem.checkout_url)
        } else {
          Alert.alert(`Don't know how to open this URL: ${paymentItem.checkout_url}`)
        }
      }
    }
    initialize()
  }, [])
  return (
    <PaymentScreenSuccess
      accountNumber={
        paymentItem.detail.reservation_payment_methods.VaNumber !== null &&
        paymentItem.detail.reservation_payment_methods.VaNumber !== ''
          ? paymentItem.detail.reservation_payment_methods.VaNumber
          : '-'
      }
      accountName={'Trac Astra'}
      totalAmount={paymentItem.detail.TotalPrice}
      orderNumber={paymentItem.detail.ReservationId}
      accountImageUri={paymentItem.detail.image}
      timer={timer}
      timerDate={Moment(paymentItem.detail.WaitingForPaymentTime, 'YYYY-MM-DD hh:mm:ss.SSS').format(
        'MMMM DD, YYYY'
      )}
      notes={`Setelah pembayaran Anda tertonfirmasi, kami akan mengirimkan bukti transaksi ke alamat email anda (${
        paymentItem.detail.details && paymentItem.detail.details.passengers && paymentItem.detail.details.passengers[0]
          ? paymentItem.detail.details.passengers[0].Email
          : ''
      })`}
      isTimerRunning={isRunning}
      onButtonPress={() => Alert.alert('to be develop')}
      onIconLeftPress={() => navigation.goBack()}
    />
  )
}

OrderDetailPayment.defaultProps = {}

OrderDetailPayment.propTypes = {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailPayment)
