// export const Config = {
//   API_URL: 'https://jsonplaceholder.typicode.com/users/',
// }
export const Config = {
  API_URL: 'http://omni-service-authorization.azurewebsites.net/api/b2c/authorization/', //'https://jsonplaceholder.typicode.com/users/',
  // REGISTER: API_URL + 'register-phone-number'
}


export const SECRET_KEY = '153fa3e1352cd10281496006eb41f9b6'
export const CID = 'CID-999999'
const PROTOCOL = 'https:'
const PROTOCOL2 = 'http:'

// REGEX
export const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/i
export const REGEX_EMAIL = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
export const REGEX_PHONE_NUMBER = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g
export const REGEX_VALID_URL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g
export const CREDIT_CARD_LIBRARY = [
  {
    type: 'MasterCard',
    reg: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/g,
    img:
      'data:image/png;base64,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',
  },
  {
    type: 'Visa',
    reg: /^4[0-9]{12}(?:[0-9]{3})?$/g,
    img:
      'data:image/png;base64,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',
  },
  // {type: "AmericanExpress", reg: /^3[47][0-9]{13}$/ }
]

// AUTH GOOGLE
export const SOCIAL_MEDIA_AUTH = {
  google: {
    android: {
      appId: '511369405285-46itl1hrdq0d990l6vct2vhj6ap39vue.apps.googleusercontent.com', // sera
      callback: 'com.trac.tractogo:/oauth2redirect',
    },
    ios: {
      appId: '511369405285-qetdd8sg48m9e5bk3dmkru2l5gfaldo6.apps.googleusercontent.com',
      callback: 'com.trac.tractogo:/oauth2redirect',
    },
  },
}

// PRODUCT SERVICE TYPE
export const RENTAL_TIMEBASE = 'STID-003'
export const RENTAL_KMBASE = 'STID-004'
export const RENTAL_HOURLY = 'STID-007'
export const UAS_TIMEBASE = 'STID-083'
export const UAS_KMBASE = 'STID-084'

export const STATUS_RESERVATION = [
  {
    name: 'BREAKDOWN',
    id: 'BOSID-001',
  },
  {
    name: 'CANCELLED',
    id: 'BOSID-002',
  },
  {
    name: 'DELIVERY_COMPLETED',
    id: 'BOSID-003',
  },
  {
    name: 'DRAFT',
    id: 'BOSID-004',
  },
  {
    name: 'OPEN',
    id: 'BOSID-006',
  },
  {
    name: 'ORDER_COMPLETED',
    id: 'BOSID-007',
  },
  {
    name: 'READY_TO_BILL',
    id: 'BOSID-009',
  },
  {
    name: 'WAITING_FOR_PAYMENT',
    id: 'BOSID-010',
  },
  {
    name: 'WAITING_FOR_APPROVAL',
    id: 'BOSID-011',
  },
  {
    name: 'REJECTED',
    id: 'BOSID-012',
  },
]

export const ACTIVITY_RESERVATION = [
  {
    ActivityID: 'AMID-009#ASID-015',
    classProgress: 'car-on-the-way',
  },
  {
    ActivityID: 'AMID-018#ASID-015',
    classProgress: 'car-on-the-way',
  },
  {
    ActivityID: 'AMID-002#ASID-016',
    classProgress: 'complete',
  },
  {
    ActivityID: 'AMID-002#ASID-017',
    classProgress: 'car-with-you',
  },
  {
    ActivityID: 'AMID-006#ASID-017',
    classProgress: 'complete',
  },
  {
    ActivityID: 'AMID-009#ASID-017',
    classProgress: 'complete',
  },
]

// PRODUCT TYPE
export const CAR_RENTAL = 'PRD0006'
export const AIRPORT_TRANSFER = 'PRD0007'
export const BUS_RENTAL = 'PRD0008'
// SERVICE TYPE
export const SELF_DRIVE = 'PSV0001'
export const CHAFFEUR = 'PSV0002'
export const ONE_WAY = 'PSV0003'
export const ROUND_TRIP = 'PSV0004'
export const MULTI_CITY = 'PSV0005'

// BILLING
export const SONotCreated = 'INV-001'
export const Paid = 'INV-003'

// AUTH0
export const AUTH0_DOMAIN = 'ttg-development.au.auth0.com'
export const AUTH0_CLIENT_ID = 'gK3b9YSXa0TBuhZTVY_t-Dj7A3Hvq7o8'

// SENTRY
export const PUBLIC_DSN = 'https://7d4c7c0d124147cdad608f3991ca1fc1@sentry.io/2731530' // DEV/QA
// export const PUBLIC_DSN = 'https://773e4c7a45a8446091d16478a5ec4395@sentry.io/1452966'; // PRD

// BASE API URL
// const BASE_URL_BTC = prm => `${PROTOCOL}//omni-service-${prm}.azurewebsites.net/api/b2c`;   // QA
// const BASE_URL = prm => `${PROTOCOL}//omni-service-${prm}.azurewebsites.net/api`;           // QA
// const BASE_URL_BTC1 = prm => `${PROTOCOL}//omni-service-${prm}.azurewebsites.net/api/b2c`;
// const BASE_URL_BTC = prm => `${PROTOCOL}//omni-service-${prm}-staging.azurewebsites.net/api/b2c`;   // STAGING
// const BASE_URL = prm => `${PROTOCOL}//omni-service-${prm}-staging.azurewebsites.net/api`;           // STAGING
const BASE_URL_BTC = (prm) =>
  `${PROTOCOL}//omni-service-${prm}-staging.azurewebsites.net/api/b2c` // PRD
const BASE_URL = (prm) => `${PROTOCOL}//omni-service-${prm}-staging.azurewebsites.net/api` // PRD
const BASE_URL_V1 = (prm) => `${PROTOCOL}//omni-service-${prm}.azurewebsites.net/api`
const SM_BASE_URL = `https://sm-dev.azurewebsites.net`; // DEV/QA
// const SM_BASE_URL = `https://sm-prd.azurewebsites.net` // PRD
export const SM_APP_KEY = '758E1DBF-9D2C-48FC-BD75-C1E26F1D2E4D'

// GOOGLE MAPS
export const GOOGLE_MAP_API = 'AIzaSyDqP04L8wLhIa27cvtWJfvlfRodR7A8sD0'
export const GOOGLE_PLACE_AUTOCOMPLETE = `${BASE_URL_BTC(
  'configuration'
)}/configuration/gmaps/auto-complete`
export const GOOGLE_PLACE_DETAIL = `${BASE_URL_BTC(
  'configuration'
)}/configuration/gmaps/place-detail`
export const GOOGLE_FIND_PLACE = `${BASE_URL_BTC(
  'configuration'
)}/configuration/gmaps/place-coordinate`
export const GOOGLE_GET_DISTANCE_MATRIX = `${BASE_URL_BTC(
  'configuration'
)}/configuration/gmaps/distance-matrix`

// AUTHORIZATION
export const VERSION_CHECK = `${BASE_URL_BTC('authorization')}/authorization/version`
export const LOGIN = `${BASE_URL_BTC('authorization')}/authorization/login/`
export const LOGIN_SOSMED = `${BASE_URL_BTC('authorization')}/authorization/loginSocialite/`
export const REGISTER = `${BASE_URL_BTC('authorization')}/authorization/register-phone-number/`
export const LOGOUT = `${BASE_URL_BTC('authorization')}/authorization/logout/`
export const REFRESH_TOKEN = `${BASE_URL_BTC('authorization')}/authorization/refresh-token/`
export const CHECK_TOKEN = `${BASE_URL_BTC('authorization')}/authorization/check-token/`
export const USER = `${BASE_URL_BTC('authorization')}/authorization/get-user/`
export const FORGOT_PASSWORD = `${BASE_URL_BTC('authorization')}/authorization/forgot-password/`
export const USER_PROFILE = `${BASE_URL_BTC('authorization')}/authorization/user-profile`
export const USER_PROFILE_UPDATE = `${BASE_URL_BTC(
  'authorization'
)}/authorization/user-profile/update`
// export const CHANGE_PASSWORD = `${BASE_URL_BTC('authorization')}/authorization/update-password/`;
export const CHANGE_PASSWORD = `${BASE_URL_BTC('authorization')}/authorization/change-password/`
export const CREDIT_CARD = `${BASE_URL_BTC('authorization')}/authorization/credit-card-account`
;('GET: /get-by-user/, SAVE: /save, UPDATE: /update, DELETE: /delete, SET PRIMARY: /set-primary ')
export const SEND_DEVICE_TOKEN = `${BASE_URL_BTC('authorization')}/authorization/device-token`

// MASTER
export const LIST_CAR_TYPE = `${BASE_URL_BTC('configuration')}/configuration/car-type/get-by-param`
export const BANK = `${BASE_URL_BTC('configuration')}/configuration/bank/get-by-param`
export const ALL_BANK = `${BASE_URL_BTC('configuration')}/configuration/bank`
export const CITY_COVERAGE = (args) =>
  `${BASE_URL_BTC('configuration')}/configuration/city-coverage/get-by-param/${args[0]}/${
    args[1]
  }/${args[2]}` // {CustomerId}/{BusinessUnitId}/{MsProductId}
export const EXTRAS = `${BASE_URL_BTC('configuration')}/configuration/extras-detail/get-by-param`
export const BRANCH = `${BASE_URL_BTC(
  'configuration'
)}/configuration/branch/get-branch/business-unit` // {business_unit_id}
export const CANCEL_REASON = `${BASE_URL_BTC('order')}/order/cancellationReason`
export const AIRPORT_LIST = `${BASE_URL_V1('configuration')}/b2c/configuration/airport`

// PRODUCT
export const LIST_PRODUCT = `${BASE_URL_BTC('product')}/product/product/`

// GET STOCK
export const LIST_STOCK = `${BASE_URL_BTC('configuration')}/configuration/stock-management`

// ZONE
export const ZONE = (args) =>
  `${BASE_URL_BTC('price')}/price/zone/get-by-param/${args[0]}/${args[1]}/${args[2]}` // BusinessUnitId/MsProductId/Distance

/** CAR RENTAL */
// RENTAL DURATION
export const RENTAL_DURATION_CAR_RENTAL = `${BASE_URL_BTC(
  'configuration'
)}/configuration/rental-duration`
// PRICE
export const PRICE_PRODUCT_CAR_RENTAL = `${BASE_URL_BTC(
  'price'
)}/price/price-product-retail/get-by-param`

/** AIRPORT TRANSFER */
// MASTER AIRPORT
export const MASTER_AIRPORT = `${BASE_URL_BTC('configuration')}/configuration/airport`
// AIRPORT COVERAGE
export const AIRPORT_COVERAGE = `${BASE_URL_BTC(
  'configuration'
)}/configuration/airport-coverage/get-by-param?MsAirportCode=`

/** BUS RENTAL */
// PRICE BUS
export const PRICE_PRODUCT_BUS = `${BASE_URL_BTC('price')}/price/price-bus-retail/get-price`

/** RESERVATION */
export const RESERVATION = `${BASE_URL_BTC('order')}/order/reservation/save`

/** BILLING */
export const CREATE_INVOICE = `${BASE_URL_BTC('billing')}/billing/invoice-header/save`

/** DISCOUNT */
export const VALIDATE_PROMO = (args) => `${BASE_URL('discount')}/discount/promo/validate/${args}/` // ?user_id=USR-001&business_unit_id=0104&branch_id=SR01

/** CUSTOMER DASHBOARD */
export const MY_BOOKING = `${BASE_URL_BTC('order')}/order/reservation/get-my-booking`
export const MY_HISTORY = `${BASE_URL_BTC('order')}/order/reservation/get-history`
export const DETAIL_MY_RESERVATION = `${BASE_URL_BTC('order')}/order/reservation/detail` // /TRAC-201905054000745

/** ADJUSTMENT TIME */
export const ADJUSTMENT_TIME = `${BASE_URL_BTC('price')}/price/adjustment-retail`

/** VEHICLE ATTRIBUTE */
export const VEHICLE_ATTRIBUTE = `${BASE_URL_BTC('configuration')}/configuration/vehicle-attribute`

/** CANCEL RESERVATION */
export const CANCEL_RESERVATION = `${BASE_URL_BTC('order')}/order/reservation/cancelReservation`
export const CANCEL_RESERVATION_REFUND = `${BASE_URL_BTC(
  'order'
)}/order/reservation/cancelReservation`

/** CONTACT US */
export const CONTACT_US = `${BASE_URL('notification')}/email/contact-us/send`

/** CONTENT ARTICLE */
export const CONTENT_ARTICLE = `${BASE_URL_BTC('product')}/product/content-article`

/** PROMO */
export const PROMO = `${BASE_URL_BTC('product')}/product/content-promo`

/** NOTIFICATION_BY_USER */
export const NOTIFICATION_BY_USER = `${BASE_URL('notification')}/notification/notification-history/get-by-param?UserId=`