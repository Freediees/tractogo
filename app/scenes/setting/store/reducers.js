// ../Redux/SettingsRedux.js
import { INITIAL_STATE } from './initialState'
import { createReducer, createActions } from 'reduxsauce'
import { SettingsTypes } from './actions'

/* ------------- Reducers ------------- */
export const changeLanguage = (state, { language }) => {
  return {
    ...state,
    language: language,
  }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [SettingsTypes.CHANGE_LANGUAGE]: changeLanguage,
})
