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
  fetchPaymentMethods: null,
  fetchPaymentMethodsLoading: null,
  fetchPaymentMethodsSuccess: ['paymentMethods'],
  fetchPaymentMethodsFailure: ['errorMessage'],
  changeVaData: ['payload'],
  changeBankData: ['payload'],
})

export const PaymentScreenTypes = Types
export default Creators
