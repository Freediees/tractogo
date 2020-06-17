/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import Moment from 'moment'
import { Alert } from 'react-native'
import CheckoutScreenActions from 'scenes/checkoutScreen/store/actions'
import CartScreenActions from 'scenes/cartScreen/store/actions'
import Checkout from 'components/organism/checkOutScreen'
import AsyncStorage from '@react-native-community/async-storage'
import {
  saveFilterFunc,
  saveFilterObject,
  getFilterObject,
  pad,
  getUserProfileObject,
} from 'function'
import {
  CAR_RENTAL,
  AIRPORT_TRANSFER,
  BUS_RENTAL,
  SERVICE_ID_SELF_DRIVE,
  SERVICE_ID_WITH_DRIVER,
  RENTAL_TIMEBASE,
} from 'config'

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const CheckoutScreen = ({
  navigation,
  postCheckout,
  postCheckoutIsLoading,
  postCheckoutErrorMessage,
  postCheckoutSuccessMessage,
  postCheckoutWithoutCart,
  postCheckoutWithoutCartIsLoading,
  postCheckoutWithoutCartErrorMessage,
  postCheckoutWithoutCartSuccessMessage,
  paymentMethods,
  paymentMethodsIsLoading,
  paymentMethodsErrorMessage,
  fetchPaymentMethods,
  selectedPayment,
  changeSelectedPayment,
  cartItems,
  changeCartItems,
  checkoutValidationIsLoading,
  checkoutValidationErrorMessage,
  checkoutValidation,
  checkVoucher,
  checkVoucherIsLoading,
  checkVoucherErrorMessage,
  checkVoucherSuccessMessage,
  paymentDetailItems,
  paymentDetailItemsTemp,
  changePaymentDetailItems,
  changePaymentDetailItemsTemp,
  checkVoucherFailure,
  resetVoucher,
  total,
  changeTotal,
}) => {
  const forceUpdate = useForceUpdate()

  const { checkout, cartItem } = navigation.state.params

  const [voucherValue, changeVoucherValue] = useState('')

  const [totalAmount, changeTotalAmount] = useState(0)

  const [voucherParam, changeVoucherParam] = useState(null)

  const [paymentDetailsScreen, changePaymentDetailsScreen] = useState(null)

  const [termsChecked, changeChecked] = useState(false)

  useEffect(() => {
    async function initialize() {
      changeSelectedPayment(null)
      resetVoucher()
      const tempDetailPayment = []
      let voucherParam = {}
      let totalAmount = 0
      if (typeof checkout !== 'undefined' && checkout) {
        if (checkout.ReservationDetail && checkout.ReservationDetail[0]) {
          const item = checkout.ReservationDetail[0]
          totalAmount = parseInt(item.SubTotal) || item.Price
          voucherParam.business_unit_id = checkout.BusinessUnitId
          voucherParam.product_id = item.MsProductId
          voucherParam.product_service_id = item.MsProductServiceId
          let cartTitle = ''
          let carRentalLabel = ''
          if (item.MsProductId === CAR_RENTAL) {
            carRentalLabel = 'Sewa Mobil'
          } else if (item.MsProductId === AIRPORT_TRANSFER) {
            carRentalLabel = 'Airport Transfer'
          } else if (item.MsProductId === BUS_RENTAL) {
            carRentalLabel = 'Sewa Bus'
          }
          let rentalDriverLabel = ''
          if (item.MsProductServiceId === SERVICE_ID_WITH_DRIVER) {
            rentalDriverLabel = 'Dengan Sopir'
          } else if (item.MsProductServiceId === SERVICE_ID_SELF_DRIVE) {
            rentalDriverLabel = 'Tanpa Sopir'
          }
          if (rentalDriverLabel !== '') {
            cartTitle = `${carRentalLabel} - ${rentalDriverLabel}`
          } else {
            cartTitle = carRentalLabel
          }
          const newItem = {
            cardTitle: item.UnitTypeName,
            startDate: item.StartDate[0],
            endDate: item.EndDate[item.EndDate.length - 1],
            totalAmount: item.SubTotal || item.Price,
            rentHour: item.MsProductId === AIRPORT_TRANSFER ? '' : item.Duration,
            rentHourSuffix: item.MsProductId === AIRPORT_TRANSFER ? '' : 'Hours',
            city: item.CityName,
            cartTitle: cartTitle,
            errors: [],
          }
          const newArr = []
          newArr.push(newItem)
          changeCartItems(newArr)
          tempDetailPayment.push({
            name: newItem.cardTitle,
            total: newItem.totalAmount,
          })
        }
      } else if (typeof cartItem !== 'undefined' && cartItem) {
        voucherParam.business_unit_id = cartItem.BusinessUnitId
        voucherParam.product_id = cartItem.CartDetail[0].MsProductId
        voucherParam.product_service_id = cartItem.CartDetail[0].MsProductServiceId
        if (cartItem.CartDetail && cartItem.CartDetail) {
          const newArr = []
          cartItem.CartDetail.forEach((item) => {
            totalAmount = parseInt(totalAmount) + parseInt(item.SubTotal) || item.Price
            let cartTitle = ''
            let carRentalLabel = ''
            if (item.MsProductId === CAR_RENTAL) {
              carRentalLabel = 'Sewa Mobil'
            } else if (item.MsProductId === AIRPORT_TRANSFER) {
              carRentalLabel = 'Airport Transfer'
            } else if (item.MsProductId === BUS_RENTAL) {
              carRentalLabel = 'Sewa Bus'
            }
            let rentalDriverLabel = ''
            if (item.MsProductServiceId === SERVICE_ID_WITH_DRIVER) {
              rentalDriverLabel = 'Dengan Sopir'
            } else if (item.MsProductServiceId === SERVICE_ID_SELF_DRIVE) {
              rentalDriverLabel = 'Tanpa Sopir'
            }
            if (rentalDriverLabel !== '') {
              cartTitle = `${carRentalLabel} - ${rentalDriverLabel}`
            } else {
              cartTitle = carRentalLabel
            }
            const newItem = {
              cardTitle: item.UnitTypeName,
              startDate: item.StartDate[0],
              endDate: item.EndDate[item.EndDate.length - 1],
              totalAmount: item.SubTotal || item.Price,
              rentHour: item.MsProductId === AIRPORT_TRANSFER ? '' : item.Duration,
              rentHourSuffix: item.MsProductId === AIRPORT_TRANSFER ? '' : 'Hours',
              city: item.CityName,
              cartTitle: cartTitle,
              errors: [],
            }
            newArr.push(newItem)
            tempDetailPayment.push({
              name: newItem.cardTitle,
              total: newItem.totalAmount,
            })
          })
          changeCartItems(newArr)
        }
      }
      const user = await getUserProfileObject()
      voucherParam.user_id = user.Id
      changeTotal(totalAmount)
      changeVoucherParam(voucherParam)
      changePaymentDetailItems(tempDetailPayment)
      changePaymentDetailItemsTemp(tempDetailPayment)
      changePaymentDetailsScreen(tempDetailPayment)
      // fetchPaymentMethods()
    }
    initialize()
  }, [])

  const changePayment = (payload) => {
    changeSelectedPayment(payload)
    forceUpdate()
  }

  const paymentPress = async () => {
    if (!selectedPayment) {
      Alert.alert('Please choose payment method')
    } else {
      if (!termsChecked) {
        Alert.alert('Please read the terms and conditions, and check before proceed.')
        return
      }
      if (selectedPayment.PaymentMethodId === 'PYM-0002') {
        let cardInfo = selectedPayment
        cardInfo.totalAmount = total
        navigation.navigate('CreditCardScreen', {
          creditCardInfo: cardInfo,
          checkout: checkout,
          cartItem: cartItem,
        })
      } else {
        if (checkout) {
          console.log(checkout)
          checkoutValidation(checkout)
        } else {
          const payload = await AsyncStorage.getItem('cartInfos')
          checkoutValidation(payload)
        }
        if (!checkoutValidationIsLoading && checkoutValidationErrorMessage) {
          Alert.alert('Invalid Cart, Please Edit the Cart before continue')
          const tempCarts = cartItems
          if (checkoutValidationErrorMessage.backDateError) {
            const error = checkoutValidationErrorMessage.backDateError
            if (error && error.length > 0) {
              error.forEach((v) => {
                if (!tempCarts[v.index].errors.includes(v.message)) {
                  tempCarts[v.index].errors.push(v.message)
                }
              })
            }
          }
          if (checkoutValidationErrorMessage.discountError) {
            const error = checkoutValidationErrorMessage.discountError
            if (error && error.length > 0) {
              error.forEach((v) => {
                if (!tempCarts[v.index].errors.includes(v.message)) {
                  tempCarts[v.index].errors.push(v.message)
                }
              })
            }
          }
          if (checkoutValidationErrorMessage.priceError) {
            const error = checkoutValidationErrorMessage.priceError
            if (error && error.length > 0) {
              error.forEach((v) => {
                if (!tempCarts[v.index].errors.includes(v.message)) {
                  tempCarts[v.index].errors.push(v.message)
                }
              })
            }
          }
          if (checkoutValidationErrorMessage.stockError) {
            const error = checkoutValidationErrorMessage.stockError
            if (error && error.length > 0) {
              error.forEach((v) => {
                if (!tempCarts[v.index].errors.includes(v.message)) {
                  tempCarts[v.index].errors.push(v.message)
                }
              })
            }
          }
          changeCartItems(tempCarts)
          // navigateToCheckout()
        } else if (!checkoutValidationIsLoading && checkoutValidationErrorMessage === null) {
          const voucherArr = []
          if (checkVoucherSuccessMessage) {
            voucherArr.push(checkVoucherSuccessMessage)
          }
          if (checkout) {
            const payload = checkout
            payload.PaymentMethod = {
              PaymentMethodId: selectedPayment.PaymentMethodId,
              MsBankId: selectedPayment.MsBankId,
            }
            if (checkVoucherSuccessMessage) {
              checkout.ReservationDetail[0].ReservationPromo.push(checkVoucherSuccessMessage)
            }
            payload.image = selectedPayment.imageUri
            postCheckoutWithoutCart(payload)
          } else {
            const payload = {
              PaymentMethod: selectedPayment,
              ReservationPromo: voucherArr,
            }
            payload.PaymentMethod = {
              PaymentMethodId: selectedPayment.PaymentMethodId,
              MsBankId: selectedPayment.MsBankId,
            }
            payload.image = selectedPayment.imageUri
            postCheckout(payload)
          }
          // buat payload di sini
          // post checkout
          // navigateToCheckout()
        }
      }

      
    }
  }

  const checkVoucherPress = async () => {
    const payload = {
      payload: {
        voucher: voucherValue,
        params: voucherParam,
      },
      checkout: checkout,
      cartItem: cartItem,
      paymentItems: paymentDetailItemsTemp,
    }
    checkVoucher(payload)
  }

  return (
    <Checkout
      onPaymentSelectPress={() =>
        navigation.navigate('PaymentScreen', {
          selectedPayment: selectedPayment,
          changeSelectedPayment: changePayment,
        })
      }
      paymentType={
        selectedPayment && selectedPayment.PaymentMethodName
          ? selectedPayment.PaymentMethodName
          : null
      }
      uriImagePaymentType={
        selectedPayment && selectedPayment.imageUri ? selectedPayment.imageUri : null
      }
      checkVoucherPress={checkVoucherPress}
      paymentDetailItems={paymentDetailItems}
      paymentPress={paymentPress}
      onIconLeftPress={() => navigation.goBack()}
      voucherValue={voucherValue}
      onVoucherChange={changeVoucherValue}
      totalAmount={total}
      items={cartItems}
      voucherError={checkVoucherErrorMessage}
      isLoading={postCheckoutIsLoading || postCheckoutWithoutCartIsLoading || checkVoucherIsLoading}
      termsChecked={termsChecked}
      changeChecked={changeChecked}
    />
  )
}

CheckoutScreen.defaultProps = {}

CheckoutScreen.propTypes = {
  postCheckout: PropTypes.func,
  postCheckoutIsLoading: PropTypes.bool,
  postCheckoutErrorMessage: PropTypes.string,
  postCheckoutSuccessMessage: PropTypes.string,
  paymentMethods: PropTypes.arrayOf(PropTypes.shape({})),
  paymentMethodsIsLoading: PropTypes.bool,
  paymentMethodsErrorMessage: PropTypes.string,
  fetchPaymentMethods: PropTypes.func,
  cartItems: PropTypes.arrayOf(PropTypes.shape({})),
  changeCartItems: PropTypes.func,
  checkoutValidation: PropTypes.func,
  checkoutValidationIsLoading: PropTypes.bool,
  checkoutValidationErrorMessage: PropTypes.arrayOf(PropTypes.shape({})),
  checkVoucher: PropTypes.func,
  checkVoucherErrorMessage: PropTypes.string,
  checkVoucherIsLoading: PropTypes.bool,
  checkVoucherSuccessMessage: PropTypes.shape({}),
  paymentDetailItems: PropTypes.arrayOf(PropTypes.shape({})),
  changePaymentDetailItems: PropTypes.func,
  changePaymentDetailItemsTemp: PropTypes.func,
  resetVoucher: PropTypes.func,
  checkVoucherFailure: PropTypes.func,
  paymentDetailItemsTemp: PropTypes.arrayOf(PropTypes.shape({})),
  total: PropTypes.number,
  changeTotal: PropTypes.func,
  postCheckoutWithoutCart: PropTypes.func,
  postCheckoutWithoutCartIsLoading: PropTypes.bool,
  postCheckoutWithoutCartErrorMessage: PropTypes.string,
  postCheckoutWithoutCartSuccessMessage: PropTypes.string,
}

const mapStateToProps = (state) => ({
  postCheckoutIsLoading: state.checkout.postCheckoutIsLoading,
  postCheckoutErrorMessage: state.checkout.postCheckoutErrorMessage,
  postCheckoutSuccessMessage: state.checkout.postCheckoutSuccessMessage,
  postCheckoutWithoutCartIsLoading: state.checkout.postCheckoutWithoutCartIsLoading,
  postCheckoutWithoutCartErrorMessage: state.checkout.postCheckoutWithoutCartErrorMessage,
  postCheckoutWithoutCartSuccessMessage: state.checkout.postCheckoutWithoutCartSuccessMessage,
  paymentMethods: state.checkout.paymentMethods,
  paymentMethodsIsLoading: state.checkout.paymentMethodsIsLoading,
  paymentMethodsErrorMessage: state.checkout.paymentMethodsErrorMessage,
  selectedPayment: state.checkout.selectedPayment,
  cartItems: state.checkout.cartItems,
  checkoutValidationIsLoading: state.cartScreen.checkoutValidationIsLoading,
  checkoutValidationErrorMessage: state.cartScreen.checkoutValidationErrorMessage,
  checkVoucherIsLoading: state.checkout.checkVoucherIsLoading,
  checkVoucherErrorMessage: state.checkout.checkVoucherErrorMessage,
  checkVoucherSuccessMessage: state.checkout.checkVoucherSuccessMessage,
  paymentDetailItems: state.checkout.paymentDetailItems,
  paymentDetailItemsTemp: state.checkout.paymentDetailItemsTemp,
  total: state.checkout.total,
})

const mapDispatchToProps = (dispatch) => ({
  postCheckout: (payload) => dispatch(CheckoutScreenActions.postCheckout(payload)),
  postCheckoutWithoutCart: (payload) =>
    dispatch(CheckoutScreenActions.postCheckoutWithoutCart(payload)),
  fetchPaymentMethods: () => dispatch(CheckoutScreenActions.fetchPaymentMethods()),
  changeSelectedPayment: (payload) =>
    dispatch(CheckoutScreenActions.changeSelectedPayment(payload)),
  changeCartItems: (payload) => dispatch(CheckoutScreenActions.changeCartItems(payload)),
  checkoutValidation: (payload) => dispatch(CartScreenActions.checkoutValidation(payload)),
  checkVoucher: (payload) => dispatch(CheckoutScreenActions.checkVoucher(payload)),
  changePaymentDetailItems: (payload) =>
    dispatch(CheckoutScreenActions.changePaymentDetailItems(payload)),
  changePaymentDetailItemsTemp: (payload) =>
    dispatch(CheckoutScreenActions.changePaymentDetailItemsTemp(payload)),
  checkVoucherFailure: (payload) => dispatch(CheckoutScreenActions.checkVoucherFailure(payload)),
  resetVoucher: (payload) => dispatch(CheckoutScreenActions.resetVoucher(payload)),
  changeTotal: (payload) => dispatch(CheckoutScreenActions.changeTotal(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutScreen)
