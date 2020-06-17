/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { CarListScreenTypes } from './actions'

export const fetchStocksLoading = (state) => ({
  ...state,
  filteredStocks: [],
  stocksWithPrice: [],
  stocksIsLoading: true,
  stocksErrorMessage: null,
})

export const fetchStocksSuccess = (state, { stocks }) => ({
  ...state,
  stocks: stocks,
  stocksIsLoading: false,
  stocksErrorMessage: null,
})

export const fetchStocksFailure = (state, { errorMessage }) => ({
  ...state,
  stocks: [],
  stocksIsLoading: false,
  stocksErrorMessage: errorMessage,
})

export const fetchStocksWithPriceLoading = (state) => ({
  ...state,
  stocksWithPrice: [],
  stocksWithPriceIsLoading: true,
  stocksWithPriceErrorMessage: null,
})

export const fetchStocksWithPriceSuccess = (state, { data }) => ({
  ...state,
  stocksWithPrice: [...state.stocksWithPrice, data],
  filteredStocks: [...state.stocksWithPrice, data],
})

export const changeStocksWithPrice = (state, { payload }) => ({
  ...state,
  stocksWithPriceIsLoading: false,
  filteredStocks: payload,
})

export const fetchStocksWithPriceComplete = (state, { data }) => ({
  ...state,
  stocksWithPriceIsLoading: false,
})

export const fetchStocksWithPriceFailure = (state, { errorMessage }) => ({
  ...state,
  stocksWithPrice: [],
  stocksWithPriceErrorMessage: errorMessage,
})

export const fetchStockPriceLoading = (state) => ({
  ...state,
  pricesIsLoading: true,
  pricesErrorMessage: null,
})

export const fetchStockPriceSuccess = (state, { prices }) => ({
  ...state,
  prices: prices,
  pricesIsLoading: false,
  pricesErrorMessage: null,
})

export const fetchStockPriceFailure = (state, { errorMessage }) => ({
  ...state,
  prices: [],
  pricesIsLoading: false,
  pricesErrorMessage: errorMessage,
})

export const resetState = (state) => ({
  ...state,
  filteredStocks: [],
  prices: [],
  stocks: [],
  stocksWithPrice: [],
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [CarListScreenTypes.FETCH_STOCKS_LOADING]: fetchStocksLoading,
  [CarListScreenTypes.FETCH_STOCKS_SUCCESS]: fetchStocksSuccess,
  [CarListScreenTypes.FETCH_STOCKS_FAILURE]: fetchStocksFailure,
  [CarListScreenTypes.FETCH_STOCK_PRICE_LOADING]: fetchStockPriceLoading,
  [CarListScreenTypes.FETCH_STOCK_PRICE_SUCCESS]: fetchStockPriceSuccess,
  [CarListScreenTypes.FETCH_STOCK_PRICE_FAILURE]: fetchStockPriceFailure,
  [CarListScreenTypes.FETCH_STOCKS_WITH_PRICE_LOADING]: fetchStocksWithPriceLoading,
  [CarListScreenTypes.FETCH_STOCKS_WITH_PRICE_SUCCESS]: fetchStocksWithPriceSuccess,
  [CarListScreenTypes.FETCH_STOCKS_WITH_PRICE_FAILURE]: fetchStocksWithPriceFailure,
  [CarListScreenTypes.FETCH_STOCKS_WITH_PRICE_COMPLETE]: fetchStocksWithPriceComplete,
  [CarListScreenTypes.CHANGE_STOCKS_WITH_PRICE]: changeStocksWithPrice,
  [CarListScreenTypes.RESET_STATE]: resetState,
})
