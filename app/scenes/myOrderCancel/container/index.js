import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Moment from 'moment/min/moment-with-locales'
import myOrderCancelActions from 'scenes/myOrderCancel/store/actions'
import MyOrderCancel from 'components/organism/myOrderCancelScreen'

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const MyOrderCancelContainer = ({ navigation, cancelOrder, fetchMasterReason, masterReason }) => {
  useEffect(() => {
    async function initialize() {
      fetchMasterReason()
    }
    initialize()
  }, [])

  return <MyOrderCancel onIconLeftPress={() => navigation.goBack()} masterReason={masterReason} />
}

MyOrderCancelContainer.defaultProps = {
}

MyOrderCancelContainer.propTypes = {
}

const mapStateToProps = (state) => ({
  masterReason: state.cancelOrder.masterReason,
  cancelOrderLoading : state.cancelOrder.orderCancelIsLoading,
})

const mapDispatchToProps = (dispatch) => ({
  fetchMasterReason: () => dispatch(myOrderCancelActions.fetchMasterReason()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOrderCancelContainer)
