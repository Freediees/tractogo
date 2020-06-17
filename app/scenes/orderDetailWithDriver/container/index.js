import React, { useState, useEffect, useCallback } from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import Moment from 'moment'
import { NavigationActions, StackActions } from 'react-navigation'
import OrderDetailWithDriverAction from 'scenes/orderDetailWithDriver/store/actions'
import CarFilterScreenActions from 'scenes/filter/store/actions'
import CartScreenActions from 'scenes/cartScreen/store/actions'
import DetailItemWithDriver from 'components/organism/detailItemWithDriver'
import AsyncStorage from '@react-native-community/async-storage'
import { RENTAL_TIMEBASE, SERVICE_ID_WITH_DRIVER } from 'config'
import { getFilterObject, getUserProfileObject, pad } from 'function'
import { generateAddCartPayload, generateCheckoutPayload } from 'function/payloadGenerator'

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const OrderDetailWithDriverScreen = ({
  navigation,
  extras,
  extrasIsLoading,
  extrasErrorMessage,
  fetchExtras,
  addCart,
  addCartIsLoading,
  addCartErrorMessage,
  addCartSuccessMessage,
  navigateHome,
  changeInitialize,
  additionalItems,
  changeAdditionalItems,
}) => {
  const { item } = navigation.state.params

  const [updated, changeUpdated] = useState(false)
  const [initReady, changeInitReady] = useState(false)

  const [totalAmount, changeTotalAmount] = useState(item.discountedPrice || item.priceAmount)
  const [additionPersonName, changeAdditionPersonName] = useState('')
  const [additionPersonPhone, changeAdditionPersonPhone] = useState('')
  const [startDate, changeStartDate] = useState(new Date())
  const [endDate, changeEndDate] = useState(new Date())
  const [city, changeCity] = useState('')
  const [rentalPackage, changeRentalPackage] = useState()
  const [pickUpLocations, changePickUpLocations] = useState([])
  const [personName, changePersonName] = useState('')
  const [personEmail, changePersonEmail] = useState('')
  const [selectedHour, changeSelectedHour] = useState('11')
  const [selectedMinute, changeSelectedMinute] = useState('00')
  const [schedules, changeSchedules] = useState([])
  const [checkedAdditionPerson, changeCheckedAdditionPerson] = useState(false)
  const [isValid, changeIsValid] = useState(false)
  const forceUpdate = useForceUpdate()

  const refreshLocations = (newLocations) => {
    changePickUpLocations(newLocations)
    forceUpdate()
  }

  const initSchedules = () => {
    let tempEndDate = Moment(endDate).toDate()
    let tempStartDate = new Date(startDate._d)
    let schedulesArr = []
    for (
      tempStartDate;
      tempStartDate <= tempEndDate;
      tempStartDate.setDate(tempStartDate.getDate() + 1)
    ) {
      const tempDate = tempStartDate
      const newSchedules = {
        date: new Date(tempDate),
        notes: null,
        hour: selectedHour,
        minute: selectedMinute,
        location: {
          name: null,
          lat: -6.2,
          lon: 106.816666,
        },
        toggle: true,
      }
      schedulesArr.push(newSchedules)
    }
    changeSchedules(schedulesArr)
  }

  useEffect(() => {
    async function init() {
      // BusinessUnitId
      // BranchId
      // MsProductId
      // ProductServiceId
      const prdID = await AsyncStorage.getItem('prdID')
      const payload = {
        payload: {
          BusinessUnitId: item.item.businessUnitId,
          BranchId: item.item.branchId,
          MsProductId: prdID,
          ProductServiceId: SERVICE_ID_WITH_DRIVER,
        },
        item: item,
      }
      console.log(payload)

      fetchExtras(payload)

      const filterObject = await getFilterObject()
      if (filterObject.selectedCity.cityName) {
        changeCity(filterObject.selectedCity)
      }
      if (filterObject.selectedHour) {
        changeSelectedHour(filterObject.selectedHour)
      }
      if (filterObject.selectedMinute) {
        changeSelectedMinute(filterObject.selectedMinute)
      }
      if (filterObject.selectedDate) {
        changeStartDate(Moment(filterObject.selectedDate))
      }
      if (filterObject.selectedEndDate) {
        changeEndDate(filterObject.selectedEndDate)
      }
      if (filterObject.endDate) {
        changeEndDate(Moment(filterObject.endDate))
      }
      if (filterObject.selectedPackage) {
        changeRentalPackage(filterObject.selectedPackage)
      }
      const userProfile = await getUserProfileObject()
      if (userProfile) {
        changePersonName(`${userProfile.FirstName} ${userProfile.LastName}`)
        changePersonEmail(`${userProfile.EmailPersonal}`)
      }
      changeInitReady(true)
    }
    init()
  }, [])

  if (initReady && !updated) {
    initSchedules()
    changeUpdated(true)
    console.log(extras)
  }

  /*
  if (!addCartIsLoading) {
    if (addCartErrorMessage) {
      Alert.alert(addCartErrorMessage)
    }
    if (addCartSuccessMessage) {
      Alert.alert(addCartSuccessMessage)
    }
  }
  */

  return (
    <DetailItemWithDriver
      onAddToCartPress={() => {
        navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
          })
        )
        navigation.navigate('Cart')
      }}
      onCancelFooterPress={async () => {
        if (checkedAdditionPerson) {
          if (additionPersonPhone === '' || additionPersonName === '') {
            changeIsValid(false)
            Alert.alert('Informasi penumpang belum lengkap, silahkan periksa kembali')
            return false
          }
        } else {
          changeIsValid(true)
        }
        if (!pickUpLocations || pickUpLocations.length === 0) {
          changeIsValid(false)
          Alert.alert('Pilih lokasi pick up terlebih dahulu')
          return false
        }
        forceUpdate()
        changeIsValid(true)
        let tempPriceExtra = 0
        let tempPriceExpedition = 0
        additionalItems.forEach((v) => {
          if (v.type !== '-' && v.type !== 'discount') {
            tempPriceExtra = tempPriceExtra + v.total
          } else {
            if (v.type !== 'discount') {
              tempPriceExpedition = tempPriceExpedition + v.total
            }
          }
        })
        let tempPriceDiscount = item.discountedPrice
        let tempSubtotal = item.discountedPrice + tempPriceExtra + tempPriceExpedition
        const payload = {
          item: item,
          isWithDriver: true,
          startDate: new Date(startDate._d),
          endDate: new Date(endDate),
          pickUpLocations: pickUpLocations,
          dropLocations: pickUpLocations,
          reservationExtras: additionalItems,
          totalAmount: totalAmount,
          hour: selectedHour,
          minute: selectedMinute,
          city: city,
          PriceExtras: tempPriceExtra,
          PriceExpedition: tempPriceExpedition,
          PriceDiscount: item.discountedPrice,
          SubTotal: tempSubtotal,
          additionalPersonName: checkedAdditionPerson ? additionPersonName : null,
          additionalPersonPhone: checkedAdditionPerson ? additionPersonPhone : null,
          reservationPromo: [item.priceInformation.PriceDiscount || null],
          duration:
            rentalPackage && rentalPackage.item && rentalPackage.item.Duration
              ? rentalPackage.item.Duration
              : '0',
        }
        const newPayload = await generateAddCartPayload(payload)
        console.log(newPayload)
        addCart(newPayload)
        if (addCartErrorMessage) {
          Alert.alert(addCartErrorMessage)
          return false
        } else {
          // changeInitialize(true)
          return true
        }
      }}
      onOkFooterPress={async () => {
        console.log('testtt checkout')
        const userProfile = await getUserProfileObject()
        console.log('testtt checkout')
        if (checkedAdditionPerson) {
          if (additionPersonPhone === '' || additionPersonName === '') {
            changeIsValid(false)
            Alert.alert('Informasi penumpang belum lengkap, silahkan periksa kembali')
            return
          }
        }
        if (
          !pickUpLocations ||
          pickUpLocations.length === 0 ||
          pickUpLocations[0].location.name === null
        ) {
          changeIsValid(false)
          Alert.alert('Pilih lokasi pick up terlebih dahulu')
          return false
        }
        console.log('testtt valid')
        changeIsValid(true)
        let tempPriceExtra = 0
        let tempPriceExpedition = 0
        additionalItems.forEach((v) => {
          if (v.type !== '-' && v.type !== 'discount') {
            tempPriceExtra = tempPriceExtra + v.total
          } else {
            if (v.type !== 'discount') {
              tempPriceExpedition = tempPriceExpedition + v.total
            }
          }
        })
        let tempPriceDiscount = item.discountedPrice
        let tempSubtotal = item.discountedPrice + tempPriceExtra + tempPriceExpedition
        const payload = {
          item: item,
          isWithDriver: true,
          startDate: new Date(startDate._d),
          endDate: new Date(endDate),
          pickUpLocations: pickUpLocations,
          dropLocations: pickUpLocations,
          reservationExtras: additionalItems,
          totalAmount: totalAmount,
          hour: selectedHour,
          minute: selectedMinute,
          city: city,
          PriceExtras: tempPriceExtra,
          PriceExpedition: tempPriceExpedition,
          PriceDiscount: item.discountedPrice,
          SubTotal: tempSubtotal,
          additionalPersonName: checkedAdditionPerson ? additionPersonName : null,
          additionalPersonPhone: checkedAdditionPerson ? additionPersonPhone : null,
          reservationPromo: [item.priceInformation.PriceDiscount || null],
          duration:
            rentalPackage && rentalPackage.item && rentalPackage.item.Duration
              ? rentalPackage.item.Duration
              : '0',
        }
        console.log(payload)
        const newPayload = await generateCheckoutPayload(payload)
        console.log(newPayload)
        navigation.navigate('CheckoutScreen', { checkout: newPayload })
        // addCart(newPayload)
      }}
      isValid={isValid}
      personName={personName}
      personEmail={personEmail}
      city={city.cityName}
      startDate={startDate}
      endDate={endDate}
      rentHour={`${
        rentalPackage && rentalPackage.item && rentalPackage.item.Duration
          ? rentalPackage.item.Duration
          : '0'
      }`}
      additionPersonName={additionPersonName}
      additionPersonPhone={additionPersonPhone}
      onChangeAdditionPersonName={changeAdditionPersonName}
      onChangeAdditionPersonPhone={changeAdditionPersonPhone}
      totalAmount={totalAmount}
      changeTotalAmount={changeTotalAmount}
      additionalItems={additionalItems}
      changeAdditionalItems={changeAdditionalItems}
      item={item}
      onIconLeftPress={() => navigation.goBack()}
      pickUpLocations={schedules}
      onCheckedAdditionPerson={() => {
        changeCheckedAdditionPerson(!checkedAdditionPerson)
        changeAdditionPersonName('')
        changeAdditionPersonPhone('')
      }}
      onPressPickUpCTA={() => {
        navigation.navigate('LocationPickScreen', {
          locations: schedules,
          city: city,
          saveLocations: refreshLocations,
        })
      }}
      onEditPress={() => {
        navigation.navigate('LocationPickScreen', {
          locations: schedules,
          city: city,
          saveLocations: refreshLocations,
        })
      }}
    />
  )
}

OrderDetailWithDriverScreen.defaultProps = {}

OrderDetailWithDriverScreen.propTypes = {
  extras: PropTypes.arrayOf(PropTypes.shape({})),
  extrasIsLoading: PropTypes.bool,
  extrasErrorMessage: PropTypes.string,
  fetchExtras: PropTypes.func,
  addCart: PropTypes.func,
  addCartIsLoading: PropTypes.bool,
  addCartErrorMessage: PropTypes.string,
  addCartSuccessMessage: PropTypes.string,
  navigateHome: PropTypes.func,
  changeInitialize: PropTypes.func,
  additionalItems: PropTypes.arrayOf(PropTypes.shape({})),
  changeAdditionalItems: PropTypes.func,
}

const mapStateToProps = (state) => ({
  extras: state.orderDetailWithDriver.extras,
  extrasIsLoading: state.orderDetailWithDriver.extrasIsLoading,
  extrasErrorMessage: state.orderDetailWithDriver.extrasErrorMessage,
  addCartIsLoading: state.orderDetailWithDriver.addCartIsLoading,
  addCartErrorMessage: state.orderDetailWithDriver.addCartErrorMessage,
  addCartSuccessMessage: state.orderDetailWithDriver.addCartSuccessMessage,
  additionalItems: state.orderDetailWithDriver.additionalItems,
})

const mapDispatchToProps = (dispatch) => ({
  fetchExtras: (payload) => dispatch(OrderDetailWithDriverAction.fetchExtras(payload)),
  addCart: (payload) => dispatch(OrderDetailWithDriverAction.addCart(payload)),
  navigateHome: () => dispatch(OrderDetailWithDriverAction.navigateHome()),
  changeInitialize: (payload) => dispatch(OrderDetailWithDriverAction.changeInitialize(payload)),
  changeAdditionalItems: (payload) =>
    dispatch(OrderDetailWithDriverAction.changeAdditionalItems(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailWithDriverScreen)
