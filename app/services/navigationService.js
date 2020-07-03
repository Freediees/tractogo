import { NavigationActions, StackActions } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'
import { getNavCounter } from 'function'

/**
 * The navigation is implemented as a service so that it can be used outside of components, for example in sagas.
 *
 * @see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
 */

let navigator

/**
 * This function is called when the RootScreen is created to set the navigator instance to use.
 */
function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef
}

/**
 * Call this function when you want to navigate to a specific route.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}

function backToPrev(numer) {
  navigator.dispatch(StackActions.pop(1))
}

async function backAfterLogin() {
  const number = parseInt(await getNavCounter())
  console.log(number)
  navigator.dispatch(
    StackActions.pop({
      n: number,
    })
  )
}

async function logout() {
  console.log('logging out')
  await AsyncStorage.removeItem('token')
  console.log('navigate')
  console.log(navigator)
  if (navigator) {
    console.log('dispatch')
    navigator.dispatch(NavigationActions.navigate('routeOne'))
    console.log('test')
  }
}

async function login() {
  navigator.dispatch(NavigationActions.navigate('routeTwo'))
}

/**
 * Call this function when you want to navigate to a specific route AND reset the navigation history.
 *
 * That means the user cannot go back. This is useful for example to redirect from a splashscreen to
 * the main screen: the user should not be able to go back to the splashscreen.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigateAndReset(routeName, params) {
  if (navigator) {
    navigator.dispatch(
      StackActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({
            routeName,
            params,
          }),
        ],
      })
    )
  }
}

function goBack() {
  navigator.dispatch(NavigationActions.back())
}

function navigateAndResetNoParam(routeName) {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName,
        }),
      ],
    })
  )
}

function navigateAndResetTabNavigator(tab, routeName) {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName: tab,
        }),
        NavigationActions.navigate({
          routeName: routeName,
        }),
      ],
    })
  )
}

export default {
  navigate,
  navigateAndReset,
  navigateAndResetNoParam,
  setTopLevelNavigator,
  navigateAndResetTabNavigator,
  login,
  logout,
  goBack,
  backToPrev,
  backAfterLogin,
}
