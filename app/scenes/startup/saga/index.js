import { put, select } from 'redux-saga/effects'
import SettingsActions from 'scenes/setting/store/actions'
import NavigationService from 'services/navigationService'

export const selectLanguage = (state) => state.settings.language // get the language from the settings reducer

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  const language = yield select(selectLanguage)
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(SettingsActions.changeLanguage(language))

  // Add more operations you need to do at startup here
  // ...

  // When those operations are finished we redirect to the main screen
  NavigationService.navigateAndReset('MainScreen')
}
