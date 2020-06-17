import { takeLatest, takeEvery, all } from 'redux-saga/effects'
import { HomeTypes } from 'scenes/home/store/actions'
import { StartupTypes } from 'scenes/startup/store/actions'
import { SettingsTypes } from 'scenes/setting/store/actions'
import { CarListScreenTypes } from 'scenes/carListScreen/store/actions'
import { CarFilterScreenTypes } from 'scenes/filter/store/actions'
import { OrderDetailWithDriverTypes } from 'scenes/orderDetailWithDriver/store/actions'
import { OrderDetailSelfDriveTypes } from 'scenes/orderDetailSelfDrive/store/actions'
import { RegisterTypes } from 'scenes/registration/store/actions'
import { RegisterVerifyTypes } from 'scenes/registrationVerification/store/actions'
import { LoginVerifyTypes } from 'scenes/loginVerification/store/actions'
import { LoginTypes } from 'scenes/login/store/actions'
import { ProfileTypes } from 'scenes/profile/store/actions'
import { PutprofileTypes } from 'scenes/profileSetting/store/actions'
import { PutphonenoTypes } from 'scenes/changePhoneno/store/actions'
import { LocationPickScreenTypes } from 'scenes/locationPickScreen/store/actions'
import { CartScreenTypes } from 'scenes/cartScreen/store/actions'
import { PaymentScreenTypes } from 'scenes/paymentScreen/store/actions'
import { LocationPickScreenSelfDriveTypes } from 'scenes/locationPickScreenSelfDrive/store/actions'
import { AirportFilterScreenTypes } from 'scenes/airportFilterScreen/store/actions'
import { NotificationScreenTypes } from 'scenes/notificationListScreen/store/actions'
import { CheckoutScreenTypes } from 'scenes/checkoutScreen/store/actions'
import { ImageTypes } from 'scenes/kYCImage/store/actions'
import { AirportCarListScreenTypes } from 'scenes/airportCarListScreen/store/actions'
import { CekTypes, ProfileEditPhoneTypes } from 'scenes/profileEditPhone/store/actions'
import { RatingTypes } from 'scenes/orderRatingScreen/store/actions'
import { MyOrderScreenTypes } from 'scenes/myOrderScreen/store/actions'
import { OrderDetailAirportTypes } from 'scenes/orderDetailAirport/store/actions'
import { MyOrderCancelTypes } from 'scenes/myOrderCancel/store/actions'

// import { POST_LOGIN } from 'scenes/login/types'
// import { POST_REGISTER } from 'scenes/registration/types'

import { startup } from 'scenes/startup/saga'
import { fetchUser, fetchProducts, fetchPromos, fetchNews } from 'scenes/home/saga'
import { fetchStocks, fetchStockPrice, fetchStocksWithPrice } from 'scenes/carListScreen/saga'
import { fetchRentDurations, fetchCityCoverages, fetchAdjustmentRetails } from 'scenes/filter/saga'
import { fetchExtras, addCart, navigateHome } from 'scenes/orderDetailWithDriver/saga'
import { fetchExtrasSelfDrive } from 'scenes/orderDetailSelfDrive/saga'
import { updateLanguage } from 'scenes/setting/saga'
import { fetchRegister } from 'scenes/registration/saga'
import { fetchRegisterVerify } from 'scenes/registrationVerification/saga'
import { fetchLoginVerify } from 'scenes/loginVerification/saga'
import { fetchLogin, fetchLoginSocialite } from 'scenes/login/saga'
import { fetchProfile, doLogout } from 'scenes/profile/saga'
import { putProfile } from 'scenes/profileSetting/saga'
import { putPhoneno } from 'scenes/changePhoneno/saga'
import { fetchPredictions, fetchPlaceDetail } from 'scenes/locationPickScreen/saga'
import {
  fetchCartDetails,
  deleteCartDetails,
  navigateToCheckout,
  checkoutValidation,
  checkoutValidationCart,
} from 'scenes/cartScreen/saga'
import { fetchDistance, fetchPriceExpedition } from 'scenes/locationPickScreenSelfDrive/saga'
import {
  fetchAirports,
  fetchAirportCoverages,
  fetchAirportPlaceDetail,
  fetchAirportPlaceCoordinate,
  fetchDistanceBetweenOriginAndDestination,
  fetchZone,
} from 'scenes/airportFilterScreen/saga'
import {
  fetchAirportStocks,
  fetchAirportStockPrice,
  fetchAirportStocksWithPrice,
} from 'scenes/airportCarListScreen/saga'
import {
  fetchTransactionNotifications,
  fetchUpdateNotifications,
  updateNotifications,
} from 'scenes/notificationListScreen/saga'
import { postCheckout, postCheckoutWithoutCart, checkVoucher } from 'scenes/checkoutScreen/saga'
import { fetchPaymentMethods } from 'scenes/paymentScreen/saga'
import { fetchPhoneNumber } from 'scenes/profileEditPhone/saga'
import { putImage } from 'scenes/kYCImage/saga'
import { fetchRatingInfo } from 'scenes/orderRatingScreen/saga'

import {
  fetchOrdersActive,
  fetchOrdersComplete,
  fetchOrdersCancel,
} from 'scenes/myOrderScreen/saga'

import { fetchExtrasAirport } from 'scenes/orderDetailAirport/saga'
import { fetchMasterReason } from 'scenes/myOrderCancel/saga'

// import { postLoginToServer } from 'scenes/login/saga'
// import { postRegisterToServer } from 'scenes/registration/saga'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    // Call `fetchUser()` when a `FETCH_USER` action is triggered
    //    takeLatest(POST_REGISTER, postRegisterToServer),
    //    takeLatest(POST_LOGIN, postLoginToServer),
    takeLatest(RegisterTypes.FETCH_REGISTER, fetchRegister),
    takeLatest(RegisterVerifyTypes.FETCH_REGISTER_VERIFY, fetchRegisterVerify),
    takeLatest(LoginVerifyTypes.FETCH_LOGIN_VERIFY, fetchLoginVerify),
    takeLatest(LoginTypes.FETCH_LOGIN, fetchLogin),
    takeLatest(LoginTypes.FETCH_LOGIN_SOCIALITE, fetchLoginSocialite),
    takeLatest(ProfileTypes.FETCH_PROFILE, fetchProfile),
    takeLatest(ProfileTypes.DO_LOGOUT, doLogout),
    takeLatest(PutprofileTypes.PUT_PROFILE, putProfile),
    takeLatest(PutphonenoTypes.PUT_PHONENO, putPhoneno),

    takeLatest(HomeTypes.FETCH_USER, fetchUser),
    takeLatest(HomeTypes.FETCH_PRODUCTS, fetchProducts),
    takeLatest(HomeTypes.FETCH_PROMOS, fetchPromos),
    takeLatest(HomeTypes.FETCH_NEWS, fetchNews),
    takeLatest(SettingsTypes.CHANGE_LANGUAGE, updateLanguage),
    takeLatest(CarListScreenTypes.FETCH_STOCKS, fetchStocks),
    takeLatest(CarListScreenTypes.FETCH_STOCK_PRICE, fetchStockPrice),
    takeLatest(CarListScreenTypes.FETCH_STOCKS_WITH_PRICE, fetchStocksWithPrice),
    takeLatest(CarFilterScreenTypes.FETCH_RENT_DURATIONS, fetchRentDurations),
    takeLatest(CarFilterScreenTypes.FETCH_CITY_COVERAGES, fetchCityCoverages),
    takeLatest(CarFilterScreenTypes.FETCH_ADJUSTMENT_RETAILS, fetchAdjustmentRetails),
    takeLatest(OrderDetailSelfDriveTypes.FETCH_EXTRAS_SELF_DRIVE, fetchExtrasSelfDrive),
    takeLatest(OrderDetailWithDriverTypes.FETCH_EXTRAS, fetchExtras),
    takeLatest(OrderDetailWithDriverTypes.ADD_CART, addCart),
    takeLatest(OrderDetailWithDriverTypes.NAVIGATE_HOME, navigateHome),
    takeLatest(LocationPickScreenTypes.FETCH_PREDICTIONS, fetchPredictions),
    takeLatest(LocationPickScreenTypes.FETCH_PLACE_DETAIL, fetchPlaceDetail),
    takeLatest(CartScreenTypes.FETCH_CART_DETAILS, fetchCartDetails),
    takeLatest(CartScreenTypes.DELETE_CART_DETAILS, deleteCartDetails),
    takeLatest(CartScreenTypes.NAVIGATE_TO_CHECKOUT, navigateToCheckout),
    takeLatest(CartScreenTypes.CHECKOUT_VALIDATION, checkoutValidation),
    takeLatest(CartScreenTypes.CHECKOUT_VALIDATION_CART, checkoutValidationCart),
    takeLatest(LocationPickScreenSelfDriveTypes.FETCH_DISTANCE, fetchDistance),
    takeLatest(LocationPickScreenSelfDriveTypes.FETCH_PRICE_EXPEDITION, fetchPriceExpedition),
    takeLatest(AirportFilterScreenTypes.FETCH_AIRPORTS, fetchAirports),
    takeLatest(AirportFilterScreenTypes.FETCH_AIRPORT_COVERAGES, fetchAirportCoverages),
    takeLatest(AirportFilterScreenTypes.FETCH_AIRPORT_PLACE_DETAIL, fetchAirportPlaceDetail),
    takeLatest(
      AirportFilterScreenTypes.FETCH_AIRPORT_PLACE_COORDINATE,
      fetchAirportPlaceCoordinate
    ),
    takeLatest(
      AirportFilterScreenTypes.FETCH_DISTANCE_BETWEEN_ORIGIN_AND_DESTINATION,
      fetchDistanceBetweenOriginAndDestination
    ),
    takeLatest(AirportFilterScreenTypes.FETCH_ZONE, fetchZone),
    takeLatest(
      NotificationScreenTypes.FETCH_NOTIFICATIONS_TRANSACTION,
      fetchTransactionNotifications
    ),
    takeLatest(NotificationScreenTypes.FETCH_NOTIFICATIONS_UPDATE, fetchUpdateNotifications),
    takeLatest(NotificationScreenTypes.UPDATE_NOTIFICATIONS, updateNotifications),
    takeLatest(CheckoutScreenTypes.POST_CHECKOUT, postCheckout),
    takeLatest(CheckoutScreenTypes.POST_CHECKOUT_WITHOUT_CART, postCheckoutWithoutCart),
    takeLatest(CheckoutScreenTypes.CHECK_VOUCHER, checkVoucher),
    takeLatest(PaymentScreenTypes.FETCH_PAYMENT_METHODS, fetchPaymentMethods),
    takeLatest(ProfileEditPhoneTypes.FETCH_PHONE_NUMBER, fetchPhoneNumber),
    takeLatest(AirportCarListScreenTypes.FETCH_AIRPORT_STOCKS, fetchAirportStocks),
    takeLatest(AirportCarListScreenTypes.FETCH_AIRPORT_STOCK_PRICE, fetchAirportStockPrice),
    takeLatest(
      AirportCarListScreenTypes.FETCH_AIRPORT_STOCKS_WITH_PRICE,
      fetchAirportStocksWithPrice
    ),
    takeLatest(ImageTypes.PUT_IMAGE, putImage),
    takeLatest(RatingTypes.FETCH_RATING_INFO, fetchRatingInfo),
    takeLatest(AirportCarListScreenTypes.FETCH_AIRPORT_STOCKS, fetchAirportStocks),
    takeLatest(MyOrderScreenTypes.FETCH_ORDERS_ACTIVE, fetchOrdersActive),
    takeLatest(MyOrderScreenTypes.FETCH_ORDERS_COMPLETE, fetchOrdersComplete),
    takeLatest(MyOrderScreenTypes.FETCH_ORDERS_CANCEL, fetchOrdersCancel),
    // takeLatest(OrderDetailAirportTypes.FETCH_EXTRAS_AIRPORT, fetchExtrasAirport),
    takeLatest(MyOrderCancelTypes.FETCH_MASTER_REASON, fetchMasterReason),
  ])
}
