import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import Moment from 'moment'
import { Alert } from 'react-native'
import CartScreenActions from 'scenes/cartScreen/store/actions'
import CarFilterScreenActions from 'scenes/filter/store/actions'
import CartScreen from 'components/organism/cartScreen'
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

const CartContainer = ({
  navigation,
  cartDetails,
  cartDetailsIsLoading,
  cartDetailsErrorMessage,
  fetchCartDetails,
  deleteCartDetails,
  deleteCartDetailsIsLoading,
  deleteCartDetailsErrorMessage,
  deleteCartDetailsSuccessMessage,
  changeCartDetails,
  navigateToCheckout,
  checkoutValidationIsLoading,
  checkoutValidationErrorMessage,
  checkoutValidation,
  isInitialize,
  changeInitialize,
}) => {
  const forceUpdate = useForceUpdate()

  const [count, changeCount] = useState(0)

  const [amountValue, changeAmountValue] = useState(0)

  const [frontEndValidate, changeFrontEndValidate] = useState(true)

  useEffect(() => {
    async function initialize() {
      fetchCartDetails()
      validateOnFrontEnd()
    }
    const unsubscribe = navigation.addListener('willFocus', async () => {
      // The screen is focused
      // Call any action
      fetchCartDetails()
      validateOnFrontEnd()
    })
    initialize()

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [navigation])

  const validateOnFrontEnd = async () => {
    let checkValidate = true
    changeFrontEndValidate(true)
    let tempProductId = ''
    if (cartDetailsIsLoading && cartDetails.length > 0) {
      cartDetails.forEach((v) => {
        if (tempProductId !== '' && tempProductId !== v.MsProductId) {
          checkValidate = false
        } else {
          tempProductId = v.MsProductId
        }
      })
      changeFrontEndValidate(checkValidate)
    }
  }

  const changeItemsFunc = (val) => {
    changeCartDetails(val)
    let total = 0
    let countTemp = 0
    let items = cartDetails
    items.forEach((v) => {
      if (v.selected) {
        total = total + v.priceAmount
        countTemp++
      }
    })
    if (countTemp === items.length) {
      changeSelectedAllItems(true)
    } else {
      changeAmountValue(total)
      changeCount(countTemp)
    }
  }

  const onCheckoutPress = async () => {
    const payload = await AsyncStorage.getItem('cartInfos')
    const refreshErrorCarts = cartDetails
    if (frontEndValidate) {
      refreshErrorCarts.forEach((v) => {
        v.errors = []
      })
      changeCartDetails(refreshErrorCarts)
      if (cartDetails.length === 0) {
        Alert.alert('No item to checkout, please make your order')
        return
      }
      let checkAll = true
      cartDetails.forEach((v) => {
        if (!v.selected) {
          Alert.alert('Please select all items')
          checkAll = false
        }
      })
      if (checkAll) {
        checkoutValidation(payload)
        if (!checkoutValidationIsLoading && checkoutValidationErrorMessage) {
          Alert.alert('Invalid Cart, Please Edit the Cart before continue')
          const tempCarts = cartDetails
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
          changeCartDetails(tempCarts)
          navigateToCheckout()
        } else if (!checkoutValidationIsLoading && checkoutValidationErrorMessage === null) {
          navigateToCheckout()
        }
      }
    } else {
      Alert.alert('there are more than one products at cart, please edit first before proceed')
    }
  }

  const onDeleteButtonPress = async () => {
    const deletedIdArr = []
    cartDetails.forEach((v) => {
      if (v.selected) {
        deletedIdArr.push(v.id)
      }
    })

    if (deletedIdArr.length > 0) {
      const payload = {
        Id: deletedIdArr,
      }
      await deleteCartDetails(payload)
      await fetchCartDetails()
      validateOnFrontEnd()
    }
  }

  const changeSelectedAllItems = async (val) => {
    let total = 0
    let countTemp = 0
    const itemArr = cartDetails
    if (val === false) {
      itemArr.forEach((v) => {
        v.selected = false
      })
    } else {
      itemArr.forEach((v) => {
        v.selected = true
        total = total + v.priceAmount
        countTemp++
      })
    }
    changeCartDetails(itemArr)
    forceUpdate()
    changeAmountValue(total)
    changeCount(countTemp)
  }

  return (
    <CartScreen
      items={cartDetails}
      changeItems={changeItemsFunc}
      onCheckoutPress={onCheckoutPress}
      onDeleteButtonPress={onDeleteButtonPress}
      changeSelectedAllItems={changeSelectedAllItems}
      amountValue={amountValue}
      itemsLoading={cartDetailsIsLoading}
      count={count}
    />
  )
}

CartContainer.defaultProps = {
  cartDetails: [],
}

CartContainer.propTypes = {
  cartDetails: PropTypes.arrayOf(PropTypes.shape({})),
  cartDetailsIsLoading: PropTypes.bool,
  cartDetailsErrorMessage: PropTypes.string,
  fetchCartDetails: PropTypes.func,
  deleteCartDetails: PropTypes.func,
  deleteCartDetailsIsLoading: PropTypes.bool,
  deleteCartDetailsErrorMessage: PropTypes.string,
  deleteCartDetailsSuccessMessage: PropTypes.string,
  changeCartDetails: PropTypes.func,
  checkoutValidation: PropTypes.func,
  checkoutValidationIsLoading: PropTypes.bool,
  checkoutValidationErrorMessage: PropTypes.arrayOf(PropTypes.shape({})),
  isInitialize: PropTypes.bool,
  changeInitialize: PropTypes.func,
}

const mapStateToProps = (state) => ({
  cartDetails: state.cartScreen.cartDetails,
  cartDetailsIsLoading: state.cartScreen.cartDetailsIsLoading,
  cartDetailsErrorMessage: state.cartScreen.cartDetailsErrorMessage,
  deleteCartDetailsIsLoading: state.cartScreen.deleteCartDetailsIsLoading,
  deleteCartDetailsErrorMessage: state.cartScreen.deleteCartDetailsErrorMessage,
  deleteCartDetailsSuccessMessage: state.cartScreen.deleteCartDetailsSuccessMessage,
  checkoutValidationIsLoading: state.cartScreen.checkoutValidationIsLoading,
  checkoutValidationErrorMessage: state.cartScreen.checkoutValidationErrorMessage,
  isInitialize: state.cartScreen.isInitialize,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCartDetails: () => dispatch(CartScreenActions.fetchCartDetails()),
  deleteCartDetails: (payload) => dispatch(CartScreenActions.deleteCartDetails(payload)),
  changeCartDetails: (payload) => dispatch(CartScreenActions.changeCartDetails(payload)),
  navigateToCheckout: (payload) => dispatch(CartScreenActions.navigateToCheckout(payload)),
  checkoutValidation: (payload) => dispatch(CartScreenActions.checkoutValidation(payload)),
  changeInitialize: (payload) => dispatch(CartScreenActions.changeInitialize(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartContainer)
