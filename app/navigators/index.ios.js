import React from 'react'
import { Image, View, Text } from 'react-native'
import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
} from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { Colors, Fonts, Margin, Padding, Column } from 'theme'
import { SvgXml } from 'react-native-svg'
import ExampleScreen from 'scenes/_exampleScreen/container'
import HomeScreen from 'scenes/home/container'
import FilterScreen from 'scenes/filter/container'
import CarListScreen from 'scenes/carListScreen/container'
import OrderDetailWithDriverScreen from 'scenes/orderDetailWithDriver/container'
import OrderDetailSelfDriveScreen from 'scenes/orderDetailSelfDrive/container'
import CartScreen from 'scenes/cartScreen/container'
import CheckoutScreen from 'scenes/checkoutScreen/container'
import SplashScreen from 'scenes/splash/container'
import WalktroughScreen from 'scenes/walktrough/container'
import SettingsScreen from 'scenes/setting/container'
import LoginScreen from 'scenes/login/container'
import LoginVerifyScreen from 'scenes/loginVerification/container'
import RegisterScreen from 'scenes/registration/container'
import RegisterVerifyScreen from 'scenes/registrationVerification/container'
import ProfileScreen from 'scenes/profile/container'
import ProfileSettingScreen from 'scenes/profileSetting/container'
import ProfileEditPhoneScreen from 'scenes/profileEditPhone/container'
import ChangePhoneScreen from 'scenes/changePhoneno/container'
import LocationPickScreen from 'scenes/locationPickScreen/container'
import LocationPickScreenSelfDrive from 'scenes/locationPickScreenSelfDrive/container'
import NotificationListScreen from 'scenes/notificationListScreen/container'
import MemberScreen from 'scenes/member/container'
import AirportFilterScreen from 'scenes/airportFilterScreen/container'
import MyOrderScreen from 'scenes/myOrderScreen/container'
import PaymentScreen from 'scenes/paymentScreen/container'
import OrderRatingScreen from 'scenes/orderRatingScreen/container'
import AirportCarListScreen from 'scenes/airportCarListScreen/container'
import MyOrderDetailScreen from 'scenes/myOrderDetail/container'
import MyOrderItemDetailScreen from 'scenes/myOrderItemDetail/container'
import OrderDetailAirportScreen from 'scenes/orderDetailAirport/container'
import PaymentSuccessScreen from 'scenes/paymentSuccessScreen/container'
import TokenScreen from 'scenes/creditCardScreen/container'
import MyOrderCancelScreen from 'scenes/myOrderCancel/container'
import MyOrderRefundScreen from 'scenes/myOrderRefund/container'
import OrderPaymentDetailScreen from 'scenes/orderDetailPayment/container'
import NewsDetailScreen from 'scenes/newsDetailScreen/container'
import RegistrationGoogleScreen from 'scenes/registrationGoogle/container'

import Camera from 'scenes/kYCFaceCamera/container'
import KYCImage from 'scenes/kYCImage/container'
import homeActive from 'icons/ic-home-active.svg'
import homeDisabled from 'icons/ic-home-disabled.svg'
import cartActive from 'icons/ic-cart-active.svg'
import cartDisabled from 'icons/ic-cart-disabled.svg'
import profileDisabled from 'icons/ic-profile-disabled.svg'
import profileActive from 'icons/ic-profile-active.svg'
import orderDisabled from 'icons/ic-myorder-disabled.svg'
import orderActive from 'icons/ic-myorder-active.svg'

import { doResolveLoginRoute, checkAuth } from 'function/apiRequest'

const isAuth = async () => {
  return checkAuth()
}

console.log(isAuth)

const OnboardingRoutes = createStackNavigator(
  {
    // Create the application routes here (the key is the route name, the value is the target screen)
    // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
    MainScreen: {
      screen: SplashScreen,
    },
    SplashScreen: {
      screen: SplashScreen,
    },
    WalktroughScreen: {
      screen: WalktroughScreen,
    },
    LoginScreen: {
      screen: LoginScreen,
    },
    LoginVerifyScreen: {
      screen: LoginVerifyScreen,
    },
    RegisterScreen: {
      screen: RegisterScreen,
    },
    RegisterVerifyScreen: {
      screen: RegisterVerifyScreen,
    },
    RegistrationGoogleScreen: {
      screen: RegistrationGoogleScreen,
    },
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'SplashScreen',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'none',
  }
)

const CarRentalRoutes = createStackNavigator(
  {
    MainScreen: {
      screen: FilterScreen,
    },
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: 'none',
  }
)

const BusRentalRoutes = createStackNavigator(
  {
    MainScreen: {
      screen: HomeScreen,
    },
  },
  {
    headerMode: 'none',
  }
)

const AirportTransferRoutes = createStackNavigator(
  {
    MainScreen: {
      screen: HomeScreen,
    },
    AirportFilterScreen: {
      screen: AirportFilterScreen,
    },
    AirportCarListScreen: {
      screen: AirportCarListScreen,
    },
  },
  {
    headerMode: 'none',
  }
)

/* All routing yang ada di tab EXPLORE */
const ExploreRoutes = createStackNavigator(
  {
    MainScreen: {
      screen: HomeScreen,
    },
    ExampleScreen: {
      screen: ExampleScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    MyOrderHome: {
      screen: MyOrderScreen,
    },
    NewsDetail: {
      screen: NewsDetailScreen,
    },
    CartHome: {
      screen: CartScreen,
    },
    ProfileSetting: {
      screen: ProfileSettingScreen,
    },
    ChangePhoneno: {
      screen: ChangePhoneScreen,
    },
    CarFilterScreen: {
      screen: FilterScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
    CarListForm: {
      screen: CarListScreen,
    },
    AirportFilterScreen: {
      screen: AirportFilterScreen,
    },
    OrderDetailWithDriverScreen: {
      screen: OrderDetailWithDriverScreen,
      navigationOptions: ({ navigation }) => {
        checkAuth().then((v) => {
          if (v) {
          } else {
            const callback = () => {
              console.log('with driver replace')
              navigation.navigate('OrderDetailWithDriverScreen', {
                item: navigation.state.params.item,
              })
            }
            navigation.replace('LoginScreen', { loginAction: callback })
          }
        })
      },
    },
    OrderDetailSelfDriveScreen: {
      screen: OrderDetailSelfDriveScreen,
      navigationOptions: ({ navigation }) => {
        checkAuth().then((v) => {
          if (v) {
          } else {
            const callback = () => {
              console.log('with driver replace')
              navigation.popToTop()
            }
            navigation.replace('LoginScreen', { loginAction: callback })
          }
        })
      },
    },
    LocationPickScreen: {
      screen: LocationPickScreen,
    },
    LocationPickScreenSelfDrive: {
      screen: LocationPickScreenSelfDrive,
    },
    NotificationListScreen: {
      screen: NotificationListScreen,
    },
    CheckoutScreen: {
      screen: CheckoutScreen,
    },
    PaymentScreen: {
      screen: PaymentScreen,
    },
    PaymentSuccessScreen: {
      screen: PaymentSuccessScreen,
    },
    AirportCarListScreen: {
      screen: AirportCarListScreen,
    },
    CreditCardScreen: {
      screen: TokenScreen,
    },
    OrderDetailAirportScreen: {
      screen: OrderDetailAirportScreen,
      navigationOptions: ({ navigation }) => {
        checkAuth().then((v) => {
          if (v) {
          } else {
            const callback = () => {
              console.log('erport gengs')
              navigation.navigate('OrderDetailAirportScreen', {
                item: navigation.state.params.item,
              })
            }
            navigation.replace('LoginScreen', { loginAction: callback })
          }
        })
      },
    },
    LoginScreen: {
      screen: LoginScreen,
    },
    LoginVerifyScreen: {
      screen: LoginVerifyScreen,
    },
    RegisterScreen: {
      screen: RegisterScreen,
    },
    RegisterVerifyScreen: {
      screen: RegisterVerifyScreen,
    },
    RegistrationGoogleScreen: {
      screen: RegistrationGoogleScreen,
    },
  },
  {
    headerMode: 'none',
    // initialRouteName: 'Home',
  }
)

/* All routing yang ada di tab EXPLORE */
const CartRoutes = createStackNavigator(
  {
    MainScreen: {
      screen: CartScreen,
    },
    CartScreen: {
      screen: CartScreen,
    },
    CheckoutScreen: {
      screen: CheckoutScreen,
    },
    PaymentScreen: {
      screen: PaymentScreen,
    },
    PaymentSuccessScreen: {
      screen: PaymentSuccessScreen,
    },
    CreditCardScreen: {
      screen: TokenScreen,
    },
    LoginScreen: {
      screen: LoginScreen,
    },
    LoginVerifyScreen: {
      screen: LoginVerifyScreen,
    },
    RegisterScreen: {
      screen: RegisterScreen,
    },
    RegisterVerifyScreen: {
      screen: RegisterVerifyScreen,
    },
    RegistrationGoogleScreen: {
      screen: RegistrationGoogleScreen,
    },
  },
  {
    headerMode: 'none',
    // initialRouteName: 'Home',
  }
)

const MyOrderRoutes = createStackNavigator(
  {
    MainScreen: {
      screen: MyOrderScreen,
    },
    MyOrderScreen: {
      screen: MyOrderScreen,
    },
    MyOrderDetailScreen: {
      screen: MyOrderDetailScreen,
    },
    MyOrderItemDetailScreen: {
      screen: MyOrderItemDetailScreen,
    },
    MyOrderCancel: {
      screen: MyOrderCancelScreen,
    },
    MyOrderRefund: {
      screen: MyOrderRefundScreen,
    },
    OrderRating: {
      screen: OrderRatingScreen,
    },
    OrderPaymentDetail: {
      screen: OrderPaymentDetailScreen,
    },
    LoginScreen: {
      screen: LoginScreen,
    },
    LoginVerifyScreen: {
      screen: LoginVerifyScreen,
    },
    RegisterScreen: {
      screen: RegisterScreen,
    },
    RegisterVerifyScreen: {
      screen: RegisterVerifyScreen,
    },
    RegistrationGoogleScreen: {
      screen: RegistrationGoogleScreen,
    },
  },
  {
    headerMode: 'none',
    // initialRouteName: 'Home',
  }
)

const ProfileRoutes = createStackNavigator(
  {
    MainScreen: {
      screen: ProfileScreen,
    },
    ProfileScreen: {
      screen: ProfileScreen,
    },
    SettingScreen: {
      screen: ProfileSettingScreen,
    },
    EditPhoneScreen: {
      screen: ProfileEditPhoneScreen,
    },
    CameraScreen: {
      screen: Camera,
    },
    MemberScreen: {
      screen: MemberScreen,
    },
    KYCImage: {
      screen: KYCImage,
    },
    OrderRating: {
      screen: OrderRatingScreen,
    },
    LoginScreen: {
      screen: LoginScreen,
    },
    LoginVerifyScreen: {
      screen: LoginVerifyScreen,
    },
    RegisterScreen: {
      screen: RegisterScreen,
    },
    RegisterVerifyScreen: {
      screen: RegisterVerifyScreen,
    },
    RegistrationGoogleScreen: {
      screen: RegistrationGoogleScreen,
    },
  },
  {
    headerMode: 'none',
  }
)

/* Hide tab bar only on specific page */
ExploreRoutes.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
  }
}

ProfileRoutes.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
  }
}

MyOrderRoutes.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
  }
}

CartRoutes.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
  }
}

/* Main routing yang ada di bottom tab */
const TabNavigator = createMaterialBottomTabNavigator(
  {
    Explore: {
      screen: ExploreRoutes,
      navigationOptions: {
        title: 'Home',
        gesturesEnabled: false,
        activeColors: Colors.blue,
      },
    },
    MyBooking: {
      screen: MyOrderRoutes,
      navigationOptions: {
        title: 'My Order',
        activeColors: Colors.blue,
      },
    },
    Cart: {
      screen: CartRoutes,
      navigationOptions: {
        title: 'Cart',
        activeColors: Colors.blue,
      },
    },
    Profile: {
      screen: ProfileRoutes,
      navigationOptions: {
        title: 'Profile',
        activeColors: Colors.blue,
      },
    },
  },
  {
    labeled: false,
    shifting: false,
    initialRouteName: 'Explore',
    inActiveColors: Colors.smoky_gray,
    activeColors: Colors.blue,
    barStyle: { backgroundColor: Colors.white },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        checkAuth().then((result) => {
          if (result === true) {
            console.log('onPress:', navigation.state.routeName)
            defaultHandler()
          } else {
            const callback = async () => {
              navigation.popToTop()
            }
            doResolveLoginRoute(callback)
          }
        })
      },
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let svg
        let title = ''
        let color = ''
        if (routeName === 'Explore') {
          title = 'Home'
          if (focused) {
            color = Colors.blue
            svg = homeActive
          } else {
            color = Colors.smoky_grey
            svg = homeDisabled
          }
        } else if (routeName === 'MyBooking') {
          title = 'My Order'
          if (focused) {
            color = Colors.blue
            svg = orderActive
          } else {
            color = Colors.smoky_grey
            svg = orderDisabled
          }
        } else if (routeName === 'Profile') {
          title = 'Profile'
          if (focused) {
            color = Colors.blue
            svg = profileActive
          } else {
            color = Colors.smoky_grey
            svg = profileDisabled
          }
        } else if (routeName === 'Cart') {
          title = 'Cart'
          if (focused) {
            color = Colors.blue
            svg = cartActive
          } else {
            color = Colors.smoky_grey
            svg = cartDisabled
          }
        }

        return (
          <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', ...Column.col_3 }}>
              <SvgXml xml={svg} width={32} height={32} />
            </View>
            <View style={{ alignItems: 'center', ...Column.col_3 }}>
              <Text style={{ color: color, ...Fonts.f_10, ...Margin.mt_4 }}>{title}</Text>
            </View>
          </View>
        )
      },
    }),
  }
)

const TabNavigatorCart = createMaterialBottomTabNavigator(
  {
    Explore: {
      screen: ExploreRoutes,
      navigationOptions: {
        title: 'Home',
        gesturesEnabled: false,
        activeColors: Colors.blue,
      },
    },
    MyBooking: {
      screen: MyOrderRoutes,
      navigationOptions: {
        title: 'My Order',
        tabBarOptions: {
          activeTintColor: '#000',
          inactiveTintColor: '#fff',
        },
      },
    },
    Cart: {
      screen: CartRoutes,
      navigationOptions: {
        title: 'Cart',
        activeColors: Colors.blue,
      },
    },
    Profile: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Profile',
        activeColors: Colors.blue,
      },
    },
  },
  {
    labeled: false,
    shifting: false,
    initialRouteName: 'Cart',
    inActiveColors: Colors.smoky_gray,
    activeColors: Colors.blue,
    barStyle: { backgroundColor: Colors.white },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let svg
        let title = ''
        let color = ''
        if (routeName === 'Explore') {
          title = 'Home'
          if (focused) {
            color = Colors.blue
            svg = homeActive
          } else {
            color = Colors.smoky_grey
            svg = homeDisabled
          }
        } else if (routeName === 'MyBooking') {
          title = 'My Order'
          if (focused) {
            color = Colors.blue
            svg = orderActive
          } else {
            color = Colors.smoky_grey
            svg = orderDisabled
          }
        } else if (routeName === 'Profile') {
          title = 'Profile'
          if (focused) {
            color = Colors.blue
            svg = profileActive
          } else {
            color = Colors.smoky_grey
            svg = profileDisabled
          }
        } else if (routeName === 'Cart') {
          title = 'Cart'
          if (focused) {
            color = Colors.blue
            svg = cartActive
          } else {
            color = Colors.smoky_grey
            svg = cartDisabled
          }
        }

        return (
          <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', ...Column.col_3 }}>
              <SvgXml xml={svg} width={32} height={32} />
            </View>
            <View style={{ alignItems: 'center', ...Column.col_3 }}>
              <Text style={{ color: color, ...Fonts.f_10, ...Margin.mt_4 }}>{title}</Text>
            </View>
          </View>
        )
      },
    }),
  }
)

const AppNavigator = createSwitchNavigator({
  routeOne: OnboardingRoutes,
  routeTwo: TabNavigator,
  routeThree: TabNavigatorCart,
})

export default createAppContainer(AppNavigator)
