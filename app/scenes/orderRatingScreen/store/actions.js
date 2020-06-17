import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchRating: ['payload'],
  fetchRatingSuccess: ['payload'],
  fetchRatingFailure: ['errorMessage'],
  fetchRatingInfo:['payload'],
})

export const RatingTypes = Types
export default Creators
