/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { HomeTypes } from './actions'

export const fetchUserLoading = (state) => ({
  ...state,
  userIsLoading: true,
  userErrorMessage: null,
})

export const fetchUserSuccess = (state, { user }) => ({
  ...state,
  user: user,
  userIsLoading: false,
  userErrorMessage: null,
})

export const fetchUserFailure = (state, { errorMessage }) => ({
  ...state,
  user: {},
  userIsLoading: false,
  userErrorMessage: errorMessage,
})

export const fetchProductsLoading = (state) => ({
  ...state,
  productsIsLoading: true,
  productsErrorMessage: null,
})

export const fetchProductsSuccess = (state, { products }) => ({
  ...state,
  products: products,
  productsIsLoading: false,
  productsErrorMessage: null,
})

export const fetchProductsFailure = (state, { errorMessage }) => ({
  ...state,
  products: [],
  productsIsLoading: false,
  productsErrorMessage: errorMessage,
})

export const fetchPromosLoading = (state) => ({
  ...state,
  promosIsLoading: true,
  promosErrorMessage: null,
})

export const fetchPromosSuccess = (state, { promos }) => ({
  ...state,
  promos: promos,
  promosIsLoading: false,
  promosErrorMessage: null,
})

export const fetchPromosFailure = (state, { errorMessage }) => ({
  ...state,
  promos: [],
  promosIsLoading: false,
  promosErrorMessage: errorMessage,
})

export const fetchNewsLoading = (state) => ({
  ...state,
  newsIsLoading: true,
  newsErrorMessage: null,
})

export const fetchNewsSuccess = (state, { news }) => ({
  ...state,
  news: news,
  newsIsLoading: false,
  newsErrorMessage: null,
})

export const fetchNewsFailure = (state, { errorMessage }) => ({
  ...state,
  news: [],
  newsIsLoading: false,
  newsErrorMessage: errorMessage,
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [HomeTypes.FETCH_USER_LOADING]: fetchUserLoading,
  [HomeTypes.FETCH_USER_SUCCESS]: fetchUserSuccess,
  [HomeTypes.FETCH_USER_FAILURE]: fetchUserFailure,
  [HomeTypes.FETCH_PRODUCTS_LOADING]: fetchProductsLoading,
  [HomeTypes.FETCH_PRODUCTS_SUCCESS]: fetchProductsSuccess,
  [HomeTypes.FETCH_PROMOS_FAILURE]: fetchProductsFailure,
  [HomeTypes.FETCH_PROMOS_LOADING]: fetchPromosLoading,
  [HomeTypes.FETCH_PROMOS_SUCCESS]: fetchPromosSuccess,
  [HomeTypes.FETCH_PROMOS_FAILURE]: fetchPromosFailure,
  [HomeTypes.FETCH_NEWS_LOADING]: fetchNewsLoading,
  [HomeTypes.FETCH_NEWS_SUCCESS]: fetchNewsSuccess,
  [HomeTypes.FETCH_NEWS_FAILURE]: fetchNewsFailure,
})
