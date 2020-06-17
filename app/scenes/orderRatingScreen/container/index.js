import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import RatingScreen from 'components/organism/ratingScreen'

import RatingAction from 'scenes/orderRatingScreen/store/actions'
import { RatingTypes } from '../store/actions'

function OrderRating({ navigation, rating, user, fetchRatingInfo }) {

  const [ratingKendaraan, setRatingKendaraan] = useState([])
  const [ratingSopir, setRatingSopir] = useState([])
  const [chooseRating, setChooseRating] = useState({rating: 5, detailInfo:[]})
  const [generalInfo, setGeneralInfo] = useState('')
  const [generalLabel, setGeneralLabel] = useState('')

  useEffect(() => {
    async function initialize() {
      
      await fetchRatingInfo()

      setRatingKendaraan( await rating.ratingInfo.kendaraan)
      setRatingSopir( await rating.ratingInfo.sopir)
      setChooseRating( await rating.ratingInfo.sopir[4] )
      // console.log('Rating : ')
      // console.log(await user)
      console.log(await rating)
    }
    initialize()
  }, [])


  return (
    <RatingScreen
      onStar1={() => {
        setChooseRating( ratingSopir[0] )
      }}
      onStar2={() => {
        setChooseRating( ratingSopir[1] )
      }}
      onStar3={() => {
        setChooseRating( ratingSopir[2] )
      }}
      onStar4={() => {
        setChooseRating( ratingSopir[3] )
      }}
      onStar5={() => {
        setChooseRating( ratingSopir[4] )
      }}
      dataInfo={chooseRating}
    />
  )
}

OrderRating.defaultProps = {
  dataInfo: {},
}

OrderRating.propTypes = {}

const mapStateToProps = (state) => ({
  rating: state.ratings,
  user: state.home.user,
})

const mapDispatchToProps = (dispatch) => ({
  fetchRatingInfo: () => dispatch(RatingAction.fetchRatingInfo()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderRating)
