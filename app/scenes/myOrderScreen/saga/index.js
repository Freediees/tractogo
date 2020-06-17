import { call, put } from 'redux-saga/effects'
import Moment from 'moment'
import { orderService } from 'services/orderService'
import MyOrderScreenAction from '../store/actions'
import NavigationService from 'services/navigationService'
import {
  CAR_RENTAL,
  AIRPORT_TRANSFER,
  BUS_RENTAL,
  SERVICE_ID_SELF_DRIVE,
  SERVICE_ID_WITH_DRIVER,
  STATUS_RESERVATION,
} from 'config'

function* fetchOrdersActive() {
  yield put(MyOrderScreenAction.fetchOrdersActiveLoading())
  try {
    const json = yield call(orderService.getOrdersActiveRequest)
    if (json) {
      if (json.Data) {
        console.log(json.Data)
        const dataArrReservation = []
        const dataArrOrder = []
        json.Data.data.forEach((item) => {
          const paymentDetailItems = []
          let carRentalLabel = ''
          if (item.details[0].MsProductId === CAR_RENTAL) {
            carRentalLabel = 'Sewa Mobil'
          } else if (item.details[0].MsProductId === AIRPORT_TRANSFER) {
            carRentalLabel = 'Transfer Bandara'
          } else if (item.details[0].MsProductId === BUS_RENTAL) {
            carRentalLabel = 'Sewa Bus'
          }
          let rentalDriverLabel = ''
          if (item.details[0].MsProductServiceId === SERVICE_ID_WITH_DRIVER) {
            rentalDriverLabel = '- Dengan Sopir'
          } else if (item.details[0].MsProductServiceId === SERVICE_ID_SELF_DRIVE) {
            rentalDriverLabel = '- Tanpa Sopir'
          }
          let icProduct = ''
          let sufix = 'Jam'
          let duration = item.details[0].Duration
          if (item.details[0].MsProductId === CAR_RENTAL) {
            icProduct = require('icons/ic-carrental.svg')
          } else if (item.details[0].MsProductId === AIRPORT_TRANSFER) {
            icProduct = require('icons/ic-airporttransport.svg')
            duration = null
            sufix = 'Km'
          } else if (item.details[0].MsProductId === BUS_RENTAL) {
            icProduct = require('icons/ic-busrental.svg')
          }
          paymentDetailItems.push({
            name: item.details[0].UnitTypeName,
            total: item.details[0].BasePrice,
          })
          if (item.details[0].priceExpedition !== '0') {
            paymentDetailItems.push({
              name: 'Expedition Price',
              total: item.details[0].priceExpedition,
            })
          }
          if (item.details[0].priceDiscount !== '0') {
            paymentDetailItems.push({
              name: 'Discount',
              total: parseInt(item.details[0].PriceDiscount) * -1,
            })
          }
          var msDiff = new Date().getTime() - new Date(item.WaitingForPaymentTime).getTime()
          var countDown = Math.floor(msDiff / (60 * 60 * 24))
          console.log(countDown)
          let dataReservation = {
            ...item,
            cardTitle: `${carRentalLabel} ${rentalDriverLabel}`,
            placeLabel: item.details[0].CityName,
            startDate: item.details[0].StartDate,
            endDate: item.details[0].EndDate || null,
            rentHour: duration,
            rentHourSuffix: sufix,
            carName: item.details[0].UnitTypeName,
            totalAmount: item.TotalPrice,
            noReservasiLabel: item.ReservationId,
            eReceipt: item.EReceipt,
            subTotal: item.details[0].SubTotal,
            price: item.details[0].Price,
            paymentDetailItems: paymentDetailItems,
            // countDown: countDown,
            icCarRental: icProduct,
          }
          STATUS_RESERVATION.forEach((data) => {
            if (data.id === item.details[0].StatusId) {
              console.log(data.name)
              dataReservation.paymentStatusLabel = data.name
              return null
            }
          })
          // const paymentItems = []
          // item.details.forEach((data) => {
          //   if (data.id === item.details[0].StatusId) {
          //     console.log(data.name)
          //     dataReservation.paymentStatusLabel = data.name
          //     return null
          //   }
          // })
          // paymentItems.push({
          //   name: json.data.code,
          //   total: item.TotalPrice,
          // })
          dataReservation.onPress = function() {
            NavigationService.navigate('MyOrderDetailScreen', { item: dataReservation })
          }

          item.details.forEach((v) => {
            let duration = item.details[0].Duration
            if (item.details[0].MsProductId === CAR_RENTAL) {
              icProduct = require('icons/ic-carrental.svg')
            } else if (item.details[0].MsProductId === AIRPORT_TRANSFER) {
              icProduct = require('icons/ic-airporttransport.svg')
              duration = null
            } else if (item.details[0].MsProductId === BUS_RENTAL) {
              icProduct = require('icons/ic-busrental.svg')
            }
            let dataOrder = {
              cardTitle: v.UnitTypeName || 'TOYOTA CARS',
              seatAmount: v.TotalSeat || 0,
              suitcaseAmount: v.TotalLuggage || 0,
              transmision: v.IsTransmissionManual === '1' ? 'MANUAL' : 'AUTOMATIC',
              uriImage: v.VehicleImage,
              priceUnit: duration ? ' / Hari' : ' / Trip',
              totalLabel: ' Total',
              priceAmount: parseInt(v.BasePrice),
              id: v.Id,
              item: v,
              carRentalLabel: carRentalLabel,
              rentalDriverLabel: rentalDriverLabel,
              placeLabel: v.CityName,
              discountedPrice: parseInt(v.SubTotal),
              discountPercent: null,
              dropLocations: v.drop_locations,
              pickupLocations: v.pickup_locations,
              dateLabel: `${Moment(new Date(v.StartDate)).format('DD')} - ${Moment(
                new Date(v.EndDate)
              ).format('DD MMMM YYYY')}`,
              startDate: `${Moment(new Date(v.StartDate)).format('DD MMMM YYYY')}`,
              endDate: v.EndDate ? `${Moment(new Date(v.EndDate)).format('DD MMMM YYYY')}` : null,
              duration: duration,
              passengers: v.passengers[0],
              licensePlate: v.LicensePlate,
              driver: v.drivers[0],
              selected: false,
              errors: [],
            }
            console.log(dataOrder)
            dataArrOrder.push(dataOrder)
          })
          dataReservation.onPressDetail = function() {
            NavigationService.navigate('MyOrderItemDetailScreen', {
              item: dataArrOrder,
              reservation: dataReservation,
            })
          }
          dataArrReservation.push(dataReservation)
        })
        yield put(MyOrderScreenAction.fetchOrdersActiveSuccess(dataArrReservation))
      }
    }
  } catch (error) {
    console.log(JSON.stringify(error.message))
    yield put(MyOrderScreenAction.fetchOrdersActiveFailure(error))
  }
}

function* fetchOrdersComplete() {
  yield put(MyOrderScreenAction.fetchOrdersCompleteLoading())
  try {
    const json = yield call(orderService.getOrdersCompleteRequest)
    if (json) {
      if (json.Data) {
        console.log(json.Data)
        const dataArrReservation = []
        const dataArrOrder = []
        json.Data.data.forEach((item) => {
          const paymentDetailItems = []
          let carRentalLabel = ''
          if (item.details[0].MsProductId === CAR_RENTAL) {
            carRentalLabel = 'Sewa Mobil'
          } else if (item.details[0].MsProductId === AIRPORT_TRANSFER) {
            carRentalLabel = 'Transfer Bandara'
          } else if (item.details[0].MsProductId === BUS_RENTAL) {
            carRentalLabel = 'Sewa Bus'
          }
          let rentalDriverLabel = ''
          if (item.details[0].MsProductServiceId === SERVICE_ID_WITH_DRIVER) {
            rentalDriverLabel = '- Dengan Sopir'
          } else if (item.details[0].MsProductServiceId === SERVICE_ID_SELF_DRIVE) {
            rentalDriverLabel = '- Tanpa Sopir'
          }
          let icProduct = ''
          let sufix = 'Jam'
          let duration = item.details[0].Duration
          if (item.details[0].MsProductId === CAR_RENTAL) {
            icProduct = require('icons/ic-carrental.svg')
          } else if (item.details[0].MsProductId === AIRPORT_TRANSFER) {
            icProduct = require('icons/ic-airporttransport.svg')
            duration = null
            sufix = 'Km'
          } else if (item.details[0].MsProductId === BUS_RENTAL) {
            icProduct = require('icons/ic-busrental.svg')
          }
          paymentDetailItems.push({
            name: item.details[0].UnitTypeName,
            total: item.details[0].BasePrice,
          })
          if (item.details[0].priceExpedition !== '0') {
            paymentDetailItems.push({
              name: 'Expedition Price',
              total: item.details[0].priceExpedition,
            })
          }
          if (item.details[0].priceDiscount !== '0') {
            paymentDetailItems.push({
              name: 'Discount',
              total: parseInt(item.details[0].PriceDiscount) * -1,
            })
          }
          var msDiff = new Date().getTime() - new Date(item.WaitingForPaymentTime).getTime()
          var countDown = Math.floor(msDiff / (60 * 60 * 24))
          console.log(countDown)
          let dataReservation = {
            ...item,
            cardTitle: `${carRentalLabel} ${rentalDriverLabel}`,
            placeLabel: item.details[0].CityName,
            startDate: item.details[0].StartDate,
            endDate: item.details[0].EndDate || null,
            rentHour: duration,
            rentHourSuffix: sufix,
            carName: item.details[0].UnitTypeName,
            totalAmount: item.TotalPrice,
            noReservasiLabel: item.ReservationId,
            eReceipt: item.EReceipt,
            subTotal: item.details[0].SubTotal,
            price: item.details[0].Price,
            paymentDetailItems: paymentDetailItems,
            // countDown: countDown,
            icCarRental: icProduct,
          }
          STATUS_RESERVATION.forEach((data) => {
            if (data.id === item.details[0].StatusId) {
              console.log(data.name)
              dataReservation.paymentStatusLabel = data.name
              return null
            }
          })
          dataReservation.onPress = function() {
            NavigationService.navigate('MyOrderDetailScreen', { item: dataReservation })
          }
          dataReservation.onPressDetail = function(index) {
            NavigationService.navigate('MyOrderItemDetailScreen', { item: dataReservation.details[index] })
          }
          dataArrReservation.push(dataReservation)
        })
        yield put(MyOrderScreenAction.fetchOrdersCompleteSuccess(dataArrReservation))
      }
    }
  } catch (error) {
    console.log(JSON.stringify(error.message))
    yield put(MyOrderScreenAction.fetchOrdersCompleteFailure(error))
  }
}

function* fetchOrdersCancel() {
  yield put(MyOrderScreenAction.fetchOrdersCancelLoading())
  try {
    const json = yield call(orderService.getOrdersCancelRequest)
    if (json) {
      if (json.Data) {
        console.log(json.Data)
        const dataArrReservation = []
        const dataArrOrder = []
        json.Data.data.forEach((item) => {
          const paymentDetailItems = []
          let carRentalLabel = ''
          if (item.details[0].MsProductId === CAR_RENTAL) {
            carRentalLabel = 'Sewa Mobil'
          } else if (item.details[0].MsProductId === AIRPORT_TRANSFER) {
            carRentalLabel = 'Transfer Bandara'
          } else if (item.details[0].MsProductId === BUS_RENTAL) {
            carRentalLabel = 'Sewa Bus'
          }
          let rentalDriverLabel = ''
          if (item.details[0].MsProductServiceId === SERVICE_ID_WITH_DRIVER) {
            rentalDriverLabel = '- Dengan Sopir'
          } else if (item.details[0].MsProductServiceId === SERVICE_ID_SELF_DRIVE) {
            rentalDriverLabel = '- Tanpa Sopir'
          }
          let icProduct = ''
          let sufix = 'Jam'
          let duration = item.details[0].Duration
          if (item.details[0].MsProductId === CAR_RENTAL) {
            icProduct = require('icons/ic-carrental.svg')
          } else if (item.details[0].MsProductId === AIRPORT_TRANSFER) {
            icProduct = require('icons/ic-airporttransport.svg')
            duration = null
            sufix = 'Km'
          } else if (item.details[0].MsProductId === BUS_RENTAL) {
            icProduct = require('icons/ic-busrental.svg')
          }
          paymentDetailItems.push({
            name: item.details[0].UnitTypeName,
            total: item.details[0].BasePrice,
          })
          if (item.details[0].priceExpedition !== '0') {
            paymentDetailItems.push({
              name: 'Expedition Price',
              total: item.details[0].priceExpedition,
            })
          }
          if (item.details[0].priceDiscount !== '0') {
            paymentDetailItems.push({
              name: 'Discount',
              total: parseInt(item.details[0].PriceDiscount) * -1,
            })
          }
          var msDiff = new Date().getTime() - new Date(item.WaitingForPaymentTime).getTime()
          var countDown = Math.floor(msDiff / (60 * 60 * 24))
          console.log(countDown)
          let dataReservation = {
            ...item,
            cardTitle: `${carRentalLabel} ${rentalDriverLabel}`,
            placeLabel: item.details[0].CityName,
            startDate: item.details[0].StartDate,
            endDate: item.details[0].EndDate || null,
            rentHour: duration,
            rentHourSuffix: sufix,
            carName: item.details[0].UnitTypeName,
            totalAmount: item.TotalPrice,
            noReservasiLabel: item.ReservationId,
            eReceipt: item.EReceipt,
            subTotal: item.details[0].SubTotal,
            price: item.details[0].Price,
            paymentDetailItems: paymentDetailItems,
            // countDown: countDown,
            icCarRental: icProduct,
          }
          STATUS_RESERVATION.forEach((data) => {
            if (data.id === item.details[0].StatusId) {
              console.log(data.name)
              dataReservation.paymentStatusLabel = data.name
              return null
            }
          })
          dataReservation.onPress = function() {
            NavigationService.navigate('MyOrderDetailScreen', { item: dataReservation })
          }
          dataReservation.onPressDetail = function(index) {
            NavigationService.navigate('MyOrderItemDetailScreen', { item: dataReservation.details[index] })
          }
          dataArrReservation.push(dataReservation)
        })
        yield put(MyOrderScreenAction.fetchOrdersCancelSuccess(dataArrReservation))
      }
    }
  } catch (error) {
    console.log(JSON.stringify(error.message))
    yield put(MyOrderScreenAction.fetchOrdersCancelFailure(error))
  }
}

export { fetchOrdersActive, fetchOrdersComplete, fetchOrdersCancel }
