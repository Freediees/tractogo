import React, { useState, useEffect, useCallback } from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import Moment from 'moment/min/moment-with-locales'
import OrderDetailWithDriverAction from 'scenes/orderDetailWithDriver/store/actions'
import OrderDetailSelfDriveAction from 'scenes/orderDetailSelfDrive/store/actions'
import CarFilterScreenActions from 'scenes/filter/store/actions'
import DetailItemSelfDrive from 'components/organism/detailItemSelfDrive'
import AsyncStorage from '@react-native-community/async-storage'
import { RENTAL_TIMEBASE, SERVICE_ID_SELF_DRIVE } from 'config'
import { getFilterObject, getUserProfileObject, pad } from 'function'
import { generateCheckoutPayload } from 'function/payloadGenerator'


export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const OrderDetailSelfDriveScreen = ({
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
  additionalItems,
  changeAdditionalItems,
}) => {
  const { item } = navigation.state.params

  const [updated, changeUpdated] = useState(false)
  const [initReady, changeInitReady] = useState(false)

  const [totalAmount, changeTotalAmount] = useState(item.discountedPrice || item.priceAmount)
  const [totalAmountTemp, changeTotalAmountTemp] = useState(item.discountedPrice || item.priceAmount)
  const [additionPersonName, changeAdditionPersonName] = useState('')
  const [additionPersonPhone, changeAdditionPersonPhone] = useState('')
  const [startDate, changeStartDate] = useState(new Date())
  const [endDate, changeEndDate] = useState(new Date())
  const [city, changeCity] = useState('')
  const [rentalPackage, changeRentalPackage] = useState()
  const [pickUpLocations, changePickUpLocations] = useState([])
  const [dropLocations, changeDropLocations] = useState([])
  const [personName, changePersonName] = useState('')
  const [personEmail, changePersonEmail] = useState('')
  const [selectedHour, changeSelectedHour] = useState('11')
  const [selectedMinute, changeSelectedMinute] = useState('00')
  const [schedules, changeSchedules] = useState([])
  const [schedulesDrop, changeSchedulesDrop] = useState([])
  const [checkedAdditionPerson, changeCheckedAdditionPerson] = useState(false)
  const [isValid, changeIsValid] = useState(false)
  const [returnToggle, changeReturnToggle] = useState(false)
  const forceUpdate = useForceUpdate()

  const refreshLocations = (newLocations) => {
    changePickUpLocations(newLocations)
    const tempExtras = additionalItems
    if (newLocations[0].priceExpedition) {
      if (newLocations[0].priceExpedition[0]) {
        tempExtras[tempExtras.length - 2].value = newLocations[0].priceExpedition[0].BasePrice
        tempExtras[tempExtras.length - 2].total = newLocations[0].priceExpedition[0].TotalPrice
        tempExtras[tempExtras.length - 2].count = newLocations[0].priceExpedition[0].Distance
        changeTotalAmount(totalAmountTemp + newLocations[0].priceExpedition[0].TotalPrice)
        changeAdditionalItems(tempExtras)
      } else {
        changeTotalAmount(totalAmountTemp)
        tempExtras[tempExtras.length - 2].value = 0
        tempExtras[tempExtras.length - 2].total = 0
        tempExtras[tempExtras.length - 2].count = 0
        changeAdditionalItems(extras)
      }
    }
    forceUpdate()
  }

  const refreshLocationsDrop = (newLocations) => {
    changeDropLocations(newLocations)
    const tempExtras = additionalItems
    if (newLocations[0].priceExpedition) {
      if (newLocations[0].priceExpedition[0]) {
        tempExtras[tempExtras.length - 1].value = newLocations[0].priceExpedition[0].BasePrice
        tempExtras[tempExtras.length - 1].total = newLocations[0].priceExpedition[0].TotalPrice
        tempExtras[tempExtras.length - 1].count = newLocations[0].priceExpedition[0].Distance
        changeTotalAmount(totalAmountTemp + newLocations[0].priceExpedition[0].TotalPrice)
        changeAdditionalItems(tempExtras)
      } else {
        changeTotalAmount(totalAmountTemp)
        tempExtras[tempExtras.length - 1].value = 0
        tempExtras[tempExtras.length - 1].total = 0
        tempExtras[tempExtras.length - 1].count = 0
        changeAdditionalItems(extras)
      }
    }
    forceUpdate()
  }

  const initSchedules = () => {
    let tempEndDate = Moment(endDate).toDate()
    let tempStartDate = new Date(startDate._d)
    let schedulesArr = []
    let schedulesArrDrop = []
    console.log(city)
    const newSchedules = {
      date: new Date(tempStartDate),
      notes: null,
      hour: selectedHour,
      minute: selectedMinute,
      location: {
        name: `Pool ${city.cityName}`,
        address: `${city.item.BranchName}`,
        lat: parseFloat(city.item.Latitude) || 0,
        lon: parseFloat(city.item.Longitude) || 0,
      },
      isPool: true,
      priceExpedition: [],
      price: 0,
      toggle: true,
    }
    schedulesArr.push(newSchedules)
    const newSchedulesDrop = {
      date: new Date(tempEndDate),
      notes: null,
      hour: selectedHour,
      minute: selectedMinute,
      location: {
        name: `Pool ${city.cityName}`,
        address: `${city.item.BranchName}`,
        lat: city.item.Latitude || 0,
        long: city.item.Longitude || 0,
      },
      isPool: true,
      priceExpedition: [],
      price: 0,
      toggle: true,
    }
    schedulesArrDrop.push(newSchedulesDrop)
    changeSchedulesDrop(schedulesArrDrop)
    changeDropLocations(schedulesArrDrop)
    changePickUpLocations(schedulesArr)
    changeSchedules(schedulesArr)
  }

  useEffect(() => {
    async function init() {
      const prdID = await AsyncStorage.getItem('prdID')
      const payload = {
        payload: {
          BusinessUnitId: item.item.businessUnitId,
          BranchId: item.item.branchId,
          MsProductId: prdID,
          ProductServiceId: SERVICE_ID_SELF_DRIVE,
        },
        item: item,
      }
      console.log(payload)

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
      fetchExtras(payload)
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
    <DetailItemSelfDrive
      onAddToCartPress={() => {
        navigateHome()
      }}
      onOkFooterPress={async () => {
        const userProfile = await getUserProfileObject()
        if (checkedAdditionPerson) {
          if (additionPersonPhone === '' || additionPersonName === '') {
            changeIsValid(false)
            Alert.alert('Informasi penumpang belum lengkap, silahkan periksa kembali')
            return
          }
        }
        // if (!userProfile.ImageSIM) {
        //   Alert.alert('SIM image not found')
        //   return false
        // }
        if (!pickUpLocations || pickUpLocations.length === 0) {
          changeIsValid(false)
          Alert.alert('Pilih lokasi pick up terlebih dahulu')
          return false
        }
        if (!dropLocations || dropLocations.length === 0) {
          changeIsValid(false)
          Alert.alert('Pilih lokasi drop terlebih dahulu')
          return false
        }
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
          dropLocations: dropLocations,
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
        const newPayload = await generateCheckoutPayload(payload)
        navigation.navigate('CheckoutScreen', { checkout: newPayload })
        // addCart(newPayload)
      }}
      returnToggle={returnToggle}
      changeReturnToggle={changeReturnToggle}
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
      onCheckedAdditionPerson={() => {
        changeCheckedAdditionPerson(!checkedAdditionPerson)
        changeAdditionPersonName('')
        changeAdditionPersonPhone('')
      }}
      onPressPickUpCTA={() => {
        navigation.navigate('LocationPickScreenSelfDrive', {
          locations: schedules,
          city: city,
          saveLocations: refreshLocations,
        })
      }}
      onPressReturnCTA={() => {
        navigation.navigate('LocationPickScreenSelfDrive', {
          locations: schedulesDrop,
          city: city,
          saveLocations: refreshLocationsDrop,
        })
      }}
    />
  )
}

OrderDetailSelfDriveScreen.defaultProps = {}

OrderDetailSelfDriveScreen.propTypes = {
  extras: PropTypes.arrayOf(PropTypes.shape({})),
  extrasIsLoading: PropTypes.bool,
  extrasErrorMessage: PropTypes.string,
  fetchExtras: PropTypes.func,
  addCart: PropTypes.func,
  addCartIsLoading: PropTypes.bool,
  addCartErrorMessage: PropTypes.string,
  addCartSuccessMessage: PropTypes.string,
  navigateHome: PropTypes.func,
  additionalItems: PropTypes.arrayOf(PropTypes.shape({})),
  changeAdditionalItems: PropTypes.func,
  
}

const mapStateToProps = (state) => ({
  extras: state.orderDetailSelfDrive.extrasSelfDrive,
  extrasIsLoading: state.orderDetailSelfDrive.extrasSelfDriveIsLoading,
  extrasErrorMessage: state.orderDetailSelfDrive.extrasSelfDriveErrorMessage,
  addCartIsLoading: state.orderDetailWithDriver.addCartIsLoading,
  addCartErrorMessage: state.orderDetailWithDriver.addCartErrorMessage,
  addCartSuccessMessage: state.orderDetailWithDriver.addCartSuccessMessage,
  additionalItems: state.orderDetailWithDriver.additionalItems,
})

const mapDispatchToProps = (dispatch) => ({
  fetchExtras: (payload) => dispatch(OrderDetailSelfDriveAction.fetchExtrasSelfDrive(payload)),
  addCart: (payload) => dispatch(OrderDetailWithDriverAction.addCart(payload)),
  navigateHome: () => dispatch(OrderDetailWithDriverAction.navigateHome()),
  changeAdditionalItems: (payload) => dispatch(OrderDetailWithDriverAction.changeAdditionalItems(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailSelfDriveScreen)
