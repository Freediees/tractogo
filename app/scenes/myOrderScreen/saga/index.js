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
  ACTIVITY_STATUS_V2,
} from 'config'
import { buffers } from 'redux-saga'

function* fetchOrdersActive() {
  yield put(MyOrderScreenAction.fetchOrdersActiveLoading())
  try {
    const json = yield call(orderService.getOrdersActiveRequest)
    if (json) {
      if (json.Data) {
        console.log(json.Data)
        const dataArrReservation = []
        let totalPriceExpedition = 0
        let totalDiscount = 0
        json.Data.data.forEach((item) => {
          const paymentDetailItems = []
          const dataArrOrder = []
          let carRentalLabel = ''
          if (item.details[0].MsProductId === CAR_RENTAL) {
            carRentalLabel = 'Car Rental'
          } else if (item.details[0].MsProductId === AIRPORT_TRANSFER) {
            carRentalLabel = 'Airport Transfer'
          } else if (item.details[0].MsProductId === BUS_RENTAL) {
            carRentalLabel = 'Sewa Bus'
          }
          let rentalDriverLabel = ''
          if (item.details[0].MsProductServiceId === SERVICE_ID_WITH_DRIVER) {
            rentalDriverLabel = '- With Driver'
          } else if (item.details[0].MsProductServiceId === SERVICE_ID_SELF_DRIVE) {
            rentalDriverLabel = '- Self Drive'
          }
          let icProduct = ''
          let sufix = 'Hour'
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
            total: item.details[0].Price,
          })
          if (item.details[0].priceExpedition !== '0') {
            paymentDetailItems.push({
              name: 'Expedition Price',
              total: item.details[0].PriceExpedition,
            })
          }
          if (item.details[0].priceDiscount !== '0') {
            paymentDetailItems.push({
              name: 'Discount',
              total: parseInt(item.details[0].PriceDiscount) * -1,
            })
          }
          console.log(item.WaitingForPaymentTime)
          var msDiff = new Date().getTime() - new Date(item.WaitingForPaymentTime).getTime()
          var countDown = Math.floor(msDiff / (60 * 60 * 24))
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
            icCarRental: icProduct,
          }
          STATUS_RESERVATION.forEach((data) => {
            if (data.id === item.details[0].StatusId) {
              dataReservation.paymentStatusLabel = data.name
              return null
            }
          })

          let multiArr = []
          item.details.forEach((v) => {
            const paymentDetailItems = []
            let carRentalLabel = ''
            if (v.MsProductId === CAR_RENTAL) {
              carRentalLabel = 'Car Rental'
            } else if (v.MsProductId === AIRPORT_TRANSFER) {
              carRentalLabel = 'Airport Transfer'
            } else if (v.MsProductId === BUS_RENTAL) {
              carRentalLabel = 'Sewa Bus'
            }
            let rentalDriverLabel = ''
            if (v.MsProductServiceId === SERVICE_ID_WITH_DRIVER) {
              rentalDriverLabel = '- With Driver'
            } else if (v.MsProductServiceId === SERVICE_ID_SELF_DRIVE) {
              rentalDriverLabel = '- Self Drive'
            }
            let icProduct = ''
            let sufix = 'Hour'
            if (v.MsProductId === CAR_RENTAL) {
              icProduct = require('icons/ic-carrental.svg')
            } else if (v.MsProductId === AIRPORT_TRANSFER) {
              icProduct = require('icons/ic-airporttransport.svg')
              duration = null
              sufix = 'Km'
            } else if (v.MsProductId === BUS_RENTAL) {
              icProduct = require('icons/ic-busrental.svg')
            }
            paymentDetailItems.push({
              name: v.UnitTypeName,
              total: v.Price,
            })
            if (v.PriceExpedition !== '0') {
              paymentDetailItems.push({
                name: 'Expedition Price',
                total: v.PriceExpedition,
              })
            }
            if (v.PriceExtras !== '0') {
              paymentDetailItems.push({
                name: 'Extras Price',
                total: parseInt(v.PriceExtras),
              })
            }
            if (v.priceDiscount !== '0') {
              paymentDetailItems.push({
                name: 'Discount',
                total: parseInt(v.PriceDiscount) * -1,
              })
            }
            let multiItem = {
              ...item,
              cardTitle: `${carRentalLabel} ${rentalDriverLabel}`,
              placeLabel: v.CityName,
              startDate: v.StartDate,
              endDate: v.EndDate || null,
              rentHour: duration,
              rentHourSuffix: sufix,
              carName: v.UnitTypeName,
              totalAmount: item.TotalPrice,
              noReservasiLabel: item.ReservationId,
              eReceipt: item.EReceipt,
              subTotal: v.SubTotal,
              price: v.Price,
              paymentDetailItems: paymentDetailItems,
              ReservationId: item.ReservationId,
              Status: item.Status,
              licensePlate: v.LicensePlate,
              dropLocations: v.drop_locations[0],
              pickupLocations: v.pickup_locations[0],
              passenger: v.passengers[0],
              countDownPayment: item.WaitingForPaymentTime,
              item: v,
              icCarRental: icProduct,
              seatAmount: v.TotalSeat || 0,
              suitcaseAmount: v.TotalLuggage || 0,
              priceAmount: v.SubTotal,
              priceUnit: `${sufix === 'Hour' ? ' / Hari' : ' / Trip'}`,
              isDriver: v.IsWithDriver === '1',
              uriImage: v.VehicleImage,
              duration: v.Duration,
              discountedPrice: v.PriceDiscount,
              discountPercent: parseInt((parseInt(v.PriceDiscount) * 100) / parseInt(v.Price)),
            }
            multiItem.onPressDetail = function() {
              NavigationService.navigate('MyOrderItemDetailScreen', {
                item: [multiItem],
                reservation: dataReservation,
              })
            }
            ACTIVITY_STATUS_V2.forEach((data) => {
              if (data.activityID === v.ActivityStatusV2) {
                multiItem.activityStatus = parseInt(data.activityID.slice(-1))
                multiItem.activityName = data.name
                return null
              }
            })
            STATUS_RESERVATION.forEach((data) => {
              if (data.id === v.StatusId) {
                multiItem.paymentStatusLabel = data.name
                return null
              }
            })
            multiArr.push(multiItem)
          })
          dataReservation.onPress = function() {
            NavigationService.navigate('MyOrderDetailScreen', {
              item: multiArr,
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
        let totalPriceExpedition = 0
        let totalDiscount = 0
        json.Data.data.forEach((item) => {
          const paymentDetailItems = []
          const dataArrOrder = []
          let carRentalLabel = ''
          if (item.details[0].MsProductId === CAR_RENTAL) {
            carRentalLabel = 'Car Rental'
          } else if (item.details[0].MsProductId === AIRPORT_TRANSFER) {
            carRentalLabel = 'Airport Transfer'
          } else if (item.details[0].MsProductId === BUS_RENTAL) {
            carRentalLabel = 'Sewa Bus'
          }
          let rentalDriverLabel = ''
          if (item.details[0].MsProductServiceId === SERVICE_ID_WITH_DRIVER) {
            rentalDriverLabel = '- With Driver'
          } else if (item.details[0].MsProductServiceId === SERVICE_ID_SELF_DRIVE) {
            rentalDriverLabel = '- Self Drive'
          }
          let icProduct = ''
          let sufix = 'Hour'
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
            total: item.details[0].Price,
          })
          if (item.details[0].priceExpedition !== '0') {
            paymentDetailItems.push({
              name: 'Expedition Price',
              total: item.details[0].PriceExpedition,
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
            countDownPayment: item.WaitingForPaymentTime,
            paymentDetailItems: paymentDetailItems,
            icCarRental: icProduct,
          }
          STATUS_RESERVATION.forEach((data) => {
            if (data.id === item.details[0].StatusId) {
              dataReservation.paymentStatusLabel = data.name
              return null
            }
          })

          let multiArr = []
          item.details.forEach((v) => {
            const paymentDetailItems = []
            let carRentalLabel = ''
            if (v.MsProductId === CAR_RENTAL) {
              carRentalLabel = 'Car Rental'
            } else if (v.MsProductId === AIRPORT_TRANSFER) {
              carRentalLabel = 'Airport Transfer'
            } else if (v.MsProductId === BUS_RENTAL) {
              carRentalLabel = 'Sewa Bus'
            }
            let rentalDriverLabel = ''
            if (v.MsProductServiceId === SERVICE_ID_WITH_DRIVER) {
              rentalDriverLabel = '- With Driver'
            } else if (v.MsProductServiceId === SERVICE_ID_SELF_DRIVE) {
              rentalDriverLabel = '- Self Drive'
            }
            let icProduct = ''
            let sufix = 'Hour'
            if (v.MsProductId === CAR_RENTAL) {
              icProduct = require('icons/ic-carrental.svg')
            } else if (v.MsProductId === AIRPORT_TRANSFER) {
              icProduct = require('icons/ic-airporttransport.svg')
              duration = null
              sufix = 'Km'
            } else if (v.MsProductId === BUS_RENTAL) {
              icProduct = require('icons/ic-busrental.svg')
            }
            paymentDetailItems.push({
              name: v.UnitTypeName,
              total: v.Price,
            })
            if (v.PriceExpedition !== '0') {
              paymentDetailItems.push({
                name: 'Expedition Price',
                total: v.PriceExpedition,
              })
            }
            if (v.PriceExtras !== '0') {
              paymentDetailItems.push({
                name: 'Extras Price',
                total: parseInt(v.PriceExtras),
              })
            }
            if (v.priceDiscount !== '0') {
              paymentDetailItems.push({
                name: 'Discount',
                total: parseInt(v.PriceDiscount) * -1,
              })
            }
            let multiItem = {
              ...item,
              cardTitle: `${carRentalLabel} ${rentalDriverLabel}`,
              placeLabel: v.CityName,
              startDate: v.StartDate,
              endDate: v.EndDate || null,
              rentHour: duration,
              rentHourSuffix: sufix,
              carName: v.UnitTypeName,
              totalAmount: item.TotalPrice,
              noReservasiLabel: item.ReservationId,
              eReceipt: item.EReceipt,
              subTotal: v.SubTotal,
              price: v.Price,
              paymentDetailItems: paymentDetailItems,
              ReservationId: item.ReservationId,
              Status: item.Status,
              licensePlate: v.LicensePlate,
              dropLocations: v.drop_locations[0],
              pickupLocations: v.pickup_locations[0],
              passenger: v.passengers[0],
              item: v,
              icCarRental: icProduct,
              seatAmount: v.TotalSeat || 0,
              suitcaseAmount: v.TotalLuggage || 0,
              priceAmount: v.SubTotal,
              priceUnit: `${sufix === 'Hour' ? ' / Hari' : ' / Trip'}`,
              isDriver: v.IsWithDriver === '1',
              uriImage: v.VehicleImage,
              duration: v.Duration,
              discountedPrice: v.PriceDiscount,
              discountPercent: parseInt((parseInt(v.PriceDiscount) * 100) / parseInt(v.Price)),
            }
            multiItem.onPressDetail = function() {
              NavigationService.navigate('MyOrderItemDetailScreen', {
                item: [multiItem],
                reservation: dataReservation,
              })
            }
            ACTIVITY_STATUS_V2.forEach((data) => {
              if (data.activityID === v.ActivityStatusV2) {
                multiItem.activityStatus = parseInt(data.activityID.slice(-1))
                multiItem.activityName = data.name
                return null
              }
            })
            STATUS_RESERVATION.forEach((data) => {
              if (data.id === v.StatusId) {
                multiItem.paymentStatusLabel = data.name
                return null
              }
            })
            multiArr.push(multiItem)
          })
          dataReservation.onPress = function() {
            NavigationService.navigate('MyOrderDetailScreen', {
              item: multiArr,
              reservation: dataReservation,
            })
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
        let totalPriceExpedition = 0
        let totalDiscount = 0
        json.Data.data.forEach((item) => {
          const paymentDetailItems = []
          const dataArrOrder = []
          let carRentalLabel = ''
          if (item.details[0].MsProductId === CAR_RENTAL) {
            carRentalLabel = 'Car Rental'
          } else if (item.details[0].MsProductId === AIRPORT_TRANSFER) {
            carRentalLabel = 'Airport Transfer'
          } else if (item.details[0].MsProductId === BUS_RENTAL) {
            carRentalLabel = 'Sewa Bus'
          }
          let rentalDriverLabel = ''
          if (item.details[0].MsProductServiceId === SERVICE_ID_WITH_DRIVER) {
            rentalDriverLabel = '- With Driver'
          } else if (item.details[0].MsProductServiceId === SERVICE_ID_SELF_DRIVE) {
            rentalDriverLabel = '- Self Drive'
          }
          let icProduct = ''
          let sufix = 'Hour'
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
            total: item.details[0].Price,
          })
          if (item.details[0].priceExpedition !== '0') {
            paymentDetailItems.push({
              name: 'Expedition Price',
              total: item.details[0].PriceExpedition,
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
            countDownPayment: item.WaitingForPaymentTime,
            paymentDetailItems: paymentDetailItems,
            icCarRental: icProduct,
          }
          STATUS_RESERVATION.forEach((data) => {
            if (data.id === item.details[0].StatusId) {
              dataReservation.paymentStatusLabel = data.name
              return null
            }
          })

          let multiArr = []
          item.details.forEach((v) => {
            const paymentDetailItems = []
            let carRentalLabel = ''
            if (v.MsProductId === CAR_RENTAL) {
              carRentalLabel = 'Car Rental'
            } else if (v.MsProductId === AIRPORT_TRANSFER) {
              carRentalLabel = 'Airport Transfer'
            } else if (v.MsProductId === BUS_RENTAL) {
              carRentalLabel = 'Sewa Bus'
            }
            let rentalDriverLabel = ''
            if (v.MsProductServiceId === SERVICE_ID_WITH_DRIVER) {
              rentalDriverLabel = '- With Driver'
            } else if (v.MsProductServiceId === SERVICE_ID_SELF_DRIVE) {
              rentalDriverLabel = '- Self Drive'
            }
            let icProduct = ''
            let sufix = 'Hour'
            if (v.MsProductId === CAR_RENTAL) {
              icProduct = require('icons/ic-carrental.svg')
            } else if (v.MsProductId === AIRPORT_TRANSFER) {
              icProduct = require('icons/ic-airporttransport.svg')
              duration = null
              sufix = 'Km'
            } else if (v.MsProductId === BUS_RENTAL) {
              icProduct = require('icons/ic-busrental.svg')
            }
            paymentDetailItems.push({
              name: v.UnitTypeName,
              total: v.Price,
            })
            if (v.PriceExpedition !== '0') {
              paymentDetailItems.push({
                name: 'Expedition Price',
                total: v.PriceExpedition,
              })
            }
            if (v.PriceExtras !== '0') {
              paymentDetailItems.push({
                name: 'Extras Price',
                total: parseInt(v.PriceExtras),
              })
            }
            if (v.priceDiscount !== '0') {
              paymentDetailItems.push({
                name: 'Discount',
                total: parseInt(v.PriceDiscount) * -1,
              })
            }
            let multiItem = {
              ...item,
              cardTitle: `${carRentalLabel} ${rentalDriverLabel}`,
              placeLabel: v.CityName,
              startDate: v.StartDate,
              endDate: v.EndDate || null,
              rentHour: duration,
              rentHourSuffix: sufix,
              carName: v.UnitTypeName,
              totalAmount: item.TotalPrice,
              noReservasiLabel: item.ReservationId,
              eReceipt: item.EReceipt,
              subTotal: v.SubTotal,
              price: v.Price,
              paymentDetailItems: paymentDetailItems,
              ReservationId: item.ReservationId,
              Status: item.Status,
              licensePlate: v.LicensePlate,
              dropLocations: v.drop_locations[0],
              pickupLocations: v.pickup_locations[0],
              passenger: v.passengers[0],
              refundCountStep: item.reservation_refunds && item.reservation_refunds.length,
              item: v,
              icCarRental: icProduct,
              seatAmount: v.TotalSeat || 0,
              suitcaseAmount: v.TotalLuggage || 0,
              priceAmount: v.SubTotal,
              priceUnit: `${sufix === 'Hour' ? ' / Hari' : ' / Trip'}`,
              isDriver: v.IsWithDriver === '1',
              uriImage: v.VehicleImage,
              duration: v.Duration,
              discountedPrice: v.PriceDiscount,
              discountPercent: parseInt((parseInt(v.PriceDiscount) * 100) / parseInt(v.Price)),
            }
            multiItem.onPressDetail = function() {
              NavigationService.navigate('MyOrderItemDetailScreen', {
                item: [multiItem],
                reservation: dataReservation,
              })
            }
            item.reservation_refunds &&
              item.reservation_refunds.length > 0 &&
              item.reservation_refunds.forEach((data, i) => {
                if (data.Status !== null) {
                  multiItem.reservationRefund = data
                  multiItem.refundStep = i
                } else return null
              })
            ACTIVITY_STATUS_V2.forEach((data) => {
              if (data.activityID === v.ActivityStatusV2) {
                multiItem.activityStatus = parseInt(data.activityID.slice(-1))
                multiItem.activityName = data.name
                return null
              }
            })
            STATUS_RESERVATION.forEach((data) => {
              if (data.id === v.StatusId) {
                multiItem.paymentStatusLabel = data.name
                return null
              }
            })
            multiArr.push(multiItem)
          })
          dataReservation.onPress = function() {
            NavigationService.navigate('MyOrderDetailScreen', {
              item: multiArr,
              reservation: dataReservation,
            })
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
