import { combineReducers } from 'redux'
import configureStore from './createStore'
import rootSaga from 'sagas'
import { reducer as HomeReducer } from 'scenes/home/store/reducers'
import { reducer as SettingsReducer } from 'scenes/setting/store/reducers'
import { reducer as carListScreenReducer } from 'scenes/carListScreen/store/reducers'
import { reducer as CarFilterScreenReducer } from 'scenes/filter/store/reducers'
import { reducer as OrderDetailWithDriverReducer } from 'scenes/orderDetailWithDriver/store/reducers'
import { reducer as OrderDetailSelfDriveReducer } from 'scenes/orderDetailSelfDrive/store/reducers'
import { reducer as LocationPickScreenReducer } from 'scenes/locationPickScreen/store/reducers'

import { reducer as RegisterReducer } from 'scenes/registration/store/reducers'
import { reducer as RegisterVerifyReducer } from 'scenes/registrationVerification/store/reducers'
import { reducer as LoginReducer } from 'scenes/login/store/reducers'
import { reducer as LoginVerifyReducer } from 'scenes/loginVerification/store/reducers'
import { reducer as ProfileReducer } from 'scenes/profile/store/reducers'
import { reducer as UpdateProfileReducer } from 'scenes/profileSetting/store/reducers'
import { reducer as UpdatePhonenoReducer } from 'scenes/changePhoneno/store/reducers'
import { reducer as CartScreenReducer } from 'scenes/cartScreen/store/reducers'
import { reducer as LocationPickScreenSelfDriveReducer } from 'scenes/locationPickScreenSelfDrive/store/reducers'
import { reducer as AirportFilterScreenReducer } from 'scenes/airportFilterScreen/store/reducers'
import { reducer as AirportCarListScreenReducer } from 'scenes/airportCarListScreen/store/reducers'
import { reducer as NotificationScreenReducer } from 'scenes/notificationListScreen/store/reducers'
import { reducer as CheckoutScreenReducer } from 'scenes/checkoutScreen/store/reducers'
import { reducer as PaymentScreenReducer } from 'scenes/paymentScreen/store/reducers'

import { reducer as ProfileEditPhoneReducer } from 'scenes/profileEditPhone/store/reducers'
import { reducer as ImageKYCReducer } from 'scenes/kYCImage/store/reducers'
import { reducer as RatingReducer } from 'scenes/orderRatingScreen/store/reducers'
import { reducer as MyOrderScreenReducer } from 'scenes/myOrderScreen/store/reducers'
import { reducer as MyOrderDetailReducer } from 'scenes/myOrderDetail/store/reducers'

import { reducer as OrderDetailAirportReducer } from 'scenes/orderDetailAirport/store/reducers'

import { reducer as MyOrderCancelReducer } from 'scenes/myOrderCancel/store/reducers'

/*
import RegisterReducer from '../scenes/registration/store/reducers'
import LoginReducer from '../scenes/login/store/reducers'
*/
export default () => {
  const rootReducer = combineReducers({
    settings: SettingsReducer,
    register: RegisterReducer,
    registerVerify: RegisterVerifyReducer,
    login: LoginReducer,
    home: HomeReducer,
    profile: ProfileReducer,
    updateProfile: UpdateProfileReducer,
    changePhoneno: UpdatePhonenoReducer,
    orderDetailWithDriver: OrderDetailWithDriverReducer,
    orderDetailSelfDrive: OrderDetailSelfDriveReducer,
    carListScreen: carListScreenReducer,
    filter: CarFilterScreenReducer,
    locationPickScreen: LocationPickScreenReducer,
    cartScreen: CartScreenReducer,
    locationPickScreenSelfDriveReducer: LocationPickScreenSelfDriveReducer,
    airportFilter: AirportFilterScreenReducer,
    airportCarList: AirportCarListScreenReducer,
    notification: NotificationScreenReducer,
    checkout: CheckoutScreenReducer,
    editPhones: ProfileEditPhoneReducer,
    loginVerify: LoginVerifyReducer,
    payment: PaymentScreenReducer,
    kycImage: ImageKYCReducer,
    ratings: RatingReducer,
    order: MyOrderScreenReducer,
    orderDetail: MyOrderDetailReducer,
    orderDetailAirport: OrderDetailAirportReducer,
    cancelOrder: MyOrderCancelReducer,
    //    register: RegisterReducer,
    //    login: LoginReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
