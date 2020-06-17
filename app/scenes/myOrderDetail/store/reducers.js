import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { ExampleScreenTypes } from './actions'

export const fetchExampleLoading = (state) => ({
  ...state,
  example: [],
  exampleIsLoading: false,
  exampleErrorMessage: null,
})

export const fetchExampleFailure = (state, { errorMessage }) => ({
  ...state,
  example: [],
  exampleIsLoading: false,
  exampleErrorMessage: errorMessage,
})

export const fetchExampleSuccess = (state, { example }) => ({
  ...state,
  example: example,
  exampleIsLoading: false,
  exampleErrorMessage: null,
})

export const reducer = createReducer(INITIAL_STATE, {
  [ExampleScreenTypes.FETCH_EXAMPLE_SUCCESS]: fetchExampleSuccess,
  [ExampleScreenTypes.FETCH_EXAMPLE_FAILURE]: fetchExampleFailure,
  [ExampleScreenTypes.FETCH_EXAMPLE_LOADING]: fetchExampleLoading,
})
