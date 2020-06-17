import React, { useState, useEffect, useCallback } from 'react'
import Moment from 'moment'
import { connect } from 'react-redux'
import DetailItemAirport from 'components/organism/detailItemAirport'
import { getFilterObject, getUserProfileObject, pad } from 'function'
import { Alert } from 'react-native'
import {
  generateAirportCheckoutPayload,
  generateAirportAddCartPayload,
} from 'function/payloadGenerator'
import { PropTypes } from 'prop-types'
import OrderDetailWithDriverAction from 'scenes/orderDetailWithDriver/store/actions'
import { NavigationActions, StackActions } from 'react-navigation'

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const OrderDetailAirportScreen = ({
  navigation,
  addCart,
  addCartIsLoading,
  addCartErrorMessage,
  addCartSuccessMessage,
}) => {
  const { item, isFromAirport, reservationDetails } = navigation.state.params

  const [updated, changeUpdated] = useState(false)
  const [initReady, changeInitReady] = useState(false)
  const [isValid, changeIsValid] = useState(false)
  const forceUpdate = useForceUpdate()

  const [gateNumber, changeGateNumber] = useState('')
  const [flightNumber, changeFlightNumber] = useState('')
  const [personName, changePersonName] = useState('')
  const [personEmail, changePersonEmail] = useState('')
  const [checkedAdditionPerson, changeCheckedAdditionPerson] = useState(false)
  const [additionPersonName, changeAdditionPersonName] = useState('')
  const [additionPersonPhone, changeAdditionPersonPhone] = useState('')
  const [totalAmount, changeTotalAmount] = useState(item.discountedPrice || item.priceAmount)
  const [pickupFromAddressNotes, changePickupNotes] = useState('')

  useEffect(() => {
    async function initialize() {
      console.log({ item })
      console.log({ isFromAirport })
      console.log({ reservationDetails })

      const userProfile = await getUserProfileObject()
      if (userProfile) {
        changePersonName(`${userProfile.FirstName} ${userProfile.LastName}`)
        changePersonEmail(`${userProfile.EmailPersonal}`)
      }
      changeInitReady(true)
    }
    initialize()
  }, [])

  if (initReady && !updated) {
    changeUpdated(true)
  }

  return (
    <DetailItemAirport
      title={isFromAirport ? 'From Airport' : 'To Airport'}
      subtitle={Moment(Moment.utc(reservationDetails.date.formatedSelectedDate).toDate())
        .local()
        .format('dddd, DD MMMM | HH:mm')}
      onIconLeftPress={() => navigation.goBack()}
      isFromAirport={isFromAirport}
      airportName={reservationDetails.airport.Airport}
      gateNumber={gateNumber}
      flightNumber={flightNumber}
      onChangeGateNumber={changeGateNumber}
      onChangeFlightNumber={changeFlightNumber}
      personName={personName}
      personEmail={personEmail}
      additionPersonName={additionPersonName}
      additionPersonPhone={additionPersonPhone}
      onChangeAdditionPersonName={changeAdditionPersonName}
      onChangeAdditionPersonPhone={changeAdditionPersonPhone}
      item={item}
      isValid={isValid}
      totalAmount={totalAmount}
      changeTotalAmount={changeTotalAmount}
      pickUpLocations={[
        {
          date: new Date(Moment(Moment.utc(reservationDetails.date.formatedSelectedDate).toDate())),
          notes: null,
          hour: Moment(Moment.utc(reservationDetails.date.formatedSelectedDate).toDate())
            .local()
            .format('HH'),
          minute: Moment(Moment.utc(reservationDetails.date.formatedSelectedDateate).toDate())
            .local()
            .format('mm'),
          location: {
            name: reservationDetails.city.address,
            lat: reservationDetails.city.lat,
            lon: reservationDetails.city.lon,
          },
        },
      ]}
      pickupNotes={pickupFromAddressNotes}
      onChangePickupNotes={changePickupNotes}
      onCheckedAdditionPerson={() => {
        changeCheckedAdditionPerson(!checkedAdditionPerson)
        changeAdditionPersonName('')
        changeAdditionPersonPhone('')
      }}
      onOkFooterPress={async () => {
        if ((isFromAirport && flightNumber === '') || (isFromAirport && gateNumber === '')) {
          Alert.alert('Please provide your flight information')
          return false
        }
        if (checkedAdditionPerson) {
          if (additionPersonPhone === '' || additionPersonName === '') {
            changeIsValid(false)
            Alert.alert('Please provide passenger information.')
            return false
          }
        } else {
          changeIsValid(true)
        }

        changeIsValid(true)
        const payload = {
          item: item,
          additionalPersonName: checkedAdditionPerson ? additionPersonName : null,
          additionalPersonPhone: checkedAdditionPerson ? additionPersonPhone : null,
          subTotal: item.discountedPrice,
          isFromAirport: isFromAirport,
          reservationDetails: reservationDetails,
          fromAddressNotes: pickupFromAddressNotes,
          reservationPromo: [item.priceInformation.PriceDiscount || null],
          gateNumber: gateNumber,
          flightNumber: flightNumber,
        }

        const newPayload = await generateAirportCheckoutPayload(payload)
        console.log({ newPayload })
        navigation.navigate('CheckoutScreen', { checkout: newPayload })
      }}
      onCancelFooterPress={async () => {
        console.log('addToCart')
        if ((isFromAirport && flightNumber === '') || (isFromAirport && gateNumber === '')) {
          Alert.alert('Please provide your flight information')
          return false
        }
        if (checkedAdditionPerson) {
          if (additionPersonPhone === '' || additionPersonName === '') {
            changeIsValid(false)
            Alert.alert('Please provide passenger information.')
            return false
          }
        }

        changeIsValid(true)
        const payload = {
          item: item,
          additionalPersonName: checkedAdditionPerson ? additionPersonName : null,
          additionalPersonPhone: checkedAdditionPerson ? additionPersonPhone : null,
          subTotal: item.discountedPrice,
          isFromAirport: isFromAirport,
          reservationDetails: reservationDetails,
          fromAddressNotes: pickupFromAddressNotes,
          reservationPromo: [item.priceInformation.PriceDiscount || null],
          gateNumber: gateNumber,
          flightNumber: flightNumber,
        }
        const newPayload = await generateAirportAddCartPayload(payload)
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
      onAddToCartPress={() => {
        navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
          })
        )
        navigation.navigate('Cart')
      }}
    />
  )
}

OrderDetailAirportScreen.defailtProps = {}

OrderDetailAirportScreen.propTypes = {
  addCart: PropTypes.func,
  addCartIsLoading: PropTypes.bool,
  addCartErrorMessage: PropTypes.string,
  addCartSuccessMessage: PropTypes.string,
}

const mapStateToProps = (state) => ({
  addCartIsLoading: state.orderDetailWithDriver.addCartIsLoading,
  addCartErrorMessage: state.orderDetailWithDriver.addCartErrorMessage,
  addCartSuccessMessage: state.orderDetailWithDriver.addCartSuccessMessage,
})

const mapDispatchToProps = (dispatch) => ({
  addCart: (payload) => dispatch(OrderDetailWithDriverAction.addCart(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailAirportScreen)
