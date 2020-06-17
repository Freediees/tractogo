import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Moment from 'moment/min/moment-with-locales'
import orderDetailScreenActions from 'scenes/myOrderDetail/store/actions'
import DetailItemOrderProgress from 'components/organism/detailItemOrderProgress'


export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const MyOrderItemDetailContainer = ({
  navigation,
  orderDetail,
  orderDetailIsLoading,
  orderDetailErrorMessage,
  fetchorderDetail,
}) => {
  const forceUpdate = useForceUpdate()
  const { item, reservation } = navigation.state.params

  // sementara nanti data ini diganti sama data dari fetchData dari backend
  const [titleLabel, setTitleLabel] = useState('Sopir menuju titik penjemputan anda')
  const [infoLabel, setInfoLabel] = useState('Sewa mobil - Dengan driver')
  const [currentActivity, setCurrentActivity] = useState(4)

  useEffect(() => {
    async function initialize() {
      fetchorderDetail()
    }
    initialize()
  }, [])

  return (
    <DetailItemOrderProgress
      item={item}
      reservation={reservation}
      onIconLeftPress={() => navigation.goBack()}
      titleLabel={titleLabel}
      infoLabel={infoLabel}
      currentActivity={currentActivity}
    />
  )
}

MyOrderItemDetailContainer.defaultProps = {
  orderDetail: [],
}

MyOrderItemDetailContainer.propTypes = {
  orderDetail: PropTypes.arrayOf(PropTypes.shape({})),
  orderDetailIsLoading: PropTypes.bool,
  orderDetailErrorMessage: PropTypes.string,
  fetchorderDetail: PropTypes.func,
}

const mapStateToProps = (state) => ({
  orderDetail: state.cartScreen.orderDetail,
  orderDetailIsLoading: state.cartScreen.orderDetailIsLoading,
  orderDetailErrorMessage: state.cartScreen.orderDetailErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchorderDetail: () => dispatch(orderDetailScreenActions.fetchorderDetail()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOrderItemDetailContainer)
