import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Moment from 'moment/min/moment-with-locales'
import myOrderCancelActions from 'scenes/myOrderCancel/store/actions'
import MyOrderCancel from 'components/organism/myOrderCancelScreen'

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const MyOrderCancelContainer = ({
  navigation,
  cancelOrder,
  fetchMasterReason,
  masterReason,
  bankData,
  fetchBankData,
  changeReasons,
  postReservationCancel,
  postReservationIsLoading,
  postReservationErrorMessage,
  postReservationSuccessMessage,
}) => {
  const { item, reservation } = navigation.state.params
  const [accountNumber, changeAccountNumber] = useState('')
  const [accountName, changeAccountName] = useState('')
  const [otherReason, changeOtherReason] = useState('')
  const [bankName, changeBankName] = useState('')
  const [selectedItem, changeSelectedItem] = useState(null)

  useEffect(() => {
    async function initialize() {
      fetchMasterReason()
      fetchBankData()
    }
    console.log(item)
    initialize()
  }, [])

  const onPressSubmit = async () => {
    console.log('testtt')
    let newPayload = {}
    if (reservation.Status === 'BOSID-007') {
      if (selectedItem === null) {
        alert('Please Select Cancellation Reason')
        return
      }
      if (selectedItem.item.Id === 'CNL-003') {
        if (otherReason || otherReason === '') {
          alert('Bank Name cannot be empty')
          return
        }
      }
      if (bankName === null || bankName === '') {
        alert('Bank Name cannot be empty')
        return
      }
      if (accountNumber === null || accountNumber === '') {
        alert('Account Number cannot be empty')
        return
      }
      if (accountName === null || accountName === '') {
        alert('Account Name cannot be empty')
        return
      }
      newPayload = {
        CancellationReasonId: selectedItem.item.IdCancelOM,
        CancellationReason:
          otherReason !== null && otherReason !== '' ? otherReason : selectedItem.item.Description,
        ReservationId: item[0].ReservationId,
        NoRekening: accountNumber,
        BankName: bankName,
        BankAccountName: accountName,
      }
      console.log(newPayload)
    } else {
      newPayload = {
        CancellationReasonId: selectedItem.item.IdCancelOM,
        CancellationReason:
          otherReason !== null && otherReason !== '' ? otherReason : selectedItem.item.Description,
        ReservationId: item[0].ReservationId,
      }
      console.log(newPayload)
    }
    postReservationCancel(newPayload)
    console.log(postReservationIsLoading)
  }

  return (
    <MyOrderCancel
      onIconLeftPress={() => navigation.goBack()}
      isRefund={reservation.Status !== 'BOSID-010'}
      accountNumber={accountNumber}
      changeAccountNumber={changeAccountNumber}
      accountName={accountName}
      changeAccountName={changeAccountName}
      reasons={masterReason}
      changeSelectedItem={changeSelectedItem}
      bankData={bankData}
      bankName={bankName}
      setBankName={changeBankName}
      otherReason={otherReason}
      changeOtherReason={changeOtherReason}
      changeReasons={changeReasons}
      onSubmit={onPressSubmit}
      isLoadingCancel={postReservationIsLoading}
    />
  )
}

MyOrderCancelContainer.defaultProps = {
  postReservationIsLoading: false,
}

MyOrderCancelContainer.propTypes = {
  postReservationIsLoading: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  masterReason: state.cancelOrder.masterReason,
  cancelOrderLoading: state.cancelOrder.orderCancelIsLoading,
  bankData: state.cancelOrder.bankData,
  postReservationIsLoading: state.cancelOrder.postReservationIsLoading,
  postReservationErrorMessage: state.cancelOrder.postReservationErrorMessage,
  postReservationSuccessMessage: state.cancelOrder.postReservationSuccessMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchMasterReason: () => dispatch(myOrderCancelActions.fetchMasterReason()),
  fetchBankData: () => dispatch(myOrderCancelActions.fetchBankData()),
  changeReasons: (payload) => dispatch(myOrderCancelActions.changeReasons(payload)),
  postReservationCancel: (payload) => dispatch(myOrderCancelActions.postReservationCancel(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOrderCancelContainer)
