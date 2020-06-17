import { createActions } from 'reduxsauce'

/**
 * We use reduxsauce's `createActions()` helper to easily create redux actions.
 *
 * Keys are action names and values are the list of parameters for the given action.
 *
 * Action names are turned to SNAKE_CASE into the `Types` variable. This can be used
 * to listen to actions:
 *
 * - to trigger reducers to update the state, for example in app/Stores/Example/Reducers.js
 * - to trigger sagas, for example in app/Sagas/index.js
 *
 * Actions can be dispatched:
 *
 * - in React components using `dispatch(...)`, for example in app/App.js
 * - in sagas using `yield put(...)`, for example in app/Sagas/ExampleSaga.js
 *
 * @see https://github.com/infinitered/reduxsauce#createactions
 */
const { Types, Creators } = createActions({
  fetchCityCoverages: null,
  fetchCityCoveragesLoading: null,
  fetchCityCoveragesSuccess: ['cityCoverages'],
  fetchCityCoveragesFailure: ['errorMessage'],
  fetchStocks: ['payload'],
  fetchStocksLoading: null,
  fetchStocksSuccess: ['stocks'],
  fetchStocksFailure: ['errorMessage'],
  fetchStocksWithPrice: ['payload'],
  fetchStocksWithPriceLoading: null,
  fetchStocksWithPriceSuccess: ['data'],
  fetchStocksWithPriceFailure: ['errorMessage'],
  fetchStocksWithPriceComplete: null,
  fetchStockPrice: ['payload'],
  fetchStockPriceLoading: null,
  fetchStockPriceSuccess: ['price'],
  fetchStockPriceFailure: ['errorMessage'],
  changeStocksWithPrice: ['payload'],
  resetState: null,
})

export const CarListScreenTypes = Types
export default Creators
