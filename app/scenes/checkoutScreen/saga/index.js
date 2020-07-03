import { call, put } from 'redux-saga/effects'
import { getCartDetailsRequest, orderService } from 'services/orderService'
import { paymentService } from 'services/paymentService'

import CheckoutScreenAction from 'scenes/checkoutScreen/store/actions'
import NavigationService from 'services/navigationService'
import { Alert, Linking } from 'react-native'
import Moment from 'moment'
import { changePaymentDetailItemsTemp } from '../store/reducers'

function* postCheckout({ payload }) {
  yield put(CheckoutScreenAction.postCheckoutLoading())
  const json = yield call(orderService.postCheckout, payload)
  if (json) {
    console.log(json)
    if (json.Error) {
      Alert.alert(json.Error.message)
      yield put(CheckoutScreenAction.postCheckoutFailure(json.Error))
    } else {
      if (json.Data) {
        console.log({ json })
        if (json.Data.PaymentTransaction.checkout_url) {
          const supported = Linking.canOpenURL(json.Data.PaymentTransaction.checkout_url)

          supported.then((data) => {
            if (data) {
              Linking.openURL(json.Data.PaymentTransaction.checkout_url)
            } else {
              Alert.alert(
                `Don't know how to open this URL: ${json.Data.PaymentTransaction.checkout_url}`
              )
            }
          })
        }
        json.Data.image = payload.image
        yield NavigationService.navigateAndReset('Cart')
        yield NavigationService.navigate('Home')
        if (payload.PaymentMethod.PaymentMethodId === 'PYM-0001') {
          yield NavigationService.navigate('PaymentSuccessScreen', { paymentItem: json.Data })
        }
        console.log('navigate dulu')
        yield put(CheckoutScreenAction.postCheckoutSuccess(json.Data))
      } else if (json.ErrorMessage && json.ErrorMessage !== '') {
        Alert.alert(json.ErrorMessage)
        yield put(CheckoutScreenAction.postCheckoutFailure(json.ErrorMessage))
      }
    }
  } else {
    yield put(CheckoutScreenAction.postCheckoutFailure('There was an error'))
  }
}

function* postCheckoutCC({ payload }) {
  yield put(CheckoutScreenAction.postCheckoutLoading())
  const json = yield call(orderService.postCheckout, payload)
  if (json) {
    if (json.Error) {
      Alert.alert(json.Error.message)
      yield NavigationService.goBack()
    } else {
      if (json.Data) {
        json.Data.image = payload.image
        Alert.alert('Payment has been accepted')
        yield NavigationService.navigateAndReset('MainScreen')
        yield NavigationService.navigate('Home')
        yield put(CheckoutScreenAction.postCheckoutSuccess(json.Data))
      } else if (json.ErrorMessage && json.ErrorMessage !== '') {
        Alert.alert(json.ErrorMessage)
        yield put(CheckoutScreenAction.postCheckoutFailure(json.ErrorMessage))
      }
    }
  } else {
    Alert.alert('There was an error')
    yield put(CheckoutScreenAction.postCheckoutFailure('There was an error'))
  }
}

function* postCheckoutWithoutCart({ payload }) {
  yield put(CheckoutScreenAction.postCheckoutWithoutCartLoading())
  console.log({ payload })
  try {
    // const json = yield call(getCartDetailsRequest)
    const json = yield call(orderService.postCheckoutWithoutCart, payload)
    if (json) {
      if (json.Data) {
        console.log({ json })
        if (json.Data.PaymentTransaction.checkout_url) {
          const supported = Linking.canOpenURL(json.Data.PaymentTransaction.checkout_url)

          supported.then((data) => {
            if (data) {
              Linking.openURL(json.Data.PaymentTransaction.checkout_url)
            } else {
              Alert.alert(
                `Don't know how to open this URL: ${json.Data.PaymentTransaction.checkout_url}`
              )
            }
          })
        }
        yield NavigationService.navigateAndReset('Home')
        json.Data.image = payload.image
        if (payload.PaymentMethod.PaymentMethodId === 'PYM-0001') {
          yield NavigationService.navigate('PaymentSuccessScreen', { paymentItem: json.Data })
        }
        console.log('sini dong postCheckoutWithoutCart ')
        yield put(CheckoutScreenAction.postCheckoutWithoutCartSuccess(json.Data))
      } else if (json.ErrorMessage && json.ErrorMessage !== '') {
        Alert.alert(json.ErrorMessage)
        yield put(CheckoutScreenAction.postCheckoutWithoutCartFailure(json.ErrorMessage))
      }
    }
  } catch (error) {
    console.log({ error })
    Alert.alert(error.message)
    yield put(CheckoutScreenAction.postCheckoutWithoutCartFailure(error))
  }
}

function* postCheckoutWithoutCartCC({ payload }) {
  yield put(CheckoutScreenAction.postCheckoutWithoutCartLoading())
  console.log(payload)
  try {
    // const json = yield call(getCartDetailsRequest)
    const json = yield call(orderService.postCheckoutWithoutCart, payload)
    if (json) {
      if (json.Error) {
        Alert.alert(json.Error.message)
        yield NavigationService.goBack()
      } else {
        if (json.Data) {
          yield put(CheckoutScreenAction.postCheckoutWithoutCartSuccess(json.Data))
          yield NavigationService.navigateAndReset('Home')
          Alert.alert('Payment has been accepted')
          json.Data.image = payload.image
        } else if (json.ErrorMessage && json.ErrorMessage !== '') {
          Alert.alert(json.ErrorMessage)
          yield put(CheckoutScreenAction.postCheckoutWithoutCartFailure(json.ErrorMessage))
        }
      }
    }
  } catch (error) {
    console.log({ error })
    Alert.alert(error.message)
    yield put(CheckoutScreenAction.postCheckoutWithoutCartFailure(error))
  }
}

function* fetchPaymentMethods() {
  yield put(CheckoutScreenAction.fetchPaymentMethodsLoading())
  try {
    const json = yield call(paymentService.getPaymentMethods)
    if (json) {
      console.log(json)
      if (json.Data) {
        yield put(CheckoutScreenAction.fetchPaymentMethodsSuccess(json.Data))
      }
    }
  } catch (error) {
    yield put(CheckoutScreenAction.fetchPaymentMethodsFailure(error))
  }
}

function* checkVoucher({ payload }) {
  yield put(CheckoutScreenAction.checkVoucherLoading())
  console.log('check voucher')
  console.log(payload.paymentItems)
  if (
    typeof payload.paymentItems[payload.paymentItems.length - 1].isVoucher !== 'undefined' &&
    payload.paymentItems[payload.paymentItems.length - 1].isVoucher === true
  ) {
    let total = 0
    payload.paymentItems.pop()
    payload.paymentItems.forEach((v) => {
      total = parseInt(total) + parseInt(v.total)
    })
    yield put(CheckoutScreenAction.changeTotal(total))
  }
  try {
    const json = yield call(paymentService.getRedeemVoucher, payload.payload)
    if (json) {
      console.log(json)
      if (json.message) {
        Alert.alert(json.message)
        yield put(CheckoutScreenAction.checkVoucherFailure(json.message))
      }
      if (json.data) {
        if (json.data !== null) {
          let invalid = false

          let total = 0
          let totalBasePrice = 0
          if (typeof payload.checkout !== 'undefined' && payload.checkout) {
            if (payload.checkout.ReservationDetail) {
              payload.checkout.ReservationDetail.forEach((v) => {
                console.log(v)
                if (json.data.is_all_branch === 0) {
                  let count = 0
                  json.data.branch_id.forEach((y) => {
                    if (y.branch_id !== v.BranchId) {
                      count++
                    }
                  })
                  if (count === json.data.branch_id.length) {
                    console.log('invalid')
                    invalid = true
                  }
                }
                if (json.data.is_all_vehicle === 0) {
                  let count = 0
                  json.data.vehicle_id.forEach((y) => {
                    if (y.vehicle_id !== v.UnitTypeId) {
                      count++
                    }
                  })
                  if (count === json.data.vehicle_id.length) {
                    invalid = true
                    console.log('invalid')
                  }
                }
                if (
                  Moment(json.data.start_date, 'YYYY-MM-DD HH:mm:ss').isAfter(
                    Moment(v.StartDate[0])
                  )
                ) {
                  invalid = true
                  console.log('invalid')
                }
                if (
                  Moment(json.data.end_date, 'YYYY-MM-DD HH:mm:ss').isBefore(
                    Moment(v.EndDate[v.EndDate.length - 1])
                  )
                ) {
                  invalid = true
                  console.log('invalid')
                }
                console.log(v.SubTotal)
                total = total + parseInt(v.SubTotal)
                totalBasePrice = totalBasePrice = parseInt(v.Price)
              })
            }
          } else if (typeof payload.cartItem !== 'undefined' && payload.cartItem) {
            if (typeof payload.cartItem !== 'undefined' && payload.cartItem) {
              if (payload.cartItem.CartDetail) {
                payload.cartItem.CartDetail.forEach((v) => {
                  if (json.data.is_all_branch === 0) {
                    console.log('test cart item check all branch')
                    let count = 0
                    json.data.branch_id.forEach((y) => {
                      if (y.branch_id !== v.BranchId) {
                        count++
                      }
                    })
                    if (count === json.data.branch_id.length) {
                      invalid = true
                      console.log('invalid')
                    }
                  }
                  if (json.data.is_all_vehicle === 0) {
                    console.log('test cart item check all vehicle')
                    let count = 0
                    json.data.vehicle_id.forEach((y) => {
                      if (y.vehicle_id !== v.UnitTypeId) {
                        count++
                      }
                    })
                    if (count === json.data.vehicle_id.length) {
                      invalid = true
                      console.log('invalid')
                    }
                  }
                  if (
                    Moment(json.data.start_date, 'YYYY-MM-DD HH:mm:ss').isAfter(
                      Moment(v.StartDate[0])
                    )
                  ) {
                    invalid = true
                    console.log('invalid')
                  }
                  if (
                    Moment(json.data.end_date, 'YYYY-MM-DD HH:mm:ss').isBefore(
                      Moment(v.EndDate[v.EndDate.length - 1])
                    )
                  ) {
                    invalid = true
                    console.log('invalid')
                  }
                  total = total + parseInt(v.SubTotal)
                  totalBasePrice = totalBasePrice = parseInt(v.Price)
                })
              }
            }
          }
          if (invalid) {
            console.log('ini invalid')
            yield put(CheckoutScreenAction.checkVoucherFailure('Invalid Promo for Cart Items'))
          } else {
            // calculate
            console.log(json.data)
            console.log(payload.paymentItems)
            if (json.status !== 404) {
              const paymentItems = payload.paymentItems
              let discountVal = 0
              if (json.data.type_value === 'nominal') {
                discountVal = parseInt(json.data.value) * -1
              } else {
                discountVal = ((parseInt(json.data.value) * totalBasePrice) / 100) * -1
              }
              if (json.data.max_nominal_usage) {
                if (discountVal <= parseInt(json.data.max_nominal_usage)) {
                  if (paymentItems[paymentItems.length - 1].name !== json.data.code) {
                    if (parseInt(discountVal) >= parseInt(total)) {
                      discountVal = parseInt(total)
                    }
                    paymentItems.push({
                      name: json.data.code,
                      total: discountVal,
                      isVoucher: true,
                    })
                  }
                } else {
                  discountVal = parseInt(json.data.max_nominal_usage)
                  if (paymentItems[paymentItems.length - 1].name !== json.data.code) {
                    if (parseInt(discountVal) >= parseInt(total)) {
                      discountVal = parseInt(total)
                    }
                    paymentItems.push({
                      name: json.data.code,
                      total: discountVal,
                      isVoucher: true,
                    })
                  }
                }
              } else {
                if (paymentItems[paymentItems.length - 1].name !== json.data.code) {
                  if (parseInt(discountVal) >= parseInt(total)) {
                    discountVal = parseInt(total)
                  }
                  paymentItems.push({
                    name: json.data.code,
                    total: discountVal,
                    isVoucher: true,
                  })
                }
              }
              const discounted = parseInt(total) + parseInt(discountVal)
              console.log(total)
              console.log(discountVal)
              console.log(discounted)
              yield put(CheckoutScreenAction.changePaymentDetailItems(paymentItems))
              yield put(CheckoutScreenAction.changeTotal(discounted))
              const voucherPayload = {
                PromoCode: json.data.code,
                CategoryPromoId: json.data.category_id,
                CategoryPromoName: 'Redeemed Code',
                TypeValue: json.data.type_value,
                Value: json.data.value,
                IsCombine: json.data.is_combine,
              }
              yield put(CheckoutScreenAction.checkVoucherSuccess(voucherPayload))
            } else {
              yield put(CheckoutScreenAction.checkVoucherFailure('Voucher Not Found'))
            }
          }
          // check voucher in here validity vehicle and start date and end date
        }
      } else {
        yield put(CheckoutScreenAction.checkVoucherFailure('Voucher Invalid'))
      }
    } else {
      yield put(CheckoutScreenAction.checkVoucherFailure('Error Promo'))
    }
  } catch (error) {
    yield put(CheckoutScreenAction.checkVoucherFailure('Error Promo'))
  }
}

export {
  postCheckout,
  postCheckoutCC,
  fetchPaymentMethods,
  checkVoucher,
  postCheckoutWithoutCart,
  postCheckoutWithoutCartCC,
}
