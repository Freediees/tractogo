/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { AirportCarListScreenTypes } from './actions'

export const fetchAirportStocksLoading = (state) => ({
  ...state,
  stocks: [],
  stocksIsLoading: true,
  stocksWithPriceIsLoading: true,
  stocksErrorMessage: null,
})

export const fetchAirportStocksSuccess = (state, { stocks }) => ({
  ...state,
  stocks: stocks,
  stocksIsLoading: false,
  stocksWithPriceIsLoading: true,
  stocksErrorMessage: null,
})

export const fetchAirportStocksFailure = (state, { errorMessage }) => ({
  ...state,
  stocks: [],
  stocksIsLoading: false,
  stocksWithPriceIsLoading: false,
  stocksErrorMessage: errorMessage,
})

export const fetchAirportStockPriceLoading = (state) => ({
  ...state,
  pricesIsLoading: true,
  pricesErrorMessage: null,
})

export const fetchAirportStockPriceSuccess = (state, { prices }) => ({
  ...state,
  prices: prices,
  pricesIsLoading: false,
  pricesErrorMessage: null,
})

export const fetchAirportStockPriceFailure = (state, { errorMessage }) => ({
  ...state,
  prices: [],
  pricesIsLoading: false,
  pricesErrorMessage: errorMessage,
})

export const fetchAirportStocksWithPriceLoading = (state) => ({
  ...state,
  stocksWithPrice: [],
  stocksWithPriceIsLoading: true,
  stocksWithPriceErrorMessage: null,
})

export const fetchAirportStocksWithPriceSuccess = (state, { data }) => ({
  ...state,
  stocksWithPrice: [...state.stocksWithPrice, data],
  filteredStocks: [...state.stocksWithPrice, data],
})

export const fetchAirportStocksWithPriceComplete = (state, { data }) => ({
  ...state,
  stocksWithPriceIsLoading: false,
})

export const fetchAirportStocksWithPriceFailure = (state, { errorMessage }) => ({
  ...state,
  stocksWithPrice: [],
  stocksWithPriceErrorMessage: errorMessage,
})

export const changeAirportStocksWithPrice = (state, { payload }) => ({
  ...state,
  stocksWithPriceIsLoading: false,
  filteredStocks: payload,
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [AirportCarListScreenTypes.FETCH_AIRPORT_STOCKS_LOADING]: fetchAirportStocksLoading,
  [AirportCarListScreenTypes.FETCH_AIRPORT_STOCKS_SUCCESS]: fetchAirportStocksSuccess,
  [AirportCarListScreenTypes.FETCH_AIRPORT_STOCKS_FAILURE]: fetchAirportStocksFailure,
  [AirportCarListScreenTypes.FETCH_AIRPORT_STOCK_PRICE_LOADING]: fetchAirportStockPriceLoading,
  [AirportCarListScreenTypes.FETCH_AIRPORT_STOCK_PRICE_SUCCESS]: fetchAirportStockPriceSuccess,
  [AirportCarListScreenTypes.FETCH_AIRPORT_STOCK_PRICE_FAILURE]: fetchAirportStockPriceFailure,
  [AirportCarListScreenTypes.FETCH_AIRPORT_STOCKS_WITH_PRICE_LOADING]: fetchAirportStocksWithPriceLoading,
  [AirportCarListScreenTypes.FETCH_AIRPORT_STOCKS_WITH_PRICE_SUCCESS]: fetchAirportStocksWithPriceSuccess,
  [AirportCarListScreenTypes.FETCH_AIRPORT_STOCKS_WITH_PRICE_FAILURE]: fetchAirportStocksWithPriceFailure,
  [AirportCarListScreenTypes.FETCH_AIRPORT_STOCKS_WITH_PRICE_COMPLETE]: fetchAirportStocksWithPriceComplete,
  [AirportCarListScreenTypes.CHANGE_AIRPORT_STOCKS_WITH_PRICE]: changeAirportStocksWithPrice,
})
