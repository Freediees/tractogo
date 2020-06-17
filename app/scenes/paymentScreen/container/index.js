import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { Alert } from 'react-native'
import I18n from 'react-native-i18n'
import Moment from 'moment'
import PaymentScreenActions from 'scenes/paymentScreen/store/actions'
import Payment from 'components/organism/paymentScreen'
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

const PaymentScreen = ({
  navigation,
  paymentMethods,
  paymentMethodsIsLoading,
  paymentMethodsErrorMessage,
  fetchPaymentMethods,
  bankData,
  vaData,
  changeBankData,
  changeVaData,
}) => {
  const forceUpdate = useForceUpdate()

  const { selectedPayment, changeSelectedPayment } = navigation.state.params

  const [cardNo, changeCardNo] = useState('')
  const [cardName, changeCardName] = useState('')
  const [month, changeMonth] = useState('')
  const [year, changeYear] = useState('')
  const [cvv, changeCvv] = useState('')
  const [selectedBank, changeSelectedBank] = useState(null)
  const [selectedVA, changeSelectedVA] = useState(null)
  

  const onSaveBank = () => {
    if (selectedBank) {
      changeSelectedPayment(selectedBank)
      navigation.goBack()
    } else {
      Alert.alert('Please Choose Payment Methods')
    }
    
  }

  const onSaveVA = () => {
    if (selectedVA) {
      changeSelectedPayment(selectedVA)
      navigation.goBack()
    } else {
      Alert.alert('Please Choose Payment Methods')
    }
  }

  const onSaveCreditCard = () => {
    const newData = {
      PaymentMethodId: 'PYM-0002',
      PaymentMethodName: 'Credit Card',
      MsBankId: 8,
      bankid: 'Credit Card',
      cardNo: cardNo,
      cardName: cardName,
      month: month,
      year: year,
      cvv: cvv,
    }
    changeSelectedPayment(newData)
    navigation.goBack()
  }

  useEffect(() => {
    async function initialize() {
      console.log(selectedPayment)
      fetchPaymentMethods()
      if (selectedPayment) {
        if (selectedPayment.PaymentMethodId) {
          if (selectedPayment.PaymentMethodId === 'CC') {
            changeCardName(selectedPayment.cardName)
            changeCardNo(selectedPayment.cardNo)
            changeMonth(selectedPayment.month)
            changeYear(selectedPayment.year)
            changeCvv(selectedPayment.cvv)
          } else {
            if (selectedPayment.PaymentMethodName === 'Virtual Accounnt') {
              changeSelectedBank(selectedPayment)
            } else {
              changeSelectedVA(selectedPayment)
            }
          }
        }
      }
    }
    initialize()
  }, [])

  return (
    <Payment
      isLoading={paymentMethodsIsLoading}
      cardNo={cardNo}
      changeCardNo={changeCardNo}
      cardName={cardName}
      changeCardName={changeCardName}
      month={month}
      changeMonth={changeMonth}
      year={year}
      changeYear={changeYear}
      cvv={cvv}
      changeCvv={changeCvv}
      selectedBank={selectedBank}
      changeSelectedBank={changeSelectedBank}
      selectedVA={selectedVA}
      changeSelectedVA={changeSelectedVA}
      bankData={bankData}
      vaData={vaData}
      onSaveCreditCard={() => onSaveCreditCard()}
      onSaveBank={() => onSaveBank()}
      onSaveVA={() => onSaveVA()}
      onIconLeftPress={() => navigation.goBack()}
    />
  )
}

PaymentScreen.defaultProps = {}

PaymentScreen.propTypes = {
  paymentMethods: PropTypes.arrayOf(PropTypes.shape({})),
  paymentMethodsIsLoading: PropTypes.bool,
  paymentMethodsErrorMessage: PropTypes.string,
  bankData: PropTypes.arrayOf(PropTypes.shape({})),
  vaData: PropTypes.arrayOf(PropTypes.shape({})),
  fetchPaymentMethods: PropTypes.func,
}

const mapStateToProps = (state) => ({
  paymentMethods: state.payment.paymentMethods,
  paymentMethodsIsLoading: state.payment.paymentMethodsIsLoading,
  paymentMethodsErrorMessage: state.payment.paymentMethodsErrorMessage,
  bankData: state.payment.bankData,
  vaData: state.payment.vaData,
})

const mapDispatchToProps = (dispatch) => ({
  fetchPaymentMethods: () => dispatch(PaymentScreenActions.fetchPaymentMethods()),
  changeBankData: (payload) => dispatch(PaymentScreenActions.changeBankData(payload)),
  changeVaData: (payload) => dispatch(PaymentScreenActions.changeVaData(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentScreen)
