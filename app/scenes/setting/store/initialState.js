import I18n from 'react-native-i18n'
import Immutable from 'seamless-immutable'

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  language: I18n.locale.substr(0, 2), // take over the recognized, or default if not recognized, language locale as initial state
})
