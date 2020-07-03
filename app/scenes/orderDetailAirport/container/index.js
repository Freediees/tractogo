import React, { useState, useEffect, useCallback, Fragment } from 'react'
import Moment from 'moment'
import { connect } from 'react-redux'
import DetailItemAirport from 'components/organism/detailItemAirport'
import { getFilterObject, getUserProfileObject, pad } from 'function'
import { doResolveLoginRoute } from 'function/apiRequest'
import { View, Alert } from 'react-native'
import {
  generateAirportCheckoutPayload,
  generateAirportAddCartPayload,
} from 'function/payloadGenerator'
import CartScreenActions from 'scenes/cartScreen/store/actions'
import { PropTypes } from 'prop-types'
import OrderDetailWithDriverAction from 'scenes/orderDetailWithDriver/store/actions'
import { NavigationActions, StackActions } from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'
import CustomBottomSheet from 'components/molecules/customBottomSheet'
import CartItem from 'components/atom/cartItem'
import PrimaryButton from 'components/atom/primaryButton'
import { Margin, Fonts, Background, Padding } from 'theme'

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

let bsAddToCart = null

const OrderDetailAirportScreen = ({
  navigation,
  addCart,
  addCartIsLoading,
  addCartErrorMessage,
  addCartSuccessMessage,
  userProfile,
  fetchCartDetails,
  cartDetails,
  cartDetailsIsLoading,
  cartDetailsErrorMessage,
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
  const [frontEndValidate, changeFrontEndValidate] = useState(true)
  const [goToCart, changeGoToCart] = useState(false)

  useEffect(() => {
    const callback = () => {
      navigation.navigate('OrderDetailAirportScreen', {
        item: item,
        isFromAirport: isFromAirport,
        reservationDetails: reservationDetails,
      })
    }
    async function initialize() {
      console.log({ item })
      console.log({ isFromAirport })
      console.log({ reservationDetails })

      await fetchCartDetails()
      await validateOnFrontEnd()

      userProfile = await getUserProfileObject()
      if (userProfile) {
        changePersonName(`${userProfile.FirstName} ${userProfile.LastName}`)
        changePersonEmail(`${userProfile.EmailPersonal}`)
      }
      changeInitReady(true)
    }
    // if (doResolveLoginRoute(callback)) {
    //   console.log('doresolve')
    //   initialize()
    // }
    initialize()
  }, [userProfile])

  if (initReady && !updated) {
    changeUpdated(true)
  }

  const validateOnFrontEnd = async () => {
    let checkValidate = true
    changeFrontEndValidate(true)
    let tempProductId = ''
    if (!cartDetailsIsLoading && cartDetails.length > 0) {
      console.log('masuk sini')
      console.log({ cartDetails })
      cartDetails.forEach((v) => {
        if (tempProductId !== '' && tempProductId !== v.item.MsProductId) {
          checkValidate = false
          console.log('multiple product')
        } else {
          tempProductId = v.item.MsProductId
        }
      })
      changeFrontEndValidate(checkValidate)
    }
  }

  if (goToCart && addCartErrorMessage && !addCartIsLoading) {
    changeGoToCart(false)
    Alert.alert(addCartErrorMessage)
  } else if (goToCart && addCartSuccessMessage && !addCartErrorMessage && !addCartIsLoading) {
    console.log('trigger alert')
    changeGoToCart(false)
    if (bsAddToCart) {
      bsAddToCart.open()
    }
    fetchCartDetails()
  }

  return (
    <Fragment>
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
            date: new Date(
              Moment(Moment.utc(reservationDetails.date.formatedSelectedDate).toDate())
            ),
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

          let tempPriceExtra = 0
          let tempPriceExpedition = 0
          let tempPriceDiscount = item.discountedPrice || item.priceAmount

          changeIsValid(true)
          const payload = {
            item: item,
            additionalPersonName: checkedAdditionPerson ? additionPersonName : null,
            additionalPersonPhone: checkedAdditionPerson ? additionPersonPhone : null,

            subTotal: parseInt(tempPriceDiscount) + tempPriceExtra + tempPriceExpedition,
            PriceDiscount: item.discountedPrice || 0,
            isFromAirport: isFromAirport,
            reservationDetails: reservationDetails,
            fromAddressNotes: pickupFromAddressNotes,
            reservationPromo: [item.priceInformation.PriceDiscount || null],
            gateNumber: gateNumber,
            flightNumber: flightNumber,
          }
          console.log({ payload })
          const newPayload = await generateAirportCheckoutPayload(payload)
          console.log({ newPayload })
          navigation.navigate('CheckoutScreen', { checkout: newPayload })
        }}
        onCancelFooterPress={async () => {
          console.log('addToCart')
          console.log('frontEndValidate', frontEndValidate)

          if (!frontEndValidate) {
            changeIsValid(false)
            Alert.alert('There is still item on your cart, please checkout first')
            return false
          }

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

          let tempPriceExtra = 0
          let tempPriceExpedition = 0
          let tempPriceDiscount = item.discountedPrice || item.priceAmount

          changeIsValid(true)
          const payload = {
            item: item,
            additionalPersonName: checkedAdditionPerson ? additionPersonName : null,
            additionalPersonPhone: checkedAdditionPerson ? additionPersonPhone : null,
            subTotal: parseInt(tempPriceDiscount) + tempPriceExtra + tempPriceExpedition,
            PriceDiscount: item.discountedPrice || 0,
            isFromAirport: isFromAirport,
            reservationDetails: reservationDetails,
            fromAddressNotes: pickupFromAddressNotes,
            reservationPromo: [item.priceInformation.PriceDiscount || null],
            gateNumber: gateNumber,
            flightNumber: flightNumber,
          }
          const newPayload = await generateAirportAddCartPayload(payload)
          addCart(newPayload)
          changeGoToCart(true)
        }}
      />
      <Spinner visible={goToCart} textContent={'Loading...'} />
      <CustomBottomSheet
        title={'Success Adding Package'}
        botSheetRef={(ref) => (bsAddToCart = ref)}
      >
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            ...Padding.ph_20,
            ...Padding.pv_20,
          }}
        >
          <CartItem
            cardTitle={'Airport Transfer'}
            city={reservationDetails.city.CityName}
            startDate={reservationDetails.date.formatedSelectedDate}
            endDate={''}
            rentHour={Moment(Moment.utc(reservationDetails.date.formatedSelectedDate).toDate())
              .local()
              .format('HH:mm')}
            rentHourSuffix={''}
            totalAmount={totalAmount}
            carName={item && item.cardTitle ? item.cardTitle : 'TEST'}
          />
          <View style={{ width: '100%', ...Margin.mt_20 }}>
            <PrimaryButton
              style={{ height: 48, ...Padding.pv_12, ...Margin.mt_20 }}
              text={'Go To Cart'}
              onPress={() => {
                bsAddToCart.close()
                navigation.dispatch(
                  StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Home' })],
                  })
                )
                navigation.navigate('Cart')
              }}
            />
          </View>
        </View>
      </CustomBottomSheet>
    </Fragment>
  )
}

OrderDetailAirportScreen.defailtProps = {}

OrderDetailAirportScreen.propTypes = {
  addCart: PropTypes.func,
  addCartIsLoading: PropTypes.bool,
  addCartErrorMessage: PropTypes.string,
  addCartSuccessMessage: PropTypes.string,
  fetchCartDetails: PropTypes.func,
  cartDetails: PropTypes.arrayOf(PropTypes.shape({})),
  cartDetailsIsLoading: PropTypes.bool,
  cartDetailsErrorMessage: PropTypes.string,
}

const mapStateToProps = (state) => ({
  addCartIsLoading: state.orderDetailWithDriver.addCartIsLoading,
  addCartErrorMessage: state.orderDetailWithDriver.addCartErrorMessage,
  addCartSuccessMessage: state.orderDetailWithDriver.addCartSuccessMessage,
  cartDetails: state.cartScreen.cartDetails,
  cartDetailsIsLoading: state.cartScreen.cartDetailsIsLoading,
  cartDetailsErrorMessage: state.cartScreen.cartDetailsErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  addCart: (payload) => dispatch(OrderDetailWithDriverAction.addCart(payload)),
  fetchCartDetails: () => dispatch(CartScreenActions.fetchCartDetails()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailAirportScreen)
