import { call, put } from 'redux-saga/effects'
import { getCartDetailsRequest, orderService } from 'services/orderService'
import { paymentService } from 'services/paymentService'

import CheckoutScreenAction from 'scenes/checkoutScreen/store/actions'
import NavigationService from 'services/navigationService'
import { Alert } from 'react-native'
import Moment from 'moment'
import { changePaymentDetailItemsTemp } from '../store/reducers'

function* postCheckout({ payload }) {
  yield put(CheckoutScreenAction.postCheckoutLoading())
  try {
    console.log('test payload cart checkout')
    console.log(payload)
    const json = yield call(orderService.postCheckout, payload)
    if (json) {
      if (json.Data) {
        yield put(CheckoutScreenAction.postCheckoutSuccess(json.Data))
        json.Data.image = payload.image
        yield NavigationService.navigateAndReset('Home')
        yield NavigationService.navigate('PaymentSuccessScreen', { paymentItem: json.Data })
      }
    }
  } catch (error) {
    console.log({ error })
    Alert.alert(error.message)
    yield put(CheckoutScreenAction.postCheckoutFailure(error))
  }
}

function* postCheckoutWithoutCart({ payload }) {
  yield put(CheckoutScreenAction.postCheckoutWithoutCartLoading())
  console.log(payload)
  try {
    // const json = yield call(getCartDetailsRequest)
    const json = yield call(orderService.postCheckoutWithoutCart, payload)
    if (json) {
      if (json.Data) {
        yield put(CheckoutScreenAction.postCheckoutWithoutCartSuccess(json.Data))
        yield NavigationService.navigateAndReset('Home')
        json.Data.image = payload.image
        yield NavigationService.navigate('PaymentSuccessScreen', { paymentItem: json.Data })
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
          if (typeof payload.checkout !== 'undefined' && payload.checkout) {
            if (payload.checkout.ReservationDetail) {
              payload.checkout.ReservationDetail.forEach((v) => {
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
                })
              }
            }
          }
          if (invalid) {
            console.log('ini invalid')
            yield put(CheckoutScreenAction.checkVoucherFailure('Invalid Promo for Cart Items'))
          } else {
            // calculate
            const paymentItems = payload.paymentItems
            let discountVal = 0
            if (json.data.type_value === 'nominal') {
              discountVal = parseInt(json.data.value) * -1
            } else {
              discountVal = ((parseInt(json.data.value) * total) / 100) * -1
            }
            paymentItems.push({
              name: json.data.code,
              total: discountVal,
            })
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
          }
          // check voucher in here validity vehicle and start date and end date
        }
      }
    }
  } catch (error) {
    yield put(CheckoutScreenAction.checkVoucherFailure('Error Promo'))
  }
}

export { postCheckout, fetchPaymentMethods, checkVoucher, postCheckoutWithoutCart }
