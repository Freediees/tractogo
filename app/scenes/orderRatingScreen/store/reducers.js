import { INITIAL_STATE } from './initialState';
import { createReducer } from 'reduxsauce'
import { RatingTypes } from './actions'

export const fetchRatingSuccess = (state, { payload }) => ({
  ...state,
  ratingInfo: payload,
  orderRatingIsLoading: false,
  orderRatingSuccessMessage: null,
})

export const fetchRatingFailure = (state, { errorMessage }) => ({
  ...state,
  ratingInfo: [],
  orderRatingIsLoading: false,
  orderRatingErrorMessage: 'Error',
})

export const reducer = createReducer(INITIAL_STATE, {
  [RatingTypes.FETCH_RATING_SUCCESS]: fetchRatingSuccess,
  [RatingTypes.FETCH_RATING_FAILURE]: fetchRatingFailure,
})
