import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import RatingScreen from 'components/organism/ratingScreen'
import RatingAction from 'scenes/orderRatingScreen/store/actions'
import NavigationService from 'services/navigationService'

function OrderRating({ navigation, rating, user, fetchRatingInfo }) {
  const [ratingKendaraan, setRatingKendaraan] = useState([])
  const [ratingSopir, setRatingSopir] = useState([])

  useEffect(() => {
    async function initialize() {
      await fetchRatingInfo()

      setRatingKendaraan(await rating.ratingInfo.kendaraan[4])
      setRatingSopir(await rating.ratingInfo.sopir[4])
    }
    initialize()
  }, [])

  const onSubmit = (payload) => {
    //this on submit, post data or something
    alert('Post Data')
    navigation.navigate('home')
  }
  const onStar = async (value, id) => {
    if (id == 0) {
      setRatingSopir(await rating.ratingInfo.sopir[value - 1])
    } else {
      setRatingKendaraan(await rating.ratingInfo.kendaraan[value - 1])
    }
  }

  return (
    <RatingScreen
      onStar={onStar}
      onIconLeftPress={() => navigation.goBack()}
      ratingSopir={ratingSopir || []}
      ratingKendaraan={ratingKendaraan || []}
      onSubmit={onSubmit}
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
